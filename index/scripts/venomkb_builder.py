from __future__ import print_function, division
import os
import sys
import json
import ipdb
from pymongo import MongoClient
from tqdm import tqdm
import dbinit_helpers

CLIENT = MongoClient('mongodb://54.198.136.17:27017')


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
                for prot in cur:
                    ipdb.set_trace()
                    self.proteins.append(Protein(aa_sequence=prot.get('aa_sequence'),
                                                 vkbid=prot.get('venomkb_id'),
                                                 name=prot.get('name'),
                                                 mongoid=prot.get('_id')))
    
    def overwrite_database(self):
        """Delete mongodb data and write local data to empty database"""
        pass

    def update_database(self):
        """Update mongodb records that differ from local records"""
        pass