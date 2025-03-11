from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from .api import api as api_blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')