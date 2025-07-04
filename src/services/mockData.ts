
// Mock data service for development and testing
interface MockUser {
  id: string;
  userId: string;
  email: string;
  role: 'job_seeker' | 'employer' | 'admin';
  profile: any;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  banned?: boolean;
}

interface MockJob {
  id: string;
  title: string;
  description: string;
  employerId: string;
  status: string;
  applicationsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MockApplication {
  id: string;
  jobId: string;
  applicantId: string;
  status: string;
  appliedAt: Date;
  updatedAt: Date;
}

class MockDataService {
  private users: MockUser[] = [];
  private jobs: MockJob[] = [];
  private applications: MockApplication[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with some sample data
    this.jobs = [
      {
        id: '1',
        title: 'Software Developer',
        description: 'Full-stack developer position',
        employerId: 'employer1',
        status: 'active',
        applicationsCount: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'UX Designer',
        description: 'Design user experiences',
        employerId: 'employer2',
        status: 'active',
        applicationsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // User Profile Operations
  async createUserProfile(userId: string, data: any) {
    const user: MockUser = {
      id: this.generateId(),
      userId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    this.users.push(user);
    console.log('Mock: User profile created:', userId);
    return user;
  }

  async getUserProfile(userId: string) {
    const user = this.users.find(u => u.userId === userId);
    console.log('Mock: Retrieved user profile:', userId, user);
    return user || null;
  }

  async updateUserProfile(userId: string, data: any) {
    const userIndex = this.users.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data,
        updatedAt: new Date(),
      };
      console.log('Mock: User profile updated:', userId);
    } else {
      // Create if doesn't exist
      await this.createUserProfile(userId, data);
    }
  }

  // Job Operations
  async createJob(jobData: any) {
    const job: MockJob = {
      id: this.generateId(),
      ...jobData,
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobs.push(job);
    console.log('Mock: Job created:', job.id);
    return job.id;
  }

  async getAllJobs() {
    console.log('Mock: Retrieved all jobs:', this.jobs.length);
    return this.jobs.filter(job => job.status === 'active');
  }

  async getJobById(jobId: string) {
    const job = this.jobs.find(j => j.id === jobId);
    console.log('Mock: Retrieved job:', jobId, job);
    return job || null;
  }

  async getJobsByEmployer(employerId: string) {
    const jobs = this.jobs.filter(j => j.employerId === employerId);
    console.log('Mock: Retrieved employer jobs:', employerId, jobs.length);
    return jobs;
  }

  async updateJob(jobId: string, jobData: any) {
    const jobIndex = this.jobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      this.jobs[jobIndex] = {
        ...this.jobs[jobIndex],
        ...jobData,
        updatedAt: new Date(),
      };
      console.log('Mock: Job updated:', jobId);
    }
  }

  async deleteJob(jobId: string) {
    const jobIndex = this.jobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      this.jobs.splice(jobIndex, 1);
      console.log('Mock: Job deleted:', jobId);
    }
  }

  // Application Operations
  async applyToJob(applicationData: any) {
    const application: MockApplication = {
      id: this.generateId(),
      ...applicationData,
      status: 'pending',
      appliedAt: new Date(),
      updatedAt: new Date(),
    };
    this.applications.push(application);
    
    // Update job applications count
    const jobIndex = this.jobs.findIndex(j => j.id === applicationData.jobId);
    if (jobIndex !== -1) {
      this.jobs[jobIndex].applicationsCount++;
    }
    
    console.log('Mock: Application created:', application.id);
    return application.id;
  }

  async getApplicationsByJob(jobId: string) {
    const applications = this.applications.filter(a => a.jobId === jobId);
    console.log('Mock: Retrieved job applications:', jobId, applications.length);
    return applications;
  }

  async getApplicationsByUser(userId: string) {
    const applications = this.applications.filter(a => a.applicantId === userId);
    console.log('Mock: Retrieved user applications:', userId, applications.length);
    return applications;
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    const appIndex = this.applications.findIndex(a => a.id === applicationId);
    if (appIndex !== -1) {
      this.applications[appIndex].status = status;
      this.applications[appIndex].updatedAt = new Date();
      console.log('Mock: Application status updated:', applicationId, status);
    }
  }

  // Rating Operations
  async rateJobSeeker(jobSeekerId: string, rating: any) {
    const user = this.users.find(u => u.userId === jobSeekerId);
    if (user) {
      if (!user.profile) user.profile = {};
      if (!user.profile.ratings) user.profile.ratings = [];
      
      user.profile.ratings.push(rating);
      const totalRating = user.profile.ratings.reduce((sum: number, r: any) => sum + r.rating, 0);
      user.profile.rating = totalRating / user.profile.ratings.length;
      user.profile.ratingCount = user.profile.ratings.length;
      
      console.log('Mock: Rating added for user:', jobSeekerId);
      return user.profile.rating;
    }
    throw new Error('User not found');
  }

  async getUserRatings(userId: string) {
    const user = this.users.find(u => u.userId === userId);
    return user?.profile?.ratings || [];
  }

  // Admin Operations
  async getAllUsers() {
    console.log('Mock: Retrieved all users:', this.users.length);
    return this.users;
  }

  async banUser(userId: string) {
    const userIndex = this.users.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      this.users[userIndex].banned = true;
      this.users[userIndex].isActive = false;
      console.log('Mock: User banned:', userId);
    }
  }

  async unbanUser(userId: string) {
    const userIndex = this.users.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      this.users[userIndex].banned = false;
      this.users[userIndex].isActive = true;
      console.log('Mock: User unbanned:', userId);
    }
  }

  async deleteUser(userId: string) {
    const userIndex = this.users.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      console.log('Mock: User deleted:', userId);
    }
  }

  async getStatistics() {
    return {
      totalUsers: this.users.length,
      totalJobs: this.jobs.length,
      totalApplications: this.applications.length,
    };
  }
}

export const mockDataService = new MockDataService();
