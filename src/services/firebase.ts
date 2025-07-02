import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { UserRole, Job, JobApplication } from '@/types/user';

// User Profile Operations
export const createUserProfile = async (userId: string, data: any) => {
  const userDoc = {
    ...data,
    uid: userId,
    updatedAt: new Date(),
    isActive: true,
  };
  await updateDoc(doc(db, 'users', userId), userDoc);
};

export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Admin User Management Operations
export const getAllUsers = async () => {
  try {
    console.log('Fetching all users for admin');
    const usersQuery = query(collection(db, 'users'));
    const querySnapshot = await getDocs(usersQuery);
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Found users:', users.length);
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const banUser = async (userId: string) => {
  try {
    console.log('Banning user:', userId);
    await updateDoc(doc(db, 'users', userId), {
      banned: true,
      isActive: false,
      updatedAt: new Date()
    });
    console.log('User banned successfully');
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};

export const unbanUser = async (userId: string) => {
  try {
    console.log('Unbanning user:', userId);
    await updateDoc(doc(db, 'users', userId), {
      banned: false,
      isActive: true,
      updatedAt: new Date()
    });
    console.log('User unbanned successfully');
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    console.log('Deleting user:', userId);
    await deleteDoc(doc(db, 'users', userId));
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Job Operations
export const createJob = async (jobData: any) => {
  try {
    console.log('Creating job with data:', jobData);
    const jobDoc = {
      ...jobData,
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const jobRef = await addDoc(collection(db, 'jobs'), jobDoc);
    console.log('Job created with ID:', jobRef.id);
    
    // Import and call notification service
    const { notifyJobSeekers } = await import('./notifications');
    await notifyJobSeekers({ ...jobDoc, id: jobRef.id });
    
    return jobRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    console.log('Fetching all active jobs');
    const jobsQuery = query(
      collection(db, 'jobs'), 
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(jobsQuery);
    const jobs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Found jobs:', jobs.length);
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

export const updateJob = async (jobId: string, data: any) => {
  try {
    await updateDoc(doc(db, 'jobs', jobId), {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    await deleteDoc(doc(db, 'jobs', jobId));
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const getJobsByEmployer = async (employerId: string) => {
  try {
    console.log('Fetching jobs for employer:', employerId);
    const jobsQuery = query(
      collection(db, 'jobs'), 
      where('employerId', '==', employerId)
    );
    const querySnapshot = await getDocs(jobsQuery);
    const jobs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Found employer jobs:', jobs.length);
    return jobs;
  } catch (error) {
    console.error('Error fetching employer jobs:', error);
    throw error;
  }
};

// Application Operations
export const applyToJob = async (applicationData: any) => {
  try {
    console.log('Creating application:', applicationData);
    const applicationDoc = {
      ...applicationData,
      status: 'pending',
      appliedAt: new Date(),
      updatedAt: new Date()
    };
    
    const applicationRef = await addDoc(collection(db, 'applications'), applicationDoc);
    
    // Update job applications count
    const jobRef = doc(db, 'jobs', applicationData.jobId);
    const jobDoc = await getDoc(jobRef);
    if (jobDoc.exists()) {
      const currentCount = jobDoc.data().applicationsCount || 0;
      await updateDoc(jobRef, {
        applicationsCount: currentCount + 1,
        updatedAt: new Date()
      });
    }
    
    console.log('Application created with ID:', applicationRef.id);
    return applicationRef.id;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const getApplicationsByJob = async (jobId: string) => {
  try {
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('jobId', '==', jobId)
    );
    const querySnapshot = await getDocs(applicationsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

export const getApplicationsByUser = async (userId: string) => {
  try {
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('applicantId', '==', userId)
    );
    const querySnapshot = await getDocs(applicationsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  try {
    await updateDoc(doc(db, 'applications', applicationId), {
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// File Upload Operations
export const uploadFile = async (file: File, path: string) => {
  try {
    console.log('Uploading file:', file.name, 'to path:', path);
    
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size must be less than 10MB');
    }

    const fileRef = ref(storage, path);
    console.log('Created file reference:', path);
    
    const snapshot = await uploadBytes(fileRef, file);
    console.log('File uploaded, getting download URL...');
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
  }
};

export const deleteFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Bookmark Operations
export const addBookmark = async (userId: string, jobId: string) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      bookmarks: arrayUnion(jobId),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

export const removeBookmark = async (userId: string, jobId: string) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      bookmarks: arrayRemove(jobId),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

export const getBookmarkedJobs = async (jobIds: string[]) => {
  if (jobIds.length === 0) return [];
  
  try {
    const jobs = await Promise.all(
      jobIds.map(jobId => getJobById(jobId))
    );
    return jobs.filter(job => job !== null);
  } catch (error) {
    console.error('Error fetching bookmarked jobs:', error);
    throw error;
  }
};

// Statistics
export const getStatistics = async () => {
  try {
    const [usersSnapshot, jobsSnapshot, applicationsSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'jobs')),
      getDocs(collection(db, 'applications'))
    ]);

    return {
      totalUsers: usersSnapshot.size,
      totalJobs: jobsSnapshot.size,
      totalApplications: applicationsSnapshot.size
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
