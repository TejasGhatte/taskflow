# TaskFlow

A minimal full-stack task management application with a React frontend and Flask backend.

## Overview

TaskFlow is a simple task management application that allows users to:
- View a list of tasks
- Add new tasks
- Delete existing tasks

The application consists of a React frontend for the user interface and a Flask backend for API endpoints and data storage.

## Features

- Landing page with navigation to dashboard
- Dashboard for task management
- In-memory task storage with server-side persistence
- RESTful API for task operations

![Landing View](./public/landing.png)

![Dashboard View](./public/dashboard.png)

## Tech Stack

### Frontend
- React
- React Router for navigation
- Axios backend communication
- Tailwind CSS for styling

### Backend
- Python
- Flask framework
- In-memory data storage

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| DELETE | /api/tasks/:task_id | Delete a task by ID |


## Setup and Installation

### Frontend Setup
```bash
# Navigate to client directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
flask run
```


## Development Process

This application was developed with a focus on:
1. Clean, functional implementation
2. Separation of concerns between frontend and backend
3. Simple but effective UI/UX
4. RESTful API design

## Conclusion
TaskFlow was developed as a minimal full-stack task management application as a hiring task for Loadminds, focusing on clean architecture and seamless interaction between the React frontend and Flask backend. It provides essential task operations through a RESTful API while maintaining a simple yet effective UI.

Thank you for this opportunity, I am eager to contribute in Loadminds!