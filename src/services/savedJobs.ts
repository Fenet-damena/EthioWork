
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getJobById } from './firebase';

export const saveJob = async (userId: string, jobId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedJobs: arrayUnion(jobId),
      updatedAt: new Date()
    });
    console.log('Job saved successfully');
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

export const unsaveJob = async (userId: string, jobId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedJobs: arrayRemove(jobId),
      updatedAt: new Date()
    });
    console.log('Job unsaved successfully');
  } catch (error) {
    console.error('Error unsaving job:', error);
    throw error;
  }
};

export const isJobSaved = async (userId: string, jobId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const savedJobs = userDoc.data().savedJobs || [];
      return savedJobs.includes(jobId);
    }
    return false;
  } catch (error) {
    console.error('Error checking if job is saved:', error);
    return false;
  }
};

export const getSavedJobs = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const savedJobIds = userDoc.data().savedJobs || [];
      const savedJobs = await Promise.all(
        savedJobIds.map(async (jobId: string) => {
          const job = await getJobById(jobId);
          return job;
        })
      );
      return savedJobs.filter(job => job !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    throw error;
  }
};
