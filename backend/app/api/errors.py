from flask import jsonify
from app import logger
from app.exceptions import ValidationError
from . import api


def bad_request(message):
    response = jsonify({'status': 'failed', 'error': 'bad request', 'message': message})
    response.status_code = 400
    logger.error(message)
    return response


def unauthorized(message):
    response = jsonify({'status': 'failed', 'error': 'unauthorized', 'message': message})
    response.status_code = 401
    logger.error(message)
    return response


def forbidden(message):
    response = jsonify({'status': 'failed', 'error': 'forbidden', 'message': message})
    response.status_code = 403
    logger.error(message)
    return response

def not_found(message):
    response = jsonify({'status': 'failed', 'error': 'not found', 'message': message})
    response.status_code = 404
    logger.error(message)
    return response

def server_error(message):
    response = jsonify({'status': 'failed', 'error': 'server error', 'message': message})
    response.status_code = 500
    logger.error(message)
    return response


@api.errorhandler(ValidationError)
def validation_error(e):
    return bad_request(e.args[0])