
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

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading your dashboard...</div>
          <div className="text-gray-400 text-sm mt-2">Setting up your workspace</div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-4">Setting up your profile...</div>
          <div className="text-gray-400">This should only take a moment</div>
        </div>
      </div>
    );
  }

  switch (profile.role) {
    case 'job_seeker':
      return <JobSeekerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/auth" replace />;
  }
};

export default Dashboard;
