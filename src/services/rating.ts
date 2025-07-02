
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Rating {
  id: string;
  raterId: string;
  raterName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export const rateJobSeeker = async (jobSeekerId: string, rating: Rating) => {
  try {
    console.log('Rating job seeker:', jobSeekerId, 'with rating:', rating);
    
    // Get current profile
    const userDoc = await getDoc(doc(db, 'users', jobSeekerId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userDoc.data();
    const currentRatings = userData.profile?.ratings || [];
    const currentRating = userData.profile?.rating || 0;
    const currentCount = userData.profile?.ratingCount || 0;
    
    // Check if user already rated
    const existingRating = currentRatings.find((r: Rating) => r.raterId === rating.raterId);
    if (existingRating) {
      throw new Error('You have already rated this job seeker');
    }
    
    // Add new rating
    const newRatings = [...currentRatings, rating];
    
    // Calculate new average rating
    const totalRating = newRatings.reduce((sum, r) => sum + r.rating, 0);
    const newAverageRating = totalRating / newRatings.length;
    
    // Update user profile
    await updateDoc(doc(db, 'users', jobSeekerId), {
      'profile.ratings': newRatings,
      'profile.rating': newAverageRating,
      'profile.ratingCount': newRatings.length,
      updatedAt: new Date()
    });
    
    console.log('Rating added successfully');
    return newAverageRating;
  } catch (error) {
    console.error('Error rating job seeker:', error);
    throw error;
  }
};

export const getUserRatings = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().profile?.ratings || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};
