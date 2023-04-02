from app import application
from flask import render_template,request

import sqlite3
from datetime import date # So that we can also save date and time

message = [{'firstName' : 'fName', 'lastName' : 'lName', 'eMail' : 'mail',
            'subject' : 'subjectField', 'know' : 'knowField', 'message' : 'messageField', 
            'subscribe' : 'subscribeBool'}]

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
def save_database():
    # This function will start database, save(executing some queries), then close database.
    databaseName = input("What is the name of the database?: ")
    db = "default"
    conn = sqlite3.connect(databaseName)
    cur = conn.cursor()

    # get the email
    # if person is not in the database then add to the database. 
    # if already in database check if they have any messages,
        # if they have a message, add the message and subject and increment the message number
        # if they don't have a message. Add the message and subject and set the message number to 1.
    # save 

@app.route('/data/', methods = {'POST', 'GET'})
def data():
    if request.method == 'GET':
        return f"The URL /data is accessed directly. Try going to '/form' to submit form"
    if request.methd == 'POST':
        form_data = request.form
        return render_template('data.html', form_data = form_data)

# @application.route('/join')
# def join():
#     return render_template('/contact_us.html')
