from __future__ import print_function
import json
import ipdb
import os
import requests
from lxml import etree
from pymongo import MongoClient
from tqdm import tqdm
from vkb_collections import *
import dbinit_helpers

CLIENT = MongoClient('mongodb://54.198.136.17:27017')
VENOMKB = CLIENT['venomkb-staging']
TEST_VENOMKB = CLIENT['venomkb-out-test']

UNIPROT_BASE = 'http://www.uniprot.org/uniprot/'
TOXPROT_PATH = UNIPROT_BASE +\
               '?query=annotation%3A%28type%3A"tissue+specificity"+venom%29&sort=score'


class VenomKB(object):
    """Holds all data records for VenomKB and supports searching"""
    def __init__(self):
        self.proteins = []
        self.venoms = []
        self.species = []
        self.molecular_effects = []
        self.systemic_effects = []
        self.mongo_connection = VENOMKB
        self._id_generator = IdGenerator()  # TODO: Store seed with database for reproducability

    def find_record_by_venomkb_id(self, query):
        """Find a record given semi-semantic VenomKB identifier"""
        pass

    def add_new_entry(self, objtype=Collection, vkbid=None, name=None,
                      ols=OutLinks(), mongoid=None, **kwargs):
        """Initialize an arbitrary record and add it to the database model"""
        new_entry = objtype(vkbid=vkbid, name=name, ols=ols, mongoid=mongoid,
                            id_gen=self._id_generator, **kwargs)
        if objtype == Protein:
            self.proteins.append(new_entry)
        elif objtype == Species:
            self.species.append(new_entry)
        elif objtype == Venom:
            self.venoms.append(new_entry)

    def load_database(self):
        """Read mongodb contents into local memory"""
        mongo_collections = {
            'proteins': VENOMKB['proteins'],
            'species': VENOMKB['species'],
            'venoms': VENOMKB['venoms']
        }
        for k, val in mongo_collections.iteritems():
            cur = val.find()
            if k == 'proteins':
                for prot in cur:
                    _new_p = Protein(aa_sequence=prot.get('aa_sequence'),
                                     vkbid=prot.get('venomkb_id'),
                                     name=prot.get('name'),
                                     mongoid=prot.get('_id'))
                    # TODO: `make_outlinks`  <=== still need to write this method
                    self.proteins.append(_new_p)
            elif k == 'species':
                pass
            elif k == 'venoms':
                for ven in cur:
                    _new_v = Venom(vkbid=ven.get('venomkb_id'),
                                   name=ven.get('name'),
                                   mongoid=ven.get('_id'))
                    self.venoms.append(_new_v)

    def wipe_database_contents(self):
        """Clear contents of every collection in venomkb"""
        if True:  # Safety switch...
            return
        VENOMKB['proteins'].delete_many({})
        VENOMKB['species'].delete_many({})
        VENOMKB['venoms'].delete_many({})

    def replace_database(self):
        """Delete mongodb data and write local data to empty database"""
        # TODO: Once this works ~flawlessly~, change database to use
        # the real VenomKB instead of the test database
        _out_db = TEST_VENOMKB
        _proteins_conn = _out_db['proteins']
        _species_conn = _out_db['species']
        _venoms_conn = _out_db['venoms']

        _proteins_conn.delete_many({})
        _species_conn.delete_many({})
        _venoms_conn.delete_many({})

        for _out_p in self.proteins:
            _new_mongo_id = _proteins_conn.insert_one(_out_p.to_json())
            _out_p._mongo_id = _new_mongo_id.inserted_id
        for _out_s in self.species:
            _new_mongo_id = _species_conn.insert_one(_out_s.to_json())
            _out_s._mongo_id = _new_mongo_id.inserted_id

    def update_database(self):
        """Update mongodb records that differ from local records"""
        pass

    def populate_from_toxprot(self):
        """Read all useful data from toxprot into the abstract database model"""
        toxprot_req = requests.get(TOXPROT_PATH + '&format=list')
        toxprot = toxprot_req.text.split('\n')
        peptides = {}  # PROTEINS INDEXED BY UNIPROT ID
        species = {}  # ORGANISMS INDEXED BY NCBI TAXID
        for t in tqdm(toxprot[:5]):
            peptides[t] = {'out_links': {'UniProtKB': t}}

            uniprot_dump = requests.get(UNIPROT_BASE + t + '.xml')
            #try:
            dump_tree = etree.fromstring(uniprot_dump.content)

            # get data for the protein
            for elem in dump_tree[0]:

                # Parse basic protein information
                if elem.tag == "{http://uniprot.org/uniprot}protein":
                    for sub_elem in elem:
                        # name
                        if sub_elem.tag == "{http://uniprot.org/uniprot}recommendedName":
                            peptides[t]['name'] = sub_elem.find('{http://uniprot.org/uniprot}fullName').text

                # Parse database references
                if elem.tag == "{http://uniprot.org/uniprot}dbReference":
                    db_type = elem.attrib['type']
                    props = {}
                    props['id'] = elem.attrib['id']
                    for prop in elem:
                        props[prop.attrib['type']] = prop.attrib['value']
                        peptides[t]['out_links'][db_type] = props
                    continue

                # Parse sequence data
                if elem.tag == "{http://uniprot.org/uniprot}sequence":
                    peptides[t]['aa_sequence'] = elem.text.lstrip().strip().replace('\n', '')
                    continue

                # Parse species data
                if elem.tag == "{http://uniprot.org/uniprot}organism":
                    spec_data = {'taxid': None,
                                 'scientific': None,
                                 'common': None}
                    for sub_elem in elem:
                        try:
                            if sub_elem.attrib['type'] == "NCBI Taxonomy":
                                spec_data['taxid'] = sub_elem.attrib['id']
                            if sub_elem.attrib['type'] == "scientific":
                                spec_data['scientific'] = sub_elem.text
                            if sub_elem.attrib['type'] == "common":
                                spec_data['common'] = sub_elem.text
                        except KeyError:
                            pass  # Maybe be smarter about this...
                    # Have we already created the species?
                    if spec_data['taxid'] in species:
                        # Add link to this protein
                        #try:
                        species[spec_data['taxid']]['proteins'].append(t)
                        #except Exception:
                        #    ipdb.set_trace()
                        #    print("Uh oh... we haven't found an ID for this protein yet!")
                    else:
                        # Create species, then add link to this protein
                        species[spec_data['taxid']] = {'scientific_name': spec_data['scientific'],
                                                       'common_name': spec_data['common']}
                        species[spec_data['taxid']]['proteins'] = [t]
                    continue


            #except Exception as exc:
            #    ipdb.set_trace()
            #    print("ERROR: Error parsing {0} - skipping".format(t))
            #    exit

        # now, copy data into abstract data model
        for p_key, p_val in peptides.iteritems():
            self.add_new_entry(objtype=Protein, name=p_val['name'],
                               aa_sequence=p_val['aa_sequence'],
                               ols=OutLinks(links_dict=p_val['out_links']))
        for s_key, s_val in species.iteritems():
            self.add_new_entry(objtype=Species, name=s_val['scientific_name'],
                               prot_list=s_val['proteins'])


if __name__ == "__main__":
    db = VenomKB()
    db.populate_from_toxprot()