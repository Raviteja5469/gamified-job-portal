import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { JobPortalProvider, useJobPortal } from './context/JobPortalContext.jsx';
import Home from './pages/Home.jsx';
import StudentDashboard from './pages/StudentDashboardpage.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';

// Protected Route Component
function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user } = useJobPortal();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <JobPortalProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRole="Student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute allowedRole="Recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </JobPortalProvider>
  );
}

export default App;