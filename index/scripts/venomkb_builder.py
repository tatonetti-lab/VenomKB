from __future__ import print_function, division
import os
import sys
import json
import ipdb
from pymongo import MongoClient
from tqdm import tqdm
import dbinit_helpers

CLIENT = MongoClient('mongodb://54.198.136.17:27017')


class OutLink(object):
    """Container for an array of links to external databases"""
    def __init__(self, db_name=None, db_id=None):
        self.db_name = db_name
        self.db_id = db_id


class OutLinks(object):
    """Container for a link to an external database"""
    def __init__(self):
        self.links = []

    def add_link(self, db_name=None, foreign_id=None):
        """Append an OutLink object to self"""
        self.links.append(OutLink(db_name, foreign_id))


class Collection(object):
    """Generic container for a data record in VenomKB"""
    def __init__(self, vkbid=None, name=None, ols=OutLinks(),
                 mongoid=None):
        self.venomkb_id = vkbid
        self.name = name
        self.out_links = ols
        self._mongo_id = mongoid

    def to_json(self):
        """Write a single data record to JSON format"""
        pass

    def validate_attributes(self):
        """Check that all attributes are a valid format"""
        pass


class Protein(Collection):
    """Container class for holding Protein objects"""
    def __init__(self,
                 description=None,
                 aa_sequence=None,
                 **kwargs):
        """Most attributes have default initialization to None"""
        super(Protein, self).__init__(**kwargs)
        self.description = description
        self.aa_sequence = aa_sequence
        self.venom_ref = None


class Venom(Collection):
    """Container class for a Venom object"""
    def __init__(self):
        super(Venom, self).__init__()
        self.species_ref = None
        self.proteins = []


class Species(Collection):
    """Container class for a Species in VenomKB"""
    def __init__(self):
        super(Species, self).__init__()
        self.venom_ref = None


class MolecularEffect(Collection):
    """Container class for an effect a venom has on a molecular structure"""
    def __init__(self):
        super(MolecularEffect, self).__init__()
        self.proteins_caused_by = []


class SystemicEffect(Collection):
    """Container class for a higher-order effect a venom has on the human body"""
    def __init__(self):
        super(SystemicEffect, self).__init__()
        self.proteins_caused_by = []


class Database(object):
    """Holds all data records for VenomKB and supports searching"""
    def __init__(self):
        self.proteins = []
        self.venoms = []
        self.species = []
        self.molecular_effects = []
        self.systemic_effects = []

    def find_record_by_venomkb_id(self, query):
        """Find a record given semi-semantic VenomKB identifier"""
        pass

    def add_new_entry(self, objtype=Collection, vkbid=None, name=None,
                      ols=OutLinks(), mongoid=None):
        """Initialize an arbitrary record and add it to the database model"""
        new_entry = objtype(vkbid=vkbid, name=name, ols=ols, mongoid=mongoid)
        if objtype == Protein:
            #new_entry = Protein(vkbid=vkbid, name=name, ols=ols, mongoid=mongoid)
            self.proteins.append(new_entry)

    def load_database(self):
        """Read mongodb contents into local memory"""
        venomkb = CLIENT['venomkb-staging']
        mongo_collections = {
            'proteins': venomkb['proteins'],
            'species': venomkb['species'],
            'venoms': venomkb['venoms']
        }
        for k, val in mongo_collections.iteritems():
            cur = val.find()
            if k == 'proteins':
                ipdb.set_trace()
                for prot in cur:
                    self.proteins.append(Protein())
    
    def overwrite_database(self):
        """Delete mongodb data and write local data to empty database"""
        pass

    def update_database(self):
        """Update mongodb records that differ from local records"""
        pass