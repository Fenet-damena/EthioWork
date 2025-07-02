
import { doc, updateDoc, getDoc, arrayUnion, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Notification {
  id: string;
  userId: string;
  type: 'job_alert' | 'application_update' | 'profile_view' | 'rating';
  title: string;
  message: string;
  jobId?: string;
  isRead: boolean;
  createdAt: Date;
}

export const createNotification = async (notification: Omit<Notification, 'id'>) => {
  try {
    const notificationWithId = {
      ...notification,
      id: Date.now().toString(),
    };

    const userRef = doc(db, 'users', notification.userId);
    await updateDoc(userRef, {
      notifications: arrayUnion(notificationWithId),
      updatedAt: new Date()
    });

    console.log('Notification created:', notificationWithId);
    return notificationWithId.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const notifications = userDoc.data().notifications || [];
      return notifications.sort((a: Notification, b: Notification) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const notifications = userDoc.data().notifications || [];
      const updatedNotifications = notifications.map((notif: Notification) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      );

      await updateDoc(doc(db, 'users', userId), {
        notifications: updatedNotifications,
        updatedAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const notifyJobSeekers = async (jobData: any) => {
  try {
    console.log('Notifying job seekers about new job:', jobData.title);
    
    // Get all job seekers
    const usersQuery = query(
      collection(db, 'users'),
      where('role', '==', 'job_seeker')
    );
    const querySnapshot = await getDocs(usersQuery);
    
    const notifications = querySnapshot.docs.map(userDoc => {
      const userData = userDoc.data();
      return createNotification({
        userId: userData.uid,
        type: 'job_alert',
        title: 'New Job Posted!',
        message: `A new job "${jobData.title}" has been posted that might interest you.`,
        jobId: jobData.id,
        isRead: false,
        createdAt: new Date()
      });
    });

    await Promise.all(notifications);
    console.log('Job seekers notified successfully');
  } catch (error) {
    console.error('Error notifying job seekers:', error);
  }
};
