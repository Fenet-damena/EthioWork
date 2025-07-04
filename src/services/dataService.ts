
// Data service that abstracts the data layer
import { mockDataService } from './mockData';

// Use mock data service for now
// In production, you would switch this to use the actual API service
const dataService = mockDataService;

// User Profile Operations
export const createUserProfile = async (userId: string, data: any) => {
  return await dataService.createUserProfile(userId, data);
};

export const getUserProfile = async (userId: string) => {
  return await dataService.getUserProfile(userId);
};

export const updateUserProfile = async (userId: string, data: any) => {
  return await dataService.updateUserProfile(userId, data);
};

// Job Operations
export const createJob = async (jobData: any) => {
  return await dataService.createJob(jobData);
};

export const getAllJobs = async () => {
  return await dataService.getAllJobs();
};

export const getJobById = async (jobId: string) => {
  return await dataService.getJobById(jobId);
};

export const getJobsByEmployer = async (employerId: string) => {
  return await dataService.getJobsByEmployer(employerId);
};

export const updateJob = async (jobId: string, jobData: any) => {
  return await dataService.updateJob(jobId, jobData);
};

export const deleteJob = async (jobId: string) => {
  return await dataService.deleteJob(jobId);
};

// Application Operations
export const applyToJob = async (applicationData: any) => {
  return await dataService.applyToJob(applicationData);
};

export const getApplicationsByJob = async (jobId: string) => {
  return await dataService.getApplicationsByJob(jobId);
};

export const getApplicationsByUser = async (userId: string) => {
  return await dataService.getApplicationsByUser(userId);
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  return await dataService.updateApplicationStatus(applicationId, status);
};

// Rating Operations
export const rateJobSeeker = async (jobSeekerId: string, rating: any) => {
  return await dataService.rateJobSeeker(jobSeekerId, rating);
};

export const getUserRatings = async (userId: string) => {
  return await dataService.getUserRatings(userId);
};

// Admin Operations
export const getAllUsers = async () => {
  return await dataService.getAllUsers();
};

export const banUser = async (userId: string) => {
  return await dataService.banUser(userId);
};

export const unbanUser = async (userId: string) => {
  return await dataService.unbanUser(userId);
};

export const deleteUser = async (userId: string) => {
  return await dataService.deleteUser(userId);
};

export const getStatistics = async () => {
  return await dataService.getStatistics();
};
