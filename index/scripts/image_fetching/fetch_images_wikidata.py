from __future__ import print_function

import os
import sys
import json
import requests

# E.g., Bothrops atrox:
# https://www.wikidata.org/w/api.php?action=wbsearchentities&search=Bothrops%20atrox&language=en&format=json
# gets Q900848 as the ID
# https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=Q900848&property=P18&format=json
# gets images (P18) linked to Q900848. The value is "Common lancehead.jpg", and the datatype is "commonsMedia".
# So, build a wikimedia commons url with this filename:
# https://commons.wikimedia.org/wiki/File:Common_lancehead.jpg <-- notice that spaces are replaced with underscores