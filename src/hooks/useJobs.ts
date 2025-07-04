
import { useState, useEffect } from 'react';
import { 
  getAllJobs, 
  getJobById, 
  createJob, 
  updateJob, 
  deleteJob, 
  getJobsByEmployer 
} from '@/services/dataService';
import { useAuth } from '@/contexts/AuthContext';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await getAllJobs();
      setJobs(jobsData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createNewJob = async (jobData: any) => {
    try {
      const jobId = await createJob(jobData);
      await fetchJobs(); // Refresh jobs list
      return jobId;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateExistingJob = async (jobId: string, jobData: any) => {
    try {
      await updateJob(jobId, jobData);
      await fetchJobs(); // Refresh jobs list
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const removeJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      await fetchJobs(); // Refresh jobs list
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    jobs,
    loading,
    error,
    createJob: createNewJob,
    updateJob: updateExistingJob,
    deleteJob: removeJob,
    refreshJobs: fetchJobs
  };
};

export const useJob = (jobId: string) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(jobId);
        setJob(jobData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  return { job, loading, error };
};

export const useEmployerJobs = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const jobsData = await getJobsByEmployer(currentUser.uid);
        setJobs(jobsData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerJobs();
  }, [currentUser]);

  return { jobs, loading, error };
};
