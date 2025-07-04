
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Star
} from 'lucide-react';
import { getApplicationsByJob, updateApplicationStatus, getJobById, getUserProfile } from '@/services/firebase';
import { notifyApplicationStatusChange } from '@/services/notifications';

const ApplicationsManagement = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching applications for job:', jobId);
      
      const [jobData, applicationsData] = await Promise.all([
        getJobById(jobId!),
        getApplicationsByJob(jobId!)
      ]);

      console.log('Job data:', jobData);
      console.log('Applications data:', applicationsData);
      
      setJob(jobData);

      // Fetch applicant profiles
      const applicationsWithProfiles = await Promise.all(
        applicationsData.map(async (app: any) => {
          try {
            const profile = await getUserProfile(app.applicantId);
            console.log('Applicant profile for', app.applicantId, ':', profile);
            return { ...app, applicantProfile: profile };
          } catch (error) {
            console.error('Error fetching profile for applicant:', app.applicantId, error);
            return { ...app, applicantProfile: null };
          }
        })
      );

      console.log('Applications with profiles:', applicationsWithProfiles);
      setApplications(applicationsWithProfiles);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading applications",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, status: string, applicantId: string) => {
    try {
      console.log('Updating application status:', applicationId, status);
      await updateApplicationStatus(applicationId, status);
      
      // Send notification to applicant
      if (job?.title) {
        await notifyApplicationStatusChange(applicantId, job.title, status);
      }
      
      await fetchData(); // Refresh data
      
      toast({
        title: "Application status updated",
        description: `Application has been ${status}. Applicant has been notified.`
      });
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: "Failed to update status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const contactApplicant = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card className="bg-gray-900/50 border-gray-800 mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {application.applicantProfile?.profile?.profileImageUrl ? (
                <img 
                  src={application.applicantProfile.profile.profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">
                {application.applicantProfile?.profile?.firstName || 'Unknown'} {application.applicantProfile?.profile?.lastName || 'User'}
              </h3>
              <p className="text-gray-400 text-sm">
                Applied {new Date(application.appliedAt?.toDate?.() || application.appliedAt).toLocaleDateString()}
              </p>
              {application.applicantProfile?.profile?.experience && (
                <p className="text-emerald-400 text-sm font-medium">
                  {application.applicantProfile.profile.experience} years experience
                </p>
              )}
            </div>
          </div>
          <Badge 
            variant={
              application.status === 'pending' ? 'secondary' :
              application.status === 'shortlisted' ? 'default' : 
              application.status === 'accepted' ? 'default' :
              'destructive'
            }
            className={
              application.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
              application.status === 'shortlisted' ? 'bg-blue-500/20 text-blue-400' :
              application.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
              'bg-red-500/20 text-red-400'
            }
          >
            {application.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {application.applicantProfile?.email && (
            <div className="flex items-center text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{application.applicantProfile.email}</span>
            </div>
          )}
          {application.applicantProfile?.profile?.phoneNumber && (
            <div className="flex items-center text-gray-300">
              <Phone className="h-4 w-4 mr-2" />
              {application.applicantProfile.profile.phoneNumber}
            </div>
          )}
          {application.applicantProfile?.profile?.location && (
            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-2" />
              {application.applicantProfile.profile.location}
            </div>
          )}
          {application.applicantProfile?.profile?.education && (
            <div className="flex items-center text-gray-300">
              <Star className="h-4 w-4 mr-2" />
              Education background available
            </div>
          )}
        </div>

        {application.applicantProfile?.profile?.bio && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">Professional Bio:</p>
            <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
              {application.applicantProfile.profile.bio}
            </p>
          </div>
        )}

        {application.applicantProfile?.profile?.skills?.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">Skills & Expertise:</p>
            <div className="flex flex-wrap gap-2">
              {application.applicantProfile.profile.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {application.applicantProfile?.profile?.education && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">Education:</p>
            <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded">
              {application.applicantProfile.profile.education}
            </p>
          </div>
        )}

        {application.coverLetter && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">Cover Letter:</p>
            <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded border-l-4 border-blue-500">
              {application.coverLetter}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {application.applicantProfile?.profile?.resumeUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(application.applicantProfile.profile.resumeUrl, '_blank')}
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
          )}
          
          {application.applicantProfile?.email && (
            <Button
              variant="outline"
              onClick={() => contactApplicant(application.applicantProfile.email)}
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Applicant
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          {application.status === 'pending' && (
            <>
              <Button
                onClick={() => updateStatus(application.id, 'shortlisted', application.applicantId)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Shortlist
              </Button>
              <Button
                onClick={() => updateStatus(application.id, 'accepted', application.applicantId)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button
                onClick={() => updateStatus(application.id, 'rejected', application.applicantId)}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {application.status === 'shortlisted' && (
            <>
              <Button
                onClick={() => updateStatus(application.id, 'accepted', application.applicantId)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button
                onClick={() => updateStatus(application.id, 'rejected', application.applicantId)}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {(application.status === 'rejected' || application.status === 'accepted') && (
            <Button
              onClick={() => updateStatus(application.id, 'pending', application.applicantId)}
              variant="outline"
              className="border-gray-700"
            >
              <Clock className="h-4 w-4 mr-2" />
              Move to Pending
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Button 
          onClick={() => navigate('/dashboard')} 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Applications for {job?.title || 'Job'}
          </h1>
          <p className="text-gray-400 mt-2">{job?.company} • {job?.location}</p>
          <p className="text-gray-500 text-sm mt-1">Total Applications: {applications.length}</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="pending" className="data-[state=active]:bg-gray-800">
              Pending ({getApplicationsByStatus('pending').length})
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="data-[state=active]:bg-gray-800">
              Shortlisted ({getApplicationsByStatus('shortlisted').length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="data-[state=active]:bg-gray-800">
              Accepted ({getApplicationsByStatus('accepted').length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-gray-800">
              Rejected ({getApplicationsByStatus('rejected').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {getApplicationsByStatus('pending').map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {getApplicationsByStatus('pending').length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No pending applications</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shortlisted">
            <div className="space-y-4">
              {getApplicationsByStatus('shortlisted').map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {getApplicationsByStatus('shortlisted').length === 0 && (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No shortlisted applications</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="space-y-4">
              {getApplicationsByStatus('accepted').map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {getApplicationsByStatus('accepted').length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No accepted applications</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {getApplicationsByStatus('rejected').map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {getApplicationsByStatus('rejected').length === 0 && (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No rejected applications</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationsManagement;
