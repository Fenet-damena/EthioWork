
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  Edit, 
  Trash2,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  UserSearch
} from 'lucide-react';
import { useEmployerJobs } from '@/hooks/useJobs';
import { useUserProfile } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(currentUser?.uid || null);
  const { jobs, loading } = useEmployerJobs();

  console.log('Employer Dashboard - Current user:', currentUser?.uid);
  console.log('Employer Dashboard - Jobs:', jobs);

  const totalApplications = React.useMemo(() => {
    return jobs.reduce((total: number, job: any) => total + (job.applicationsCount || 0), 0);
  }, [jobs]);

  const activeJobs = jobs.filter((job: any) => job.status === 'active');
  const recentJobs = jobs.slice(0, 5);

  const handleViewApplicants = (jobId: string) => {
    navigate(`/applications/${jobId}`);
  };

  const handleEditJob = (jobId: string) => {
    // TODO: Implement edit job functionality
    console.log('Edit job:', jobId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Welcome back, {profile?.profile?.companyName || 'Employer'}!
            </h1>
            <p className="text-gray-400 mt-1">Manage your job postings and find great candidates</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate('/post-job')}
              className="bg-gradient-to-r from-emerald-500 to-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/job-seekers')}
              className="border-gray-700"
            >
              <UserSearch className="h-4 w-4 mr-2" />
              Find Candidates
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="border-gray-700"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Company Profile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Jobs</p>
                  <p className="text-2xl font-bold text-white">{jobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Jobs</p>
                  <p className="text-2xl font-bold text-green-400">{activeJobs.length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold text-blue-400">{totalApplications}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {jobs.filter((job: any) => {
                      const jobDate = new Date(job.createdAt?.toDate?.() || job.createdAt);
                      const now = new Date();
                      return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <Plus className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/post-job')}
                variant="outline" 
                className="border-gray-700 justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Plus className="h-5 w-5 mr-2 text-emerald-400" />
                    <span className="font-medium">Post New Job</span>
                  </div>
                  <p className="text-sm text-gray-400">Create a new job listing to attract candidates</p>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/job-seekers')}
                variant="outline" 
                className="border-gray-700 justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <UserSearch className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="font-medium">Browse Candidates</span>
                  </div>
                  <p className="text-sm text-gray-400">View job seeker profiles and find talent</p>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline" 
                className="border-gray-700 justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 mr-2 text-purple-400" />
                    <span className="font-medium">Update Company Profile</span>
                  </div>
                  <p className="text-sm text-gray-400">Manage your company information</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Job Postings */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-emerald-400" />
              Your Job Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map((job: any) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{job.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {job.applicationsCount || 0} applications
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={job.status === 'active' ? 'default' : 'secondary'}
                        className={
                          job.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }
                      >
                        {job.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => handleViewApplicants(job.id)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        View Applications
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => handleEditJob(job.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No job postings yet</p>
                <Button 
                  onClick={() => navigate('/post-job')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Job
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;
