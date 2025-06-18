
export type UserRole = 'job_seeker' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: JobSeekerProfile | EmployerProfile | AdminProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeekerProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  skills: string[];
  location: string;
  profilePicture?: string;
  resume?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface EmployerProfile {
  companyName: string;
  companyLogo?: string;
  website?: string;
  industry: string;
  description: string;
  numberOfEmployees: string;
  location: string;
}

export interface AdminProfile {
  firstName: string;
  lastName: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  workMode: 'remote' | 'on-site' | 'hybrid';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  employerId: string;
  status: 'active' | 'paused' | 'closed';
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
}
