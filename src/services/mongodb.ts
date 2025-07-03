
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// User Profile Operations
export const createUserProfile = async (userId: string, data: any) => {
  try {
    const { db } = await connectToDatabase();
    const userDoc = {
      _id: userId,
      ...data,
      uid: userId,
      updatedAt: new Date(),
      isActive: true,
    };
    
    await db.collection('users').insertOne(userDoc);
    console.log('User profile created:', userId);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    return user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          ...data, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
    console.log('User profile updated:', userId);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Job Operations
export const createJob = async (jobData: any) => {
  try {
    const { db } = await connectToDatabase();
    const jobDoc = {
      ...jobData,
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('jobs').insertOne(jobDoc);
    console.log('Job created with ID:', result.insertedId);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection('jobs')
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .toArray();
    
    return jobs.map(job => ({
      ...job,
      id: job._id.toString(),
      _id: undefined
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const { db } = await connectToDatabase();
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) });
    
    if (job) {
      return {
        ...job,
        id: job._id.toString(),
        _id: undefined
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

// Rating Operations
export const rateJobSeeker = async (jobSeekerId: string, rating: any) => {
  try {
    const { db } = await connectToDatabase();
    
    // Get current user profile
    const user = await db.collection('users').findOne({ _id: jobSeekerId });
    if (!user) {
      throw new Error('User not found');
    }
    
    const currentProfile = user.profile || {};
    const currentRatings = currentProfile.ratings || [];
    
    // Check if user already rated
    const existingRating = currentRatings.find((r: any) => r.raterId === rating.raterId);
    if (existingRating) {
      throw new Error('You have already rated this job seeker');
    }
    
    // Add new rating
    const newRatings = [...currentRatings, rating];
    
    // Calculate new average rating
    const totalRating = newRatings.reduce((sum: number, r: any) => sum + r.rating, 0);
    const newAverageRating = totalRating / newRatings.length;
    
    // Update user profile
    const updatedProfile = {
      ...currentProfile,
      ratings: newRatings,
      rating: newAverageRating,
      ratingCount: newRatings.length
    };
    
    await db.collection('users').updateOne(
      { _id: jobSeekerId },
      { 
        $set: { 
          profile: updatedProfile,
          updatedAt: new Date() 
        } 
      }
    );
    
    console.log('Rating added successfully');
    return newAverageRating;
  } catch (error) {
    console.error('Error rating job seeker:', error);
    throw error;
  }
};

export const getUserRatings = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    return user?.profile?.ratings || [];
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};

// Application Operations
export const applyToJob = async (applicationData: any) => {
  try {
    const { db } = await connectToDatabase();
    const applicationDoc = {
      ...applicationData,
      status: 'pending',
      appliedAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('applications').insertOne(applicationDoc);
    
    // Update job applications count
    await db.collection('jobs').updateOne(
      { _id: new ObjectId(applicationData.jobId) },
      { 
        $inc: { applicationsCount: 1 },
        $set: { updatedAt: new Date() }
      }
    );
    
    console.log('Application created with ID:', result.insertedId);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const getApplicationsByJob = async (jobId: string) => {
  try {
    const { db } = await connectToDatabase();
    const applications = await db.collection('applications')
      .find({ jobId })
      .toArray();
    
    return applications.map(app => ({
      ...app,
      id: app._id.toString(),
      _id: undefined
    }));
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

export const getApplicationsByUser = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    const applications = await db.collection('applications')
      .find({ applicantId: userId })
      .toArray();
    
    return applications.map(app => ({
      ...app,
      id: app._id.toString(),
      _id: undefined
    }));
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
};

// Admin Operations
export const getAllUsers = async () => {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();
    
    return users.map(user => ({
      ...user,
      id: user._id.toString(),
      _id: undefined
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const banUser = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          banned: true,
          isActive: false,
          updatedAt: new Date()
        } 
      }
    );
    console.log('User banned successfully');
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};

export const unbanUser = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          banned: false,
          isActive: true,
          updatedAt: new Date()
        } 
      }
    );
    console.log('User unbanned successfully');
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { db } = await connectToDatabase();
    await db.collection('users').deleteOne({ _id: userId });
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
