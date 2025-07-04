
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { isJobSaved, getSavedJobs } from '@/services/savedJobs';

export const useSavedJobs = () => {
  const { currentUser } = useAuth();
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    if (!currentUser) {
      setSavedJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const jobs = await getSavedJobs(currentUser.uid);
      setSavedJobs(jobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [currentUser]);

  const checkIfJobSaved = async (jobId: string): Promise<boolean> => {
    if (!currentUser) return false;
    return await isJobSaved(currentUser.uid, jobId);
  };

  return {
    savedJobs,
    loading,
    refetch: fetchSavedJobs,
    checkIfJobSaved
  };
};
