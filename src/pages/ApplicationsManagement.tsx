
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
  Clock
} from 'lucide-react';
import { getApplicationsByJob, updateApplicationStatus, getJobById, getUserProfile } from '@/services/firebase';

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
      const [jobData, applicationsData] = await Promise.all([
        getJobById(jobId!),
        getApplicationsByJob(jobId!)
      ]);

      setJob(jobData);

      // Fetch applicant profiles
      const applicationsWithProfiles = await Promise.all(
        applicationsData.map(async (app: any) => {
          const profile = await getUserProfile(app.applicantId);
          return { ...app, applicantProfile: profile };
        })
      );

      setApplications(applicationsWithProfiles);
    } catch (error: any) {
      toast({
        title: "Error loading applications",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status);
      await fetchData(); // Refresh data
      
      toast({
        title: "Application status updated",
        description: `Application has been ${status}.`
      });
    } catch (error: any) {
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

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card className="bg-gray-900/50 border-gray-800 mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {application.applicantProfile?.profile?.firstName} {application.applicantProfile?.profile?.lastName}
              </h3>
              <p className="text-gray-400 text-sm">
                Applied {new Date(application.appliedAt?.toDate?.() || application.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {application.applicantProfile?.email && (
            <div className="flex items-center text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              {application.applicantProfile.email}
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
          {application.applicantProfile?.profile?.experience && (
            <div className="flex items-center text-gray-300">
              <Calendar className="h-4 w-4 mr-2" />
              {application.applicantProfile.profile.experience}
            </div>
          )}
        </div>

        {application.applicantProfile?.profile?.skills?.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {application.applicantProfile.profile.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {application.coverLetter && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Cover Letter:</p>
            <p className="text-gray-300 text-sm bg-gray-800 p-3 rounded">
              {application.coverLetter}
            </p>
          </div>
        )}

        {application.applicantProfile?.profile?.resumeUrl && (
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={() => window.open(application.applicantProfile.profile.resumeUrl, '_blank')}
              className="border-gray-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
          </div>
        )}

        <div className="flex space-x-2">
          {application.status === 'pending' && (
            <>
              <Button
                onClick={() => updateStatus(application.id, 'shortlisted')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Shortlist
              </Button>
              <Button
                onClick={() => updateStatus(application.id, 'rejected')}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {application.status === 'shortlisted' && (
            <Button
              onClick={() => updateStatus(application.id, 'rejected')}
              variant="destructive"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          )}
          {application.status === 'rejected' && (
            <Button
              onClick={() => updateStatus(application.id, 'pending')}
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
            Applications for {job?.title}
          </h1>
          <p className="text-gray-400 mt-2">{job?.company} • {job?.location}</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="pending" className="data-[state=active]:bg-gray-800">
              Pending ({getApplicationsByStatus('pending').length})
            </TabsTrigger>
            <TabsTrigger value="shortlisted" className="data-[state=active]:bg-gray-800">
              Shortlisted ({getApplicationsByStatus('shortlisted').length})
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
                  <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No shortlisted applications</p>
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
