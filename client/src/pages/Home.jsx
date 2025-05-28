import React from 'react'

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

function Home() {
  const features = [
    {
      title: 'Gamified Tasks',
      description: 'Earn points by completing daily tasks, referrals, and job applications.',
      icon: '🎮',
    },
    {
      title: 'Job Board',
      description: 'Explore and apply to jobs posted by top recruiters with ease.',
      icon: '💼',
    },
    {
      title: 'Points & Leaderboard',
      description: 'Track your progress and compete with peers on the leaderboard.',
      icon: '🏆',
    },
    {
      title: 'Admin Control',
      description: 'Admins manage users, tasks, and jobs through a powerful dashboard.',
      icon: '⚙️',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Why Choose JobQuest?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;


