from flask import jsonify
from app.exceptions import ValidationError
from . import api


def bad_request(message):
    response = jsonify({'status': 'failed', 'error': 'bad request', 'message': message})
    response.status_code = 400
    return response


def unauthorized(message):
    response = jsonify({'status': 'failed', 'error': 'unauthorized', 'message': message})
    response.status_code = 401
    return response


def forbidden(message):
    response = jsonify({'status': 'failed', 'error': 'forbidden', 'message': message})
    response.status_code = 403
    return response

def server_error(message):
    response = jsonify({'status': 'failed', 'error': 'server error', 'message': message})
    response.status_code = 500
    return response


@api.errorhandler(ValidationError)
def validation_error(e):
    return bad_request(e.args[0])