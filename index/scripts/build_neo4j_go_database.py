from __future__ import print_function

from neo4j.v1 import GraphDatabase, basic_auth
import os, sys
import json
import pickle
import ipdb
from tqdm import tqdm

from infer_effects_go import Graph, GOgraph

# DOMAIN MODEL
# (:Annotation {go_id})-[:


with open('go_graph.pkl', 'rb') as fp:
    go_graph = pickle.load(fp)

with open('go_graph_neo4j_input.csv', 'w') as fp:
    print('child,relation,parent', file=fp)
    for child, parents in tqdm(go_graph._rel_table.iteritems()):
        for k, v in parents.iteritems():
            print('{0},{1},{2}'.format(child, v, k), file=fp)
