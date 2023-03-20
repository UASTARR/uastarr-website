from app import application
from flask import render_template

import sqlite3
from datetime import date # So that we can also save date and time

@application.route('/')
@application.route('/index')
def index():
    return render_template('index.html')

@application.route('/projects')
def projects():
    return render_template('projects.html')

@application.route('/sponsors')
def sponsors():
    return render_template('sponsors.html')

@application.route('/about-us')
def about_us():
    return render_template('about_us.html')

@application.route('/join')
def join():
    # on click submit, init database, save, then close database.
    return render_template('/join.html')

# We are going to use sqlite to store data into a database. Using 291.py as a reference.
def init_database():
    db = "default"
    conn = sqlite3.connect(db)
    cur = conn.cursor()


# @application.route('/join')
# def join():
#     return render_template('/contact_us.html')
