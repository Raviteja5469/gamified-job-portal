import React from 'react'

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import UserCard from '../components/UserCard.jsx';
import AdminJobCard from '../components/AdminJobCard.jsx';
import ActivityLog from '../components/ActivityLog.jsx';
import ReportChart from '../components/ReportChart.jsx';
import { useJobPortal } from '../context/JobPortalContext.jsx';

function AdminDashboard() {
  const { user, users, jobs, applications, activityLogs } = useJobPortal();

  // Calculate total users (excluding the admin)
  const totalUsers = users.length;

  // Data for User Distribution by Role (Pie Chart)
  const userRoles = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const userRoleData = {
    labels: Object.keys(userRoles),
    datasets: [
      {
        data: Object.values(userRoles),
        backgroundColor: ['#3b82f6', '#8b5cf6'],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  };
  const userRoleOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  // Data for Job Postings by Location (Pie Chart)
  const jobLocations = jobs.reduce((acc, j) => {
    acc[j.location] = (acc[j.location] || 0) + 1;
    return acc;
  }, {});
  const jobLocationData = {
    labels: Object.keys(jobLocations),
    datasets: [
      {
        data: Object.values(jobLocations),
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  };
  const jobLocationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  // Data for Applications per Job (Bar Graph)
  const applicationsPerJob = jobs.map(job => {
    const jobApplications = applications.filter(app => app.jobId === job.id).length;
    return { title: job.title, count: jobApplications };
  });
  const applicationsData = {
    labels: applicationsPerJob.map(j => j.title),
    datasets: [
      {
        label: 'Applications',
        data: applicationsPerJob.map(j => j.count),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };
  const applicationsOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Applications',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Job Title',
        },
      },
    },
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
            <h2 className="text-xl font-semibold mb-4">Platform Stats</h2>
            <p className="text-lg text-gray-600">Total Users: {totalUsers}</p>
            <p className="text-lg text-gray-600">Total Job Postings: {jobs.length}</p>
            <p className="text-lg text-gray-600">Total Applications: {applications.length}</p>
          </div>
        </section>

        {/* Reports Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportChart
              type="pie"
              data={userRoleData}
              options={userRoleOptions}
              title="User Distribution by Role"
            />
            <ReportChart
              type="pie"
              data={jobLocationData}
              options={jobLocationOptions}
              title="Job Postings by Location"
            />
            <ReportChart
              type="bar"
              data={applicationsData}
              options={applicationsOptions}
              title="Applications per Job"
            />
          </div>
        </section>

        {/* Users Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>
          <div className="space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </div>
        </section>

        {/* Job Postings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Job Postings</h2>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <AdminJobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="text-gray-600">No job postings found.</p>
            )}
          </div>
        </section>

        {/* Activity Logs Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activityLogs.length > 0 ? (
              activityLogs.map(log => (
                <ActivityLog key={log.id} log={log} />
              ))
            ) : (
              <p className="text-gray-600">No recent activity.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;