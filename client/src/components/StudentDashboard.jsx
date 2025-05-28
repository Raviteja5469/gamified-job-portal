import React, { useState, useEffect } from 'react'

const StudentDashboard = () => {
  // Mock data for student progress
  const [studentData, setStudentData] = useState({
    name: 'Jane Doe',
    totalPoints: 1250,
    rank: 'Silver Achiever',
    progressToNextMilestone: 75, // Percentage
    nextMilestone: 'Gold Tier (2000 points)',
    badges: ['First Task', 'Job Seeker', 'Referral Champion'],
    quickLinks: [
      { name: 'Tasks', icon: '📝', url: '#' },
      { name: 'Referrals', icon: '🤝', url: '#' },
      { name: 'Applied Jobs', icon: '💼', url: '#' },
      { name: 'Upload Resume', icon: '📄', url: '#' },
    ],
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    // For now, we're using mock data.
    console.log("Fetching student dashboard data...");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
          Welcome, {studentData.name}!
        </h1>

        {/* Points and Rank Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-lg flex items-center justify-between transform hover:scale-105 transition duration-300 ease-in-out">
            <div>
              <p className="text-2xl font-semibold mb-2">Total Points</p>
              <p className="text-6xl font-bold">{studentData.totalPoints}</p>
            </div>
            <span className="text-7xl">✨</span>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-xl shadow-lg flex items-center justify-between transform hover:scale-105 transition duration-300 ease-in-out">
            <div>
              <p className="text-2xl font-semibold mb-2">Your Rank</p>
              <p className="text-5xl font-bold">{studentData.rank}</p>
            </div>
            <span className="text-7xl">🏆</span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-12 bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Progress to Next Milestone</h2>
          <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-8 rounded-full text-white flex items-center justify-center text-lg font-bold transition-all duration-500 ease-out"
              style={{ width: `${studentData.progressToNextMilestone}%` }}
            >
              {studentData.progressToNextMilestone}%
            </div>
          </div>
          <p className="text-xl text-gray-700 text-center">Next Milestone: <span className="font-semibold text-orange-600">{studentData.nextMilestone}</span></p>
        </div>

        {/* Badges Section (Optional) */}
        <div className="mb-12 bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Badges</h2>
          {studentData.badges.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {studentData.badges.map((badge, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 text-lg font-medium px-5 py-2 rounded-full shadow-sm border border-purple-300 flex items-center space-x-2">
                  <span className="text-2xl">🏅</span> <span>{badge}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">No badges earned yet. Keep completing tasks!</p>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentData.quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-xl shadow-md hover:bg-blue-200 transform hover:scale-105 transition duration-300 ease-in-out text-blue-800 font-semibold text-xl"
              >
                <span className="text-5xl mb-3">{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default StudentDashboard
