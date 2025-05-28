import React from 'react'

function ActivityLog({ log }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-sm text-gray-600">{log.timestamp}</p>
      <p className="text-lg font-semibold text-gray-800">{log.action}</p>
      <p className="text-sm text-gray-600">{log.details}</p>
    </div>
  );
}

export default ActivityLog;
