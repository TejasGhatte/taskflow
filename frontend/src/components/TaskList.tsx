import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDeleteTask: (id: string) => void;
}

const TaskList = ({ tasks, isLoading, onDeleteTask } : TaskListProps) => {
  if (isLoading) {
    return <p className="text-gray-600">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-gray-600">No tasks yet. Add your first task above.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li 
          key={task.id} 
          className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
        >
          <span className="text-lg text-gray-800">{task.title}</span>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="px-3 py-1 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;