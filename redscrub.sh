#!/bin/bash

TOPSITE=$( cat config/default.json  | jq .site.name| sed 's/"//g' ) 
BIN="./bin"
SKEL="./skel"
CONF="./config"


### Node mirror site 
echo -n "[+] Mirroring $TOPSITE ... "
node $BIN/redscrub.js $TOPSITE
echo "done"

# Setup
echo -n "[+] Setting FS up for $TOPSITE ... "
SKELS=( "${SKEL}/server.py" "${SKEL}/hook.jsm" "${CONF}/default.json" )

for SKELF in "${SKELS[@]}"
do
	[ -f $SKELF ] && cp $SKELF $TOPSITE/
done

mkdir $TOPSITE/static 
touch $TOPSITE/__init__.py
echo "done"



### Test Flask on scraped content
# echo "Starting Flask ... "
# FLASK_APP=$TOPSITE.$TOPSITE
# FLASK_DEBUG=1
# /usr/local/bin/python -m flask run
# /usr/local/bin/python $TOPSITE/server.py


