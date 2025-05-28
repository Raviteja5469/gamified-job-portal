import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import RecruiterJobCard from '../components/RecruiterJobCard.jsx';
import ApplicationCard from '../components/ApplicationCard.jsx';
import { useJobPortal } from '../context/JobPortalContext.jsx';
import { useState } from 'react';

function RecruiterDashboard() {
  const { user, jobs, applications, setJobs } = useJobPortal();
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '' });

  // Filter jobs posted by this recruiter
  const recruiterJobs = jobs.filter(job => job.recruiter === user.name);

  // Calculate total applications
  const totalApplications = applications.filter(app => 
    recruiterJobs.some(job => job.id === app.jobId)
  ).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert('Please fill in all fields.');
      return;
    }
    const job = {
      id: jobs.length + 1,
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      recruiter: user.name,
    };
    setJobs([...jobs, job]);
    setNewJob({ title: '', company: '', location: '' });
    alert(`Added job: ${job.title}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user.name}!
        </h1>

        {/* Stats Section */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <p className="text-lg text-gray-600">Active Job Postings: {recruiterJobs.length}</p>
            <p className="text-lg text-gray-600">Total Applications: {totalApplications}</p>
          </div>
        </section>

        {/* Add New Job Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Job</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={newJob.title}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={newJob.company}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={newJob.location}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleAddJob}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Job
              </button>
            </div>
          </div>
        </section>

        {/* Job Postings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Job Postings</h2>
          <div className="space-y-4">
            {recruiterJobs.length > 0 ? (
              recruiterJobs.map(job => (
                <RecruiterJobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="text-gray-600">No job postings yet.</p>
            )}
          </div>
        </section>

        {/* Applications Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Applications</h2>
          {recruiterJobs.map(job => {
            const jobApplications = applications.filter(app => app.jobId === job.id);
            return (
              <div key={job.id} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title} ({jobApplications.length} Applications)
                </h3>
                <div className="space-y-4">
                  {jobApplications.length > 0 ? (
                    jobApplications.map(app => (
                      <ApplicationCard key={app.id} application={app} />
                    ))
                  ) : (
                    <p className="text-gray-600">No applications for this job yet.</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default RecruiterDashboard;