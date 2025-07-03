
import { rateJobSeeker as mongoRateJobSeeker, getUserRatings as mongoGetUserRatings } from './mongodb';

export interface Rating {
  id: string;
  raterId: string;
  raterName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export const rateJobSeeker = async (jobSeekerId: string, rating: Rating) => {
  return await mongoRateJobSeeker(jobSeekerId, rating);
};

export const getUserRatings = async (userId: string) => {
  return await mongoGetUserRatings(userId);
};
