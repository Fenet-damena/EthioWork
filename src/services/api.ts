
// API service for handling HTTP requests to backend
class ApiService {
  private baseUrl: string;

  constructor() {
    // Use environment variable for API URL, fallback to current origin
    this.baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // User Profile Operations
  async createUserProfile(userId: string, data: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify({ userId, ...data }),
    });
  }

  async getUserProfile(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async updateUserProfile(userId: string, data: any) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Job Operations
  async createJob(jobData: any) {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async getAllJobs() {
    return this.request('/jobs');
  }

  async getJobById(jobId: string) {
    return this.request(`/jobs/${jobId}`);
  }

  async getJobsByEmployer(employerId: string) {
    return this.request(`/jobs/employer/${employerId}`);
  }

  async updateJob(jobId: string, jobData: any) {
    return this.request(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(jobId: string) {
    return this.request(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  // Application Operations
  async applyToJob(applicationData: any) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getApplicationsByJob(jobId: string) {
    return this.request(`/applications/job/${jobId}`);
  }

  async getApplicationsByUser(userId: string) {
    return this.request(`/applications/user/${userId}`);
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    return this.request(`/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Rating Operations
  async rateJobSeeker(jobSeekerId: string, rating: any) {
    return this.request(`/users/${jobSeekerId}/ratings`, {
      method: 'POST',
      body: JSON.stringify(rating),
    });
  }

  async getUserRatings(userId: string) {
    return this.request(`/users/${userId}/ratings`);
  }

  // Admin Operations
  async getAllUsers() {
    return this.request('/admin/users');
  }

  async banUser(userId: string) {
    return this.request(`/admin/users/${userId}/ban`, {
      method: 'POST',
    });
  }

  async unbanUser(userId: string) {
    return this.request(`/admin/users/${userId}/unban`, {
      method: 'POST',
    });
  }

  async deleteUser(userId: string) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getStatistics() {
    return this.request('/admin/statistics');
  }
}

export const apiService = new ApiService();
