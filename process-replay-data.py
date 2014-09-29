import sys


class pilot(object):

	def __init__(self, callsign):
		self.name = callsign
		self.sq = ''
		self.lat = []
		self.lon = []
		self.alt = []
		self.hdg = []


pilots = []

def addpos(line):

	global pilots
	global t

	inPilots = False

	# 0 - #@<transponder flag> N
	# 1 - <callsign> SMA
	# 2 - <squawk code> 2646
	# 3 - 1
	# 4 - <latitude> 45.655
	# 5 - <longitude> 7.15
	# 6 - <altitude> 35521
	# 7 - 0 354
	# 8 - <heading> 42149
	# 9 - 0 39

	callsign = line[1]
	sq = line[2]
	lat = line[4]
	lon = line[5]
	alt = line[6]
	hdg = int(line[8]) / 4 / 2.8 - 0.5


	for p in pilots:
		if(p.name == callsign):
			inPilots = True

	if not inPilots:
		ppp = pilot(callsign)
		ppp.sq = sq
		ppp.lat.append(lat)
		ppp.lon.append(lon)
		ppp.alt.append(alt)
		ppp.hdg.append(hdg)

		pilots.append(ppp)
	else:

		for p in pilots:
			if(p.name == callsign):
				p.sq = sq
				p.lat.append(lat)
				p.lon.append(lon)
				p.alt.append(alt)
				p.hdg.append(hdg)

replayfiles = [
'app/data/EuroScope20140321.txt',
'app/data/EuroScope20140328.txt',
'app/data/EuroScope20140404.txt',
'app/data/EuroScope20140411.txt',
'app/data/EuroScope20140418.txt',
'app/data/EuroScope20140425.txt',
'app/data/EuroScope20140503.txt',
'app/data/EuroScope20140509.txt',
'app/data/EuroScope20140516.txt',
'app/data/EuroScope20140524.txt',
'app/data/EuroScope20140530.txt',
'app/data/EuroScope20140606.txt',
'app/data/EuroScope20140613.txt',
'app/data/EuroScope20140620.txt',
'app/data/EuroScope20140627.txt',
'app/data/EuroScope20140704.txt',
'app/data/EuroScope20140711.txt',
'app/data/EuroScope20140718.txt',
'app/data/EuroScope20140725.txt',
'app/data/EuroScope20140801.txt',
'app/data/EuroScope20140809.txt',
'app/data/EuroScope20140816.txt',
'app/data/EuroScope20140822.txt',
'app/data/EuroScope20140829.txt',
'app/data/EuroScope20140905.txt',
'app/data/EuroScope20140912.txt',
'app/data/EuroScope20140919.txt',
]
print '{ "data": ['
for fff in replayfiles:
	pilots = []
	t = open(fff).read()
	for f in iter(t.splitlines()):
		if f[0:2] == '@N':
			line = f.split(':')
			addpos(line)

	print '{\n\t"name": ' + '"' + fff + '", '
	print '\t"positions": ['
	for p in pilots:
		print('\t\t{ "name": "' + p.name +'", "lat": ['+','.join('"'+str(la)+'"' for la in p.lat) + '], "lon": [' + ','.join('"'+str(lo)+'"' for lo in p.lon) + '], "alt": [' + ','.join('"'+str(a)+'"' for a in p.alt) + '], "hdg": [' + ','.join('"'+str(h)+'"' for h in p.hdg) + ']},')

	print '\t]\n},'

print ']}'
