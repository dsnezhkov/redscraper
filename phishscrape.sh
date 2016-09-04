#!/bin/bash

TOPSITE="springcm"

### Node mirror site 
echo "Mirroring $TOPSITE ..."
# Pass directory to create scraped content in as ARGV[2]
node scraper.js $TOPSITE

### Create Flask skeleton
echo "Creating Flask skeleton to serve scraped content ... "
touch $TOPSITE/__init__.py

cat << EOF > $TOPSITE/$TOPSITE.py
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def show_index():
	return render_template('index.html')
EOF

### Test Flask on scraped content
echo "Starting Flask ... "
FLASK_APP=$TOPSITE.$TOPSITE
FLASK_DEBUG=1
/usr/local/bin/python -m flask run

