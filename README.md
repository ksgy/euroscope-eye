# Euroscope eye
An web-based Euroscope replay viewer

## Replay file (txt)
From Euroscope wiki page: <http://www.euroscope.hu/mediawiki/index.php?title=Scenario_File>


### Aircraft Positions

You can define as many number of aircraft as you need for the session. Be aware that simulating an aircraft probably needs more concentration than controlling them. To define an aircraft you should define the starting position and altitude:

	@<transponder flag>:<callsign&gt:<squawk code>:1:<latitude>:<longitude>:<altitude>:0:<heading>:0

-  Where transponder flag can be N for normal or S for stand by transponder mode
-  latitude and longitude can be the format found in the sectorfile or simple double values
-  do not forget the static 1 at the 4th position and the two static 0 values at the end (they are there for some technical reasons only)
-  the heading value is a bit complicated, use the requested heading in degrees and use the following formula to decide the value to be put here: ((int) ( Heading * 2.88 + 0.5 )) << 2 ) - or if it is easier: ( Heading * 2.88 + 0.5 ) * 4.
-  when transponder is set to 0000 the simulator will display it as a vehicle.
