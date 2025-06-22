
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
  await updateDoc(doc(db, 'users', userId), {
    ...data,
    updatedAt: new Date()
  });
};

export const getUserProfile = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserProfile = async (userId: string, data: any) => {
  await updateDoc(doc(db, 'users', userId), {
    ...data,
    updatedAt: new Date()
  });
};

// Job Operations
export const createJob = async (jobData: any) => {
  const jobRef = await addDoc(collection(db, 'jobs'), {
    ...jobData,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return jobRef.id;
};

export const getAllJobs = async () => {
  const jobsQuery = query(
    collection(db, 'jobs'), 
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(jobsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getJobById = async (jobId: string) => {
  const jobDoc = await getDoc(doc(db, 'jobs', jobId));
  return jobDoc.exists() ? { id: jobDoc.id, ...jobDoc.data() } : null;
};

export const updateJob = async (jobId: string, data: any) => {
  await updateDoc(doc(db, 'jobs', jobId), {
    ...data,
    updatedAt: new Date()
  });
};

export const deleteJob = async (jobId: string) => {
  await deleteDoc(doc(db, 'jobs', jobId));
};

export const getJobsByEmployer = async (employerId: string) => {
  const jobsQuery = query(
    collection(db, 'jobs'), 
    where('employerId', '==', employerId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(jobsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Application Operations
export const applyToJob = async (applicationData: any) => {
  const applicationRef = await addDoc(collection(db, 'applications'), {
    ...applicationData,
    status: 'pending',
    appliedAt: new Date()
  });
  return applicationRef.id;
};

export const getApplicationsByJob = async (jobId: string) => {
  const applicationsQuery = query(
    collection(db, 'applications'),
    where('jobId', '==', jobId),
    orderBy('appliedAt', 'desc')
  );
  const querySnapshot = await getDocs(applicationsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getApplicationsByUser = async (userId: string) => {
  const applicationsQuery = query(
    collection(db, 'applications'),
    where('applicantId', '==', userId),
    orderBy('appliedAt', 'desc')
  );
  const querySnapshot = await getDocs(applicationsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  await updateDoc(doc(db, 'applications', applicationId), {
    status,
    updatedAt: new Date()
  });
};

// File Upload Operations
export const uploadFile = async (file: File, path: string) => {
  const fileRef = ref(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const deleteFile = async (path: string) => {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
};

// Bookmark Operations
export const addBookmark = async (userId: string, jobId: string) => {
  await updateDoc(doc(db, 'users', userId), {
    bookmarks: arrayUnion(jobId)
  });
};

export const removeBookmark = async (userId: string, jobId: string) => {
  await updateDoc(doc(db, 'users', userId), {
    bookmarks: arrayRemove(jobId)
  });
};

export const getBookmarkedJobs = async (jobIds: string[]) => {
  if (jobIds.length === 0) return [];
  
  const jobs = await Promise.all(
    jobIds.map(jobId => getJobById(jobId))
  );
  return jobs.filter(job => job !== null);
};

// Admin Operations
export const getAllUsers = async () => {
  const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const banUser = async (userId: string) => {
  await updateDoc(doc(db, 'users', userId), {
    banned: true,
    updatedAt: new Date()
  });
};

export const unbanUser = async (userId: string) => {
  await updateDoc(doc(db, 'users', userId), {
    banned: false,
    updatedAt: new Date()
  });
};

export const deleteUser = async (userId: string) => {
  await deleteDoc(doc(db, 'users', userId));
};

// Statistics
export const getStatistics = async () => {
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
};
