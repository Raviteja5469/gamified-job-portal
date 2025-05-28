import React from 'react'

import { createContext, useContext, useState } from 'react';

const JobPortalContext = createContext();

export function JobPortalProvider({ children }) {
  const [points, setPoints] = useState(850); // Mock data, replace with API call
  const [rank, setRank] = useState(42); // Mock data
  const [user, setUser] = useState({
    name: 'John Doe', // Mock data
    role: 'Student',
  });

  return (
    <JobPortalContext.Provider value={{ points, setPoints, rank, setRank, user, setUser }}>
      {children}
    </JobPortalContext.Provider>
  );
}

export function useJobPortal() {
  const context = useContext(JobPortalContext);
  if (!context) {
    throw new Error('useJobPortal must be used within a JobPortalProvider');
  }
  return context;
}
