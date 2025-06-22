
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
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        role,
        profile: profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err: any) {
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
    } catch (err: any) {
      setError(err.message);
      throw err;
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
