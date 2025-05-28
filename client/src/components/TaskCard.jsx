import React from 'react'

import { useJobPortal } from '../context/JobPortalContext.jsx';

function TaskCard({ task }) {
  const { tasks, setTasks, setPoints } = useJobPortal();

  const handleAction = () => {
    if (task.completed) return;
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: true } : t));
    setPoints(prev => prev + task.points);
    alert(`Completed ${task.name}! Awarded ${task.points} points.`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm font-medium text-blue-600">{task.points} Points</p>
      </div>
      <button
        onClick={handleAction}
        disabled={task.completed}
        className={`px-4 py-2 rounded-md ${
          task.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {task.completed ? 'Completed' : 'Complete'}
      </button>
    </div>
  );
}

export default TaskCard;
