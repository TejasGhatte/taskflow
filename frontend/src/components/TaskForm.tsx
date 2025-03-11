import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm = ({ onAddTask } : TaskFormProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter new task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;