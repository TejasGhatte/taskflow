import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import Toaster from '../utils/toaster';
import  getHandler  from '../handlers/get-handler';
import postHandler from '../handlers/post-handler';
import deleteHandler from '../handlers/delete-handler';
import { SERVER_ERROR } from '../config/errors';


const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getHandler(`/tasks`);
      if (response.statusCode == 200) {
        setTasks(response.data.tasks);
        setError(null);
      }
      else {
        if (response.data.message != '') Toaster.error(response.data.message || response.data.error);
        Toaster.error(SERVER_ERROR)
      }
    } catch (err) {
      Toaster.error(SERVER_ERROR)
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const response = await postHandler(`/tasks`, {
      title: newTaskTitle
    });

    if (response.statusCode == 201) {
      setTasks([...tasks, response.data.task]);
      setNewTaskTitle('');
      Toaster.success('Task added successfully');
    }
    else {
      if (response.data.message != '') Toaster.error(response.data.message);
      Toaster.error('Server Error')
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
      const response = await deleteHandler(`/tasks/${id}`);
      if (response.statusCode == 204) {
        setTasks(tasks.filter(task => task.id !== id));
        Toaster.success('Task deleted successfully');
      }
      else {
        if (response.data.message != '') Toaster.error(response.data.message);
        Toaster.error('Server Error')
      }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <header className="pb-4 mb-8 text-center border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">TaskFlow Dashboard</h1>
      </header>

      <main>
        <section className="mb-8">
          <form onSubmit={addTask} className="flex gap-2">
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
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">Your Tasks</h2>
          
          {isLoading && (
            <p className="text-gray-600">Loading tasks...</p>
          )}
          
          {error && (
            <p className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">{error}</p>
          )}
          
          {!isLoading && !error && tasks.length === 0 && (
            <p className="text-gray-600">No tasks yet. Add your first task above.</p>
          )}
          
          <ul className="space-y-3">
            {tasks.map(task => (
              <li 
                key={task.id} 
                className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
              >
                <span className="text-lg text-gray-800">{task.title}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;