
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import JobSeekerDashboard from '@/components/dashboard/JobSeekerDashboard';
import EmployerDashboard from '@/components/dashboard/EmployerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(currentUser?.uid || null);

  // Show loading for maximum 15 seconds
  const [showFallback, setShowFallback] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading authentication...</div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (profileLoading && !showFallback) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Setting up your dashboard...</div>
          <div className="text-gray-400 text-sm mt-2">This should only take a moment</div>
        </div>
      </div>
    );
  }

  // If still loading after timeout or no profile, create default profile
  const userProfile = profile || {
    role: 'job_seeker',
    profile: {
      firstName: '',
      lastName: '',
      bio: '',
      skills: [],
      location: '',
      phoneNumber: ''
    },
    email: currentUser.email
  };

  switch (userProfile.role) {
    case 'job_seeker':
      return <JobSeekerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <JobSeekerDashboard />;
  }
};

export default Dashboard;
