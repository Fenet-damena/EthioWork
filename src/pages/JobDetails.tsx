
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Building2, Clock, DollarSign, Briefcase, Heart, Bookmark, Share2, Upload, ArrowLeft } from 'lucide-react';
import { useJob } from '@/hooks/useJob';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import { uploadFile } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { job, loading: jobLoading } = useJob(id || '');
  const { submitApplication } = useApplications();
  const { toast } = useToast();
  
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (jobLoading) {
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
          <Button onClick={() => navigate('/jobs')} variant="outline" className="border-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setIsApplying(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Resume must be under 5MB",
          variant: "destructive"
        });
        return;
      }
      setResume(file);
    }
  };

  const handleSubmitApplication = async () => {
    if (!currentUser || !resume) return;

    try {
      setSubmitting(true);
      
      // Upload resume
      const resumePath = `resumes/${currentUser.uid}/${Date.now()}_${resume.name}`;
      const resumeURL = await uploadFile(resume, resumePath);

      // Submit application
      await submitApplication({
        jobId: id,
        applicantId: currentUser.uid,
        resumeURL,
        coverLetter: coverLetter.trim(),
        appliedAt: new Date()
      });

      toast({
        title: "Application submitted",
        description: "Your application has been sent successfully!"
      });

      setIsApplying(false);
      setCoverLetter('');
      setResume(null);
    } catch (error: any) {
      toast({
        title: "Application failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Button 
          onClick={() => navigate('/jobs')} 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card className="bg-gray-900/50 border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
                  🏢
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400 text-lg mb-3">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      {job.type}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {job.workMode}
                    </Badge>
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      {job.salaryMin && job.salaryMax ? `${job.salaryMin} - ${job.salaryMax} ${job.currency}` : 'Competitive Salary'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleApply}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 px-8"
              >
                Apply Now
              </Button>
              <Button variant="outline" className="border-gray-700">
                Save Job
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                </CardContent>
              </Card>
            )}

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Job Type:</span>
                  <span className="text-white">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Work Mode:</span>
                  <span className="text-white">{job.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Posted:</span>
                  <span className="text-white">{new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}</span>
                </div>
                {job.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires:</span>
                    <span className="text-white">{new Date(job.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Modal */}
        {isApplying && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl m-4">
              <CardHeader>
                <CardTitle className="text-white">Apply for {job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm">Upload Resume *</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center mt-2">
                    {resume ? (
                      <div className="space-y-2">
                        <div className="text-emerald-400">{resume.name}</div>
                        <div className="text-gray-400 text-sm">{(resume.size / 1024 / 1024).toFixed(2)} MB</div>
                        <Button 
                          variant="outline" 
                          onClick={() => setResume(null)}
                          className="border-gray-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <div className="text-gray-300">Upload your resume</div>
                        <div className="text-gray-400 text-sm">PDF, DOC, DOCX (max 5MB)</div>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="resume-upload"
                        />
                        <Label htmlFor="resume-upload">
                          <Button variant="outline" className="border-gray-700" asChild>
                            <span>Choose File</span>
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 text-sm">Cover Letter (Optional)</Label>
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    rows={6}
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsApplying(false)}
                    className="border-gray-700"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitApplication}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500"
                    disabled={!resume || submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
