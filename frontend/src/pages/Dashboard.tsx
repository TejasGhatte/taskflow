import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import Toaster from '../utils/toaster';
import getHandler from '../handlers/get-handler';
import postHandler from '../handlers/post-handler';
import deleteHandler from '../handlers/delete-handler';
import { SERVER_ERROR } from '../config/errors';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchTasks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getHandler(`/tasks`);
      if (response.statusCode === 200) {
        setTasks(response.data.tasks);
      } else {
        if (response.data.message !== '') Toaster.error(response.data.message || response.data.error);
        Toaster.error(SERVER_ERROR);
      }
    } catch (err) {
      Toaster.error(SERVER_ERROR);
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (title: string): Promise<void> => {
    const response = await postHandler(`/tasks`, { title });
    if (response.statusCode === 201) {
      setTasks([...tasks, response.data.task]);
      Toaster.success('Task added successfully');
    } else {
      if (response.data.message !== '') Toaster.error(response.data.message);
      Toaster.error('Server Error');
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    const response = await deleteHandler(`/tasks/${id}`);
    if (response.statusCode === 204) {
      setTasks(tasks.filter(task => task.id !== id));
      Toaster.success('Task deleted successfully');
    } else {
      if (response.data.message !== '') Toaster.error(response.data.message);
      Toaster.error('Server Error');
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
          <TaskForm onAddTask={addTask} />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">Your Tasks</h2>
          <TaskList 
            tasks={tasks} 
            isLoading={isLoading}  
            onDeleteTask={deleteTask} 
          />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;