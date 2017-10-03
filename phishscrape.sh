#!/bin/bash

TOPSITE="dow"

### Node mirror site 
echo "Mirroring $TOPSITE ..."
# Pass directory to create scraped content in as ARGV[2]
#node scraper.js $TOPSITE
node gscraper.js $TOPSITE

### Create Flask skeleton
echo "Creating Flask skeleton to serve scraped content ... "
touch $TOPSITE/__init__.py

cat << EOF > $TOPSITE/$TOPSITE.py

#
# Sample scraped content presenter
#

from __future__ import print_function
from flask import Flask, render_template, request, json

import sys


app = Flask(__name__)


@app.route('/')
def show_index():
    return render_template('index.html')

# Expected and accepted form parameters
wFormFields = {'UserName': '', 'Password' : ''}

# We are not injecting CSRFs into our own scraped page, so relax the requirement
# If we need to we can bring in CSRFProtect and then exclude routed as needed
# Ex:
# from flask_wtf.csrf import CSRFProtect
# csrf = CSRFProtect(app)
# @csrf.exempt

@app.route("/save",  methods=['POST'])
def save_data():
    for field in wFormFields.keys():

       # Populate JSON data bag so you can extract relevant field easy.
       # Check if what is being submitted is what you want
       if field in request.form:
          for field in wFormFields.keys():
             wFormFields[field]=request.form[field]

          print(json.dumps(wFormFields))
          return '', 200
       else:
          print("check form parameters accepted: %s" % (json.dumps(request.form)), file=sys.stderr)
          return '', 400

    return '', 200 # We want to be quiet if unknown error occurs, change to debug

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
EOF

### Test Flask on scraped content
echo "Starting Flask ... "
#FLASK_APP=$TOPSITE.$TOPSITE
#FLASK_DEBUG=1
#/usr/local/bin/python -m flask run
/usr/local/bin/python $TOPSITE/$TOPSITE.py


