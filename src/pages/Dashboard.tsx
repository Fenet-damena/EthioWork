
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile, useAuthActions } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JobSeekerDashboard from '@/components/dashboard/JobSeekerDashboard';
import EmployerDashboard from '@/components/dashboard/EmployerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(currentUser?.uid || null);
  const { logout, loading: logoutLoading } = useAuthActions();
  const { toast } = useToast();

  // Show loading for maximum 15 seconds
  const [showFallback, setShowFallback] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message || "An error occurred during logout.",
        variant: "destructive",
      });
    }
  };

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

  // Logout button component
  const LogoutButton = () => (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleLogout}
        disabled={logoutLoading}
        variant="outline"
        className="bg-gray-900/50 backdrop-blur-xl border-gray-700 text-white hover:bg-gray-800/50"
      >
        {logoutLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        ) : (
          <LogOut className="h-4 w-4 mr-2" />
        )}
        {logoutLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );

  const renderDashboard = () => {
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

  return (
    <div className="relative">
      <LogoutButton />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
