
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getJobById } from '@/services/firebase';

export const saveJob = async (userId: string, jobId: string) => {
  try {
    console.log('Saving job:', jobId, 'for user:', userId);
    
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
    console.log('Unsaving job:', jobId, 'for user:', userId);
    
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

export const getSavedJobs = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const savedJobIds = userDoc.data().savedJobs || [];
      
      if (savedJobIds.length === 0) return [];
      
      // Fetch all saved jobs
      const savedJobs = await Promise.all(
        savedJobIds.map(async (jobId: string) => {
          try {
            return await getJobById(jobId);
          } catch (error) {
            console.error('Error fetching saved job:', jobId, error);
            return null;
          }
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

export const isJobSaved = async (userId: string, jobId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const savedJobIds = userDoc.data().savedJobs || [];
      return savedJobIds.includes(jobId);
    }
    return false;
  } catch (error) {
    console.error('Error checking if job is saved:', error);
    return false;
  }
};
