#!/usr/bin/env python

from __future__ import print_function

import os, sys
import requests
import json
import ipdb
import pickle
from tqdm import tqdm
from collections import defaultdict

from venomkb_builder import VenomKB

VKB = VenomKB()
VKB.load_database()

OVERWRITE = False

testgraph = {'A': ['B', 'C'],
             'B': ['C', 'D'],
             'C': ['D'],
             'D': ['C'],
             'E': ['F'],
             'F': ['C']}


class Graph(object):
    """Graph data structure implemented using dictionaries.

    Adapted from https://www.python.org/doc/essays/graphs/, and
    targeted for Python 2.7."""
    
    def __init__(self, graph_as_dict={}):
        self._graph = graph_as_dict

    def __repr__(self):
        return "Graph of {0} nodes".format(len(self._graph))

    def has_key(self, key):
        return key in self._graph.keys()

    def add_node(self, label, parents=[], children=[]):
        assert set(parents).issubset(self._graph.keys())
        assert set(children).issubset(self._graph.keys())
        assert label not in self._graph.keys()
        self._graph[label] = children
        for p in parents:
            self._graph[p].append(label)

    def find_path(self, start, end, path=[]):
        """You should usually use find_shortest_path(),
        but if search efficiency is a concern this can be useful in a pinch."""
        path = path + [start]
        if start == end:
            return path
        if not self.has_key(start):
            return None
        for node in self._graph[start]:
            if node not in path:
                newpath = self.find_path(node, end, path)
                if newpath: return newpath
        return newpath

    def find_all_paths(self, start, end, path=[]):
        path = path + [start]
        if start == end:
            return [path]
        if not self.has_key(start):
            return []
        paths = []
        for node in self._graph[start]:
            if node not in path:
                newpaths = self.find_all_paths(node, end, path)
                for newpath in newpaths:
                    paths.append(newpath)
        return paths

    def find_shortest_path(self, start, end, path=[]):
        path = path + [start]
        if start == end:
            return path
        if not self.has_key(start):
            return None
        shortest = None
        for node in self._graph[start]:
            if node not in path:
                newpath = find_shortest_path(node, end, path)
                if newpath:
                    if not shortest or len(newpath) < len(shortest):
                        shortest = newpath
        return shortest

    def find_all_roots(self):
        """Any node that is not in the list of children of any other
        node must be a 'root'. The existence of one root does not imply
        a graph is a DAG, but it is a prerequisite for all DAGs.
        
        This isn't an efficient algorithm!

        Complexity: O(n^2)"""
        candidates = self._graph.keys()
        roots = []
        for c in candidates:
            if len([1 for _, v in testgraph.iteritems() if c in v]) > 0:
                roots.append(c)
        if len(roots) == 0:
            return None
        return roots

    def topological_sort(self):
        """Create a list of nodes where each node occurs before all
        of its children.

        Solution is not guaranteed to be unique."""
        L = []
        Q = self.find_all_roots()
        

    def is_dag(self):
        """If we can perform topological sort, then it is a DAG."""
        pass


class GOgraph(Graph):
    def __init__(self):
        super(GOgraph, self).__init__()


go_by_prot = []
if OVERWRITE:
    for v in tqdm(VKB.proteins):
        try:
            mts = []
            vkbid = v.venomkb_id
            # fetch from venomkb API
            r = requests.get('http://venomkb.org/api/proteins/' + vkbid)
            ven = json.loads(r.text)[0]
            go = ven['go_annotations']
            go_by_prot.append({'vkbid': v.venomkb_id,
                               'go_annotations': go})
        except:
            pass
    with open('go_annotations.pkl', 'wb') as fp:
        pickle.dump(go_by_prot, fp)
else:
    with open('go_annotations.pkl', 'rb') as fp:
        go_by_prot = pickle.load(fp)

