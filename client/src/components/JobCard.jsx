import React from 'react';
import { useJobPortal } from '../context/JobPortalContext.jsx';

function JobCard({ job }) {
  // Defensive check: return null if job is undefined
  if (!job) {
    return null;
  }

  const { appliedJobs, setAppliedJobs, setPoints } = useJobPortal();
  const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job.id);

  const handleApply = () => {
    if (isApplied) return;
    setAppliedJobs([...appliedJobs, job]);
    setPoints(prev => prev + 5);
    alert(`Applied to ${job.title}! Awarded 5 points.`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
      </div>
      <button
        onClick={handleApply}
        disabled={isApplied}
        className={`px-4 py-2 rounded-md ${
          isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isApplied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default JobCard;