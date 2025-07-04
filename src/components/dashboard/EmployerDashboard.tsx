
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Plus, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  UserSearch,
  Ban
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getJobsByEmployer, deleteJob } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useAuth';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(currentUser?.uid || null);
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Prevent employers from applying to jobs
  useEffect(() => {
    if (currentUser && profile?.role === 'employer') {
      // Add a flag to prevent job applications
      localStorage.setItem('userRole', 'employer');
    }
  }, [currentUser, profile]);

  const fetchJobs = async () => {
    if (!currentUser) return;
    
    try {
      console.log('Fetching jobs for employer:', currentUser.uid);
      const employerJobs = await getJobsByEmployer(currentUser.uid);
      console.log('Employer jobs fetched:', employerJobs);
      setJobs(employerJobs);
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load your job postings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentUser, refreshKey]);

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    
    try {
      await deleteJob(jobId);
      toast({
        title: "Success",
        description: "Job posting deleted successfully.",
      });
      // Refresh the jobs list
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job posting.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((job: any) => job.status === 'active').length,
    totalApplications: jobs.reduce((acc: number, job: any) => acc + (job.applicationsCount || 0), 0)
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Employer Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Manage your job postings and find talent</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Jobs</p>
                  <p className="text-3xl font-bold text-white">{stats.totalJobs}</p>
                </div>
                <Briefcase className="h-12 w-12 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Jobs</p>
                  <p className="text-3xl font-bold text-white">{stats.activeJobs}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applications</p>
                  <p className="text-3xl font-bold text-white">{stats.totalApplications}</p>
                </div>
                <Users className="h-12 w-12 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => navigate('/post-job')}
            className="bg-gradient-to-r from-emerald-500 to-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
          
          <Button 
            onClick={() => navigate('/job-seekers')}
            variant="outline"
            className="border-gray-700"
          >
            <UserSearch className="h-4 w-4 mr-2" />
            Browse Job Seekers
          </Button>
          
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="border-gray-700"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Jobs'}
          </Button>
        </div>

        {/* Employer Restriction Notice */}
        <Card className="bg-red-900/20 border-red-800 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Ban className="h-5 w-5 text-red-400" />
              <p className="text-red-300 text-sm">
                <strong>Note:</strong> As an employer, you cannot apply to job postings. Your account is restricted to posting jobs and reviewing applications.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Your Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto mb-4"></div>
                <div className="text-gray-400">Loading your jobs...</div>
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job: any) => (
                  <div 
                    key={job.id} 
                    className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-300 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.applicationsCount || 0} applications</span>
                        </div>
                      </div>
                      <Badge 
                        variant={job.status === 'active' ? 'default' : 'secondary'}
                        className={job.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' 
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/20'
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>

                    {job.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {job.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Posted: {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="border-gray-600"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/applications/${job.id}`)}
                          className="border-gray-600"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Applications ({job.applicationsCount || 0})
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteJob(job.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <div className="text-gray-400 text-lg mb-2">No job postings yet</div>
                <p className="text-gray-500 mb-4">Create your first job posting to start finding candidates</p>
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
