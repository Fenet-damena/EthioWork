
import { rateJobSeeker as dataRateJobSeeker, getUserRatings as dataGetUserRatings } from './dataService';

export interface Rating {
  id: string;
  raterId: string;
  raterName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export const rateJobSeeker = async (jobSeekerId: string, rating: Rating) => {
  return await dataRateJobSeeker(jobSeekerId, rating);
};

export const getUserRatings = async (userId: string) => {
  return await dataGetUserRatings(userId);
};
