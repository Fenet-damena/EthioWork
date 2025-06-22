
import { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  banUser, 
  unbanUser, 
  deleteUser, 
  getAllJobs,
  getStatistics 
} from '@/services/firebase';

export const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [statistics, setStatistics] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchJobs = async () => {
    try {
      const jobsData = await getAllJobs();
      setJobs(jobsData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await getStatistics();
      setStatistics(stats);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUsers(),
        fetchJobs(),
        fetchStatistics()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const handleBanUser = async (userId: string) => {
    try {
      await banUser(userId);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      await unbanUser(userId);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
      await fetchStatistics();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    users,
    jobs,
    statistics,
    loading,
    error,
    banUser: handleBanUser,
    unbanUser: handleUnbanUser,
    deleteUser: handleDeleteUser,
    refreshData: () => {
      fetchUsers();
      fetchJobs();
      fetchStatistics();
    }
  };
};
