
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Briefcase,
  Heart
} from 'lucide-react';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useAuth } from '@/contexts/AuthContext';
import { unsaveJob } from '@/services/savedJobs';
import { useToast } from '@/hooks/use-toast';

const SavedJobs = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { savedJobs, loading, refetch } = useSavedJobs();
  const { toast } = useToast();

  const handleUnsaveJob = async (jobId: string) => {
    if (!currentUser) return;

    try {
      await unsaveJob(currentUser.uid, jobId);
      await refetch();
      toast({
        title: "Job Removed",
        description: "Job removed from your saved jobs.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove job.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading saved jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="mr-4 bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Saved Jobs
            </h1>
            <p className="text-gray-400 text-lg">Your bookmarked job opportunities</p>
          </div>
        </div>

        {/* Saved Jobs List */}
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {savedJobs.map((job: any) => (
              <Card key={job.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            {job.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.createdAt ? new Date(job.createdAt.toDate ? job.createdAt.toDate() : job.createdAt).toLocaleDateString() : 'Recently posted'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleUnsaveJob(job.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Heart className="h-4 w-4 mr-2 fill-current" />
                      Unsave
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      {job.type || 'Full-time'}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {job.workMode || 'Onsite'}
                    </Badge>
                    {job.salaryMin && job.salaryMax && (
                      <div className="flex items-center text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salaryMin} - {job.salaryMax} {job.currency || 'ETB'}
                      </div>
                    )}
                  </div>

                  {job.description && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Saved on {new Date().toLocaleDateString()}
                    </div>
                    <Button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600"
                    >
                      View Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Saved Jobs</h3>
              <p className="text-gray-400 mb-6">
                You haven't saved any jobs yet. Start browsing and save jobs you're interested in!
              </p>
              <Button
                onClick={() => navigate('/jobs')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600"
              >
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
