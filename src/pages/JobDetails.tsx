
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Briefcase,
  Heart,
  HeartHandshake,
  Ban
} from 'lucide-react';
import { useJob } from '@/hooks/useJobs';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useAuth';
import { saveJob, unsaveJob, isJobSaved } from '@/services/savedJobs';

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { profile } = useUserProfile(currentUser?.uid || null);
  const { job, loading } = useJob(jobId || '');
  const { submitApplication } = useApplications();
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [jobSaved, setJobSaved] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  // Check if user is an employer
  const isEmployer = profile?.role === 'employer';

  useEffect(() => {
    const checkIfJobSaved = async () => {
      if (currentUser && jobId) {
        const saved = await isJobSaved(currentUser.uid, jobId);
        setJobSaved(saved);
      }
    };
    checkIfJobSaved();
  }, [currentUser, jobId]);

  const handleSaveJob = async () => {
    if (!currentUser || !jobId) return;

    setSavingJob(true);
    try {
      if (jobSaved) {
        await unsaveJob(currentUser.uid, jobId);
        setJobSaved(false);
        toast({
          title: "Job Unsaved",
          description: "Job removed from your saved jobs.",
        });
      } else {
        await saveJob(currentUser.uid, jobId);
        setJobSaved(true);
        toast({
          title: "Job Saved",
          description: "Job added to your saved jobs.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingJob(false);
    }
  };

  const handleApply = async () => {
    if (!currentUser || !job) return;

    // Prevent employers from applying
    if (isEmployer) {
      toast({
        title: "Action Not Allowed",
        description: "Employers cannot apply to job postings. You can only post jobs and review applications.",
        variant: "destructive",
      });
      return;
    }

    try {
      setApplying(true);
      await submitApplication({
        jobId: job.id,
        applicantId: currentUser.uid,
        coverLetter,
        appliedAt: new Date()
      });

      toast({
        title: "Application Submitted!",
        description: "Your application has been submitted successfully.",
      });

      setCoverLetter('');
    } catch (error: any) {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Job not found</div>
          <Button onClick={() => navigate('/jobs')} className="bg-white text-black hover:bg-gray-200">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/jobs')}
            className="bg-white text-black hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>

          {currentUser && !isEmployer && (
            <Button
              onClick={handleSaveJob}
              disabled={savingJob}
              className={`${
                jobSaved 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {jobSaved ? (
                <>
                  <HeartHandshake className="h-4 w-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Save Job
                </>
              )}
            </Button>
          )}
        </div>

        {/* Job Details */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center space-x-6 text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.createdAt ? new Date(job.createdAt.toDate ? job.createdAt.toDate() : job.createdAt).toLocaleDateString() : 'Recently posted'}
                  </div>
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
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {job.description || 'No description provided'}
              </p>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {job.requirements}
                </p>
              </div>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Section */}
        {currentUser && !isEmployer && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Apply for this Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <Textarea
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>
                <Button
                  onClick={handleApply}
                  disabled={applying || !coverLetter.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white w-full hover:from-emerald-600 hover:to-blue-600"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Employer Restriction Notice */}
        {currentUser && isEmployer && (
          <Card className="bg-red-900/20 border-red-800">
            <CardContent className="p-8 text-center">
              <Ban className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-300 mb-2">Employer Account</h3>
              <p className="text-red-400 mb-4">
                As an employer, you cannot apply to job postings. Your account is designed for posting jobs and reviewing applications.
              </p>
              <Button
                onClick={() => navigate('/post-job')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600"
              >
                Post a Job Instead
              </Button>
            </CardContent>
          </Card>
        )}

        {!currentUser && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400 mb-4">You need to be logged in to apply for this job</p>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600"
              >
                Sign In to Apply
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
