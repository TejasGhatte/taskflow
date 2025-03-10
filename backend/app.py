from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
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

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    original_length = len(tasks)
    tasks = [task for task in tasks if task['id'] != task_id]
    
    if len(tasks) == original_length:
        return jsonify({"error": "Task not found"}), 404
    
    return jsonify({"message": "Task deleted successfully"}), 200

if __name__ == '__main__':

    tasks = [
        {"id": str(uuid.uuid4()), "title": "Complete project setup"},
        {"id": str(uuid.uuid4()), "title": "Implement backend APIs"},
        {"id": str(uuid.uuid4()), "title": "Create React frontend"}
    ]
    app.run(debug=True)