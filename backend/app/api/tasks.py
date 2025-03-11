from . import api
from flask import jsonify, request
import uuid

tasks = [
    {"id": str(uuid.uuid4()), "title": "Complete project setup"},
    {"id": str(uuid.uuid4()), "title": "Implement backend APIs"},
    {"id": str(uuid.uuid4()), "title": "Create React frontend"}
]

@api.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@api.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_task = {
        "id": str(uuid.uuid4()), 
        "title": data['title']
    }
    
    tasks.append(new_task)
    return jsonify(new_task), 201

@api.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    original_length = len(tasks)
    tasks = [task for task in tasks if task['id'] != task_id]
    
    if len(tasks) == original_length:
        return jsonify({"error": "Task not found"}), 404
    
    return jsonify({"message": "Task deleted successfully"}), 200