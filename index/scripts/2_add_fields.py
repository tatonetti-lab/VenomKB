from __future__ import print_function, division
import ipdb
import os
import sys
import re
import json
from pprint import pprint
from lxml import etree
import requests
from pymongo import MongoClient
from tqdm import tqdm

UNIPROT_BASE = 'http://www.uniprot.org/uniprot/'
TOXPROT_PATH = UNIPROT_BASE + '?query=annotation%3A%28type%3A"tissue+specificity"+venom%29&sort=score'

client = MongoClient('mongodb://54.198.136.17:27017')
db = client.venomkb_staging

# Iterate over proteins; add information
for i in xrange(db.proteins.count()):
	current = db.proteins.find()[i]
	