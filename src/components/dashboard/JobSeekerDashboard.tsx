
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  User, 
  FileText, 
  Search, 
  Heart, 
  Bell, 
  TrendingUp,
  MapPin,
  Building2,
  Clock
} from 'lucide-react';
import { useApplications } from '@/hooks/useApplications';
import { useUserProfile } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(currentUser?.uid || null);
  const { applications } = useApplications();
  const { savedJobs } = useSavedJobs();

  const profileCompletionScore = React.useMemo(() => {
    if (!profile?.profile) return 0;
    
    const fields = [
      profile.profile.firstName,
      profile.profile.lastName,
      profile.profile.bio,
      profile.profile.location,
      profile.profile.skills?.length > 0
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return (completedFields / fields.length) * 100;
  }, [profile]);

  const getApplicationsByStatus = (status: string) => {
    return applications.filter((app: any) => app.status === status);
  };

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Welcome back, {profile?.profile?.firstName || 'Job Seeker'}!
            </h1>
            <p className="text-gray-400 mt-1">Let's find your dream job today</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate('/jobs')}
              className="bg-gradient-to-r from-emerald-500 to-blue-500"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="border-gray-700"
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applications</p>
                  <p className="text-2xl font-bold text-white">{applications.length}</p>
                </div>
                <FileText className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{getApplicationsByStatus('pending').length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Shortlisted</p>
                  <p className="text-2xl font-bold text-green-400">{getApplicationsByStatus('shortlisted').length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Saved Jobs</p>
                  <p className="text-2xl font-bold text-blue-400">{savedJobs.length}</p>
                </div>
                <Heart className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Completion */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-emerald-400" />
                Complete Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Profile Completion</span>
                  <span className="text-gray-300">{Math.round(profileCompletionScore)}%</span>
                </div>
                <Progress value={profileCompletionScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                {profileCompletionScore < 100 && (
                  <>
                    {!profile?.profile?.bio && (
                      <p className="text-sm text-gray-400">• Add a professional bio</p>
                    )}
                    {!profile?.profile?.skills?.length && (
                      <p className="text-sm text-gray-400">• Add your skills</p>
                    )}
                    {!profile?.profile?.location && (
                      <p className="text-sm text-gray-400">• Add your location</p>
                    )}
                  </>
                )}
                {profileCompletionScore === 100 && (
                  <p className="text-sm text-emerald-400">✓ Profile is complete!</p>
                )}
              </div>

              <Button 
                onClick={() => navigate('/profile')}
                variant="outline" 
                className="w-full border-gray-700"
              >
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/jobs')}
                variant="outline" 
                className="w-full border-gray-700 justify-start"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse All Jobs
              </Button>
              
              <Button 
                onClick={() => navigate('/saved-jobs')}
                variant="outline" 
                className="w-full border-gray-700 justify-start"
              >
                <Heart className="h-4 w-4 mr-2" />
                Saved Jobs ({savedJobs.length})
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-700 justify-start"
              >
                <Bell className="h-4 w-4 mr-2" />
                Job Alerts
              </Button>
              
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline" 
                className="w-full border-gray-700 justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                Update Resume
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <div className="lg:row-span-2">
            <NotificationCenter />
          </div>
        </div>

        {/* Recent Applications */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-emerald-400" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((application: any) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Job Application #{application.id.slice(-6)}</h4>
                        <p className="text-sm text-gray-400">
                          Applied {new Date(application.appliedAt?.toDate?.() || application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={
                          application.status === 'pending' ? 'secondary' :
                          application.status === 'shortlisted' ? 'default' : 
                          'destructive'
                        }
                        className={
                          application.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          application.status === 'shortlisted' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No applications yet</p>
                <Button 
                  onClick={() => navigate('/jobs')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500"
                >
                  Start Applying
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
