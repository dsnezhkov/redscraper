#!/bin/bash

TOPSITE="ibm"
BIN="./bin"
SKEL="./skel"


### Node mirror site 
echo "Mirroring $TOPSITE ..."
# Pass directory to create scraped content in as ARGV[2]
node $BIN/redscrub.js $TOPSITE

### Create Flask skeleton
echo "Creating Flask skeleton to serve scraped content ... "
touch $TOPSITE/__init__.py

SKELS=( "${SKEL}/server.py" "${SKEL}/hook.shim" )


for SKELF in "${SKELS[@]}"
do
	[ -f $SKELF ] && cp $SKELF $TOPSITE/
done


### Test Flask on scraped content
echo "Starting Flask ... "
#FLASK_APP=$TOPSITE.$TOPSITE
#FLASK_DEBUG=1
#/usr/local/bin/python -m flask run
/usr/local/bin/python $TOPSITE/$TOPSITE.py


