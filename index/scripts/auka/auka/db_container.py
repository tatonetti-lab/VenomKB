import pymongo

class DbContainer(object):
	def __init__(self, conn_url='localhost', port='27017'):
		self.connection = conn_url
		self.port = port

	def connect(self):
		self.db = pymongo.MongoClient(self.connection, self.port)