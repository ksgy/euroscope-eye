t = open('app/data/EuroScope20140425.txt').read()

pilots = []

def addpos(line):
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




for f in iter(t.splitlines()):
	if f[0:2] == '@N':
		line = f.split(':')
		addpos(line)

print("---------------")
for p in pilots:
	print(p.name, p.lat, p.lon)
