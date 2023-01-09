from application import application
from flask import Flask
from flask_assets import Bundle, Environment
from flask import render_template

assets = Environment(application)
css = Bundle("src/main.css", output="dist/main.css")

assets.register("css", css)
css.build()


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
