import os
import sys
import json
import requests
import ipdb
from pymongo import MongoClient

from venomkb_builder import VenomKB

VKB = VenomKB()
VKB.load_database()

for p in VKB.proteins:
    # does the species have a reference to PDB?
    ipdb.set_trace()