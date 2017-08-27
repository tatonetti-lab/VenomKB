#!/usr/bin/env python

from __future__ import print_function

import os, sys
import requests
import json
import ipdb
import pickle
from tqdm import tqdm

from venomkb_builder import VenomKB

VKB = VenomKB()
VKB.load_database()

OVERWRITE = False

MESH_DATA_ROOT = "/Users/jdr2160/data/mesh/2017/ascii/"
PUBMED_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'


def parse_mesh_terms(medlinetext):
    terms = []
    for line in medlinetext.split('\n'):
        if line[:4] == u'MH  ':
            terms.append(line[6:])
    return terms


# Make MeSH data indices
# C: Diseases
# D: Chemicals/drugs
# ADD MORE

disease_stubs = ["C"]

DISEASES = {}
with open(MESH_DATA_ROOT + "mtrees2017.bin", 'r') as f:
    for line in f.readlines():
        code = line.split(';')[-1].strip()
        name = line.split(';')[0]
        if code[0] in disease_stubs:
            #DISEASES.append({'code': code, 'name': name})
            DISEASES[code] = name
disease_list = [v for k, v in DISEASES.iteritems()]

if OVERWRITE:
    mesh_by_prot = []
    for v in tqdm(VKB.proteins):
        try:
            mts = []
            vkbid = v.venomkb_id
            # fetch from venomkb API
            r = requests.get('http://venomkb.org/api/proteins/' + vkbid)
            ven = json.loads(r.text)[0]
            lit_refs = ven['literature_references']
            pmids = [x['pmid'] for x in lit_refs]
            for p in pmids:
                re = requests.get(PUBMED_BASE, params={'db': 'pubmed',
                                                       'rettype': 'MEDLINE',
                                                       'id': p})
                raw_mesh_terms = parse_mesh_terms(re.text)
                mts += raw_mesh_terms
            mesh_stumps = [x.split('/')[0].split('*')[-1] for x in mts]
            # any diseases?
            # annot_diseases = [x for x in mesh_roots if x in disease_list]
            # print(v.venomkb_id)
            # #print('ROOTS:')
            # #print(mesh_roots)
            # print('DISEASES:')
            # print(annot_diseases)
            # print()
            mesh_by_prot.append({'vkbid': v.venomkb_id,
                                 'mesh': mts,
                                 'mesh_stumps': mesh_stumps})
        except:
            print("Something bad happened---skipping protein {0}".format(v.venomkb_id))
    with open("mesh_stems.pkl", 'wb') as fp:
        pickle.dump(mesh_by_prot, fp)
else:
    mesh_by_prot = None
    with open("mesh_stems.pkl", 'rb') as fp:
        mesh_by_prot = pickle.load(fp)
