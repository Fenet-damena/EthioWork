
import { useState, useEffect } from 'react';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserRole } from '@/types/user';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, role: UserRole, profileData: any) => {
    setLoading(true);
    setError(null);
    console.log('Starting registration for:', email, 'with role:', role);
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', user.uid);
      
      // Create user profile in Firestore
      const userDoc = {
        email,
        role,
        profile: profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      console.log('Creating user document:', userDoc);
      await setDoc(doc(db, 'users', user.uid), userDoc);
      console.log('User profile created successfully');
      
      return user;
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = err.message;
      
      // Provide user-friendly error messages
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try signing in.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    console.log('Starting login for:', email);
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful for user:', user.uid);
      return user;
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = err.message;
      
      // Provide user-friendly error messages
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please check your email or create a new account.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log('Logout successful');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
    } catch (err: any) {
      console.error('Password reset error:', err);
      let errorMessage = err.message;
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, login, logout, resetPassword, loading, error };
};

export const useUserProfile = (userId: string | null) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for user:', userId);
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Profile fetch timeout')), 10000);
        });

        const profilePromise = getDoc(doc(db, 'users', userId));
        
        const userDoc = await Promise.race([profilePromise, timeoutPromise]) as any;
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('Profile found:', userData);
          setProfile(userData);
        } else {
          console.log('No profile found, creating default profile');
          // Create a default profile for the user
          const defaultProfile = {
            role: 'job_seeker',
            profile: {
              firstName: '',
              lastName: '',
              bio: '',
              skills: [],
              location: '',
              phoneNumber: ''
            },
            email: auth.currentUser?.email,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          await setDoc(doc(db, 'users', userId), defaultProfile);
          setProfile(defaultProfile);
        }
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        // Create fallback profile immediately to prevent infinite loading
        const fallbackProfile = {
          role: 'job_seeker',
          profile: {
            firstName: '',
            lastName: '',
            bio: '',
            skills: [],
            location: '',
            phoneNumber: ''
          },
          email: auth.currentUser?.email || 'user@example.com'
        };
        setProfile(fallbackProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading };
};
