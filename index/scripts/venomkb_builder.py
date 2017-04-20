from __future__ import print_function, division
import os
import sys
import json
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


class Database(object):
    """Holds all data records for VenomKB and supports searching"""
    def __init__(self):
        self.proteins = []
        self.venoms = []
        self.species = []
        self.molecular_effects = []
        self.systemic_effects = []

    def find_record_by_venomkb_id(self, query):
        pass

    def load_database(self):
        db = CLIENT['venomkb-staging']
        mongo_collections = {
            'proteins': db['proteins'],
            'species': db['species'],
            'venoms': db['venoms']
        }
        for k, v in mongo_collections.iteritems():
            cur = v.find()
            if k == 'proteins':
                
            elif k == 'species':
                cur = v.find
            elif k == 'venoms':
                cur = v.find()
    
    def overwrite_database(self):
        pass

    def update_database(self):
        pass


class Collection(object):
    """Generic container for a data record in VenomKB"""
    def __init__(self):
        self.venomkb_id = ""
        self.name = ""
        self.out_links = OutLinks()
        self._mongo_id = ""

    def to_json(self):
        pass

    def validate_attributes(self):
        pass


class Protein(Collection):
    """Container class for holding Protein objects"""
    def __init__(self,
                 description=None,
                 aa_sequence=None):
        """Most attributes have default initialization to None"""
        super(Protein, self).__init__()
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
