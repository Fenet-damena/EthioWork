
import { useState, useEffect } from 'react';
import { 
  applyToJob, 
  getApplicationsByJob, 
  getApplicationsByUser, 
  updateApplicationStatus 
} from '@/services/dataService';
import { useAuth } from '@/contexts/AuthContext';

export const useApplications = (jobId?: string) => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      let applicationsData;
      
      if (jobId) {
        // For employers - get applications for a specific job
        applicationsData = await getApplicationsByJob(jobId);
      } else {
        // For job seekers - get their applications
        applicationsData = await getApplicationsByUser(currentUser.uid);
      }
      
      setApplications(applicationsData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentUser, jobId]);

  const submitApplication = async (applicationData: any) => {
    try {
      const applicationId = await applyToJob(applicationData);
      await fetchApplications(); // Refresh applications
      return applicationId;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateStatus = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status);
      await fetchApplications(); // Refresh applications
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    submitApplication,
    updateStatus,
    refreshApplications: fetchApplications
  };
};
