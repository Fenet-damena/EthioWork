
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
export type WorkMode = 'remote' | 'onsite' | 'hybrid';
export type ApplicationStatus = 'pending' | 'shortlisted' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  tags: string[];
  postedDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  employerId: string;
  applicationsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  resumeUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedDate: Date;
  updatedDate: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  description: string;
  employeeCount: string;
  location: string;
  ownerId: string;
}
