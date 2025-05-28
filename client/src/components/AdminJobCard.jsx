import React from 'react'

import { useJobPortal } from '../context/JobPortalContext.jsx';

function AdminJobCard({ job }) {
  const { jobs, setJobs } = useJobPortal();

  const handleDelete = () => {
    setJobs(jobs.filter(j => j.id !== job.id));
    alert(`Deleted job: ${job.title}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
        <p className="text-sm text-gray-600">Posted by: {job.recruiter}</p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default AdminJobCard;
