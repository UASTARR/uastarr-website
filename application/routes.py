from app import application
from flask import render_template,request
import os
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

    return render_template('projects.html', value="null")

@application.route('/sponsors')
def sponsors():
    return render_template('sponsors.html')

@application.route('/about-us')
def about_us():
    relative_path_to_imgs = "../static/assets/headshots/"
    relative_path = "application\databases\main.db"
    conn = sqlite3.connect(relative_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name, title, imgref FROM members;")
    rows = cursor.fetchall()
    members = list()
    for row in rows:
        member = dict()
        member["name"] = row[0]
        member["title"] = row[1]
        member["imgref"] = relative_path_to_imgs + row[2]
        members.append(member)

    conn.close()

    return render_template('about_us.html', members=members)

@application.route('/photo-albums')
def photos():
    relative_path = "application\databases\main.db"
    conn = sqlite3.connect(relative_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM albums;")
    rows = cursor.fetchall()
    photos = list()
    for row in rows:
        photo = dict()
        photo["title"] = row[0]
        photo["description"] = row[1]
        photo["imglink"] = row[2]
        photo["albumlink"] = row[3]
        photos.append(photo)

    conn.close()
    return render_template('photos.html', photos=photos)

@application.route('/join')
def join():
    # on click submit, init database, save, then close database.
    return render_template('/join.html')

"""
Work related to email database

# We are going to use sqlite to store data into a database. Using 291.py as a reference.
def save_database():
    # This function will start database, save(executing some queries), then close database.
    databaseName = input("What is the name of the database?: ")
    db = "default"
    conn = sqlite3.connect(databaseName)
    cur = conn.cursor()

    # Flask get: first name, last name, email, subject, how, message

    # get the email
    # if person is not in the database then add to the database. 
    cur.execute('''
    SELECT * FROM person WHERE email = :email AND fName = :firstName AND lname = :lastName;
    ''', {'email' : email, 'firstName' : firstName, 'lastName' : lastName})

    person_row = cur.fetchall()
    person_exists = len(person_row) > 0 # if more than one then the person exists.
    if not person_exists:
        # If the person doesn't exist, make a table of the person.
        print("The person does not exist. Will add to database.")
        cur.execute('''
        INSERT INTO person VALUES (:fName, :lName, :email);
        ''', {'fName' : firstName, 'lName' : lastName, 'email' : email})
        conn.commit()

    newDate = date.now() ### some thing like this


    ### Initialize first message so we can also tell when was the last message made by the person with this email
    cur.execute('''
        INSERT INTO message VALUES (0, :email, 0, 0, 0, :date);
        ''', {'email' : email, 'date' : newDate})
    conn.commit()
    

    cur.execute('''
    SELECT numMessage FROM message WHERE email = :email ORDER BY DESC;
    ''', {'email' : email})

    message_count = cur.fetchone()[0]

    cur.execute('''
    INSERT INTO message VALUES (:num, :email, :subject, :how, :message, :date);
    ''', {'num' : message_count+1, 'email' : email, 'subject' : subject, 'how' : howKnow, 'message' : messageText, 'date' : newDate})
    conn.commit()
    conn.close()

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

"""