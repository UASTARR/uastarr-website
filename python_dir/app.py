from application import application
from application import routes

from flask_assets import Bundle, Environment


assets = Environment(application)
css = Bundle("src/main.css", output="dist/main.css")

assets.register("css", css)
css.build()


