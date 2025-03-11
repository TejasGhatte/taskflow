from . import api
from flask import jsonify, request
from app import logger
from app.exceptions import ValidationError
from .errors import server_error, not_found
import uuid

tasks = [
    {"id": str(uuid.uuid4()), "title": "Complete project setup"},
    {"id": str(uuid.uuid4()), "title": "Implement backend APIs"},
    {"id": str(uuid.uuid4()), "title": "Create React frontend"}
]

@api.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({
        "status": "success",
        "tasks": tasks
    }), 200

@api.route('/tasks', methods=['POST'])
def create_task():
    data = request.json

    if not data or 'title' not in data:
        raise ValidationError('Title is required')
    
    if data.get('title', '').strip() == '':
        raise ValidationError('Title is required')
    
    new_task = {
        "id": str(uuid.uuid4()), 
        "title": data['title']
    }
    
    tasks.append(new_task)
    return jsonify({
        "status": "success",
        "message": "Task created successfully",
        "task": new_task
    }), 201

@api.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        global tasks
        original_length = len(tasks)
        tasks = [task for task in tasks if task['id'] != task_id]
        
        if len(tasks) == original_length:
            return not_found('Task not found')
        
        return jsonify({
            "status": "success",
            "message": "Task deleted successfully"
        }), 204
    except Exception as e:
        logger.error(e)
        return server_error('Something went wrong')