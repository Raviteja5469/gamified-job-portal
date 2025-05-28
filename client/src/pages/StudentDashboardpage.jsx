import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Badge from '../components/Badge.jsx';
import QuickLinkCard from '../components/QuickLinkCard.jsx';
import TaskCard from '../components/TaskCard.jsx';
import JobCard from '../components/JobCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ReferralSection from '../components/ReferralSection.jsx';
import { useJobPortal } from '../context/JobPortalContext.jsx';
import { useState, useEffect } from 'react';
import React from 'react';

function StudentDashboard() {
  const { points, rank, user, tasks, jobs } = useJobPortal();
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Ensure filteredJobs is updated when jobs change
  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const milestones = [
    { points: 1000, badge: 'Bronze', className: 'badge-bronze' },
    { points: 2500, badge: 'Silver', className: 'badge-silver' },
    { points: 5000, badge: 'Gold', className: 'badge-gold' },
  ];

  const currentBadge = milestones.find(m => points >= m.points) || milestones[0];
  const nextMilestone = milestones.find(m => points < m.points) || milestones[milestones.length - 1];

  const handleFilterChange = ({ keyword, location }) => {
    const filtered = jobs.filter(job =>
      (keyword ? job.title.toLowerCase().includes(keyword.toLowerCase()) : true) &&
      (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true)
    );
    setFilteredJobs(filtered);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <p className="text-2xl font-bold text-blue-600">{points} Points</p>
              <p className="text-gray-600">Rank #{rank}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Progress to {nextMilestone.badge} ({nextMilestone.points} points)</p>
                <ProgressBar
                  progress={(points % nextMilestone.points) / (nextMilestone.points / 100)}
                />
              </div>
              {currentBadge && (
                <div className="mt-4">
                  <Badge name={currentBadge.badge} className={currentBadge.className} />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <QuickLinkCard
                  title="Tasks"
                  description="Complete career-focused tasks to earn points."
                  link="/student/tasks"
                />
                <QuickLinkCard
                  title="Referrals"
                  description="Invite friends and earn 200 points per signup."
                  link="/student/referrals"
                />
                <QuickLinkCard
                  title="Applied Jobs"
                  description="View your job applications."
                  link="/student/jobs"
                />
                <QuickLinkCard
                  title="Upload Resume"
                  description="Add or update your resume to earn 20 points."
                  link="/student/resume"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gamified Tasks Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gamified Tasks</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>

        {/* Job Board Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Board</h2>
          <FilterBar onFilterChange={handleFilterChange} />
          <div className="mt-4 space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="text-gray-600">No jobs match your filters.</p>
            )}
          </div>
        </section>

        {/* Referrals Section */}
        <section className="mb-8">
          <ReferralSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default StudentDashboard;