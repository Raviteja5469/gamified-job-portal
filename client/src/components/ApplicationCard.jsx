import React from 'react'

function ApplicationCard({ application }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{application.applicantName}</h3>
        <p className="text-sm text-gray-600">{application.email}</p>
        <a
          href={`#${application.resume}`}
          className="text-sm text-blue-600 hover:underline"
          onClick={() => alert(`Viewing resume: ${application.resume}`)}
        >
          View Resume
        </a>
      </div>
    </div>
  );
}

export default ApplicationCard;
