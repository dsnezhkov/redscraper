#!/bin/bash

### Node mirror site 

### Create Flask skeleton
touch springcm/__init__.py

cat springcm/springcm.py<<EOF
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def show_index():
	return render_template('index.html')
EOF
