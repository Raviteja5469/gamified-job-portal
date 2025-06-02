import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://jobquest-backend-1-3l3w.onrender.com/api' ;

const JobPortalContext = createContext();

export function JobPortalProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleAuthenticated, setGoogleAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);

  // Google OAuth redirect
  const authenticateWithGoogle = async () => {
    if (!selectedRole) {
      console.error('No role selected');
      return;
    }

    try {
      // Store role in localStorage before redirect
      localStorage.setItem('selectedRole', selectedRole);
      window.location.href = `${API_URL}/api/auth/google`;
    } catch (error) {
      console.error('Error initiating Google auth:', error);
    }
  };

  // After redirect back from Google, check login status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/current_user`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
            setGoogleAuthenticated(true);
            setPoints(data.user.points || 0);
            setRank(data.user.rank || 0);
          }
        } else {
          // Only log error if not 401 (unauthorized)
          if (response.status !== 401) {
            console.error('Auth check failed:', response.status);
          }
          setIsAuthenticated(false);
          setGoogleAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth status check failed:', error);
        setIsAuthenticated(false);
        setGoogleAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const setUserRole = (role) => {
    setSelectedRole(role);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        setGoogleAuthenticated(false);
        setPoints(0);
        setRank(0);
        setSelectedRole(null);
        localStorage.removeItem('selectedRole');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Daily Sign-In', points: 10, description: 'Check in once per day', completed: false },
    { id: 2, name: 'Refer a Peer', points: 200, description: 'Unique referral link generates points on signup', completed: false },
    { id: 3, name: 'Apply for a Job', points: 5, description: 'Click "Apply" on a job listing via portal', completed: false },
    { id: 4, name: 'Upload Resume', points: 20, description: 'Add or update resume PDF/profile document', completed: false },
    { id: 5, name: 'Complete Profile', points: 50, description: 'Fill out all profile fields (education, skills)', completed: false },
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'Bangalore', recruiter: 'Jane Smith' },
    { id: 2, title: 'Data Analyst', company: 'DataInc', location: 'Mumbai', recruiter: 'Jane Smith' },
    { id: 3, title: 'Product Manager', company: 'Innovate', location: 'Delhi', recruiter: 'Jane Smith' },
  ]);

  const [referrals, setReferrals] = useState([
    { id: 1, email: 'friend1@example.com', status: 'Pending', points: 0 },
    { id: 2, email: 'friend2@example.com', status: 'Successful', points: 200 },
  ]);

  const [appliedJobs, setAppliedJobs] = useState([]);

  const [applications, setApplications] = useState([
    { id: 1, jobId: 1, applicantName: 'John Doe', email: 'john.doe@example.com', resume: 'resume1.pdf' },
    { id: 2, jobId: 1, applicantName: 'Alice Brown', email: 'alice.brown@example.com', resume: 'resume2.pdf' },
    { id: 3, jobId: 2, applicantName: 'Bob Wilson', email: 'bob.wilson@example.com', resume: 'resume3.pdf' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Student' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Recruiter' },
    { id: 3, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Student' },
  ]);

  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: 'User Registered', details: 'John Doe (Student)', timestamp: '2025-05-27 14:00:00' },
    { id: 2, action: 'Job Posted', details: 'Software Engineer by Jane Smith', timestamp: '2025-05-27 14:05:00' },
    { id: 3, action: 'Application Submitted', details: 'John Doe applied to Software Engineer', timestamp: '2025-05-27 14:10:00' },
  ]);

  const referralLink = user ? `https://jobquest.com/refer/${user.name.replace(/\s/g, '')}` : '';

  return (
    <JobPortalContext.Provider
      value={{
        isAuthenticated,
        googleAuthenticated,
        user,
        authenticateWithGoogle,
        setUserRole,
        selectedRole,
        logout,
        points,
        setPoints,
        rank,
        setRank,
        tasks,
        setTasks,
        jobs,
        setJobs,
        referrals,
        setReferrals,
        appliedJobs,
        setAppliedJobs,
        applications,
        setApplications,
        users,
        setUsers,
        activityLogs,
        setActivityLogs,
        referralLink,
      }}
    >
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
