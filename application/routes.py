from app import application
from flask import render_template

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
    return render_template('/join.html')

# @application.route('/join')
# def join():
#     return render_template('/contact_us.html')
