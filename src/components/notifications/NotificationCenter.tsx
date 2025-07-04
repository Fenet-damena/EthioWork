
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, Briefcase, User, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserNotifications, markNotificationAsRead } from '@/services/notifications';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  userId: string;
  type: 'job_alert' | 'application_update' | 'profile_view' | 'rating';
  title: string;
  message: string;
  jobId?: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationCenter = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const userNotifications = await getUserNotifications(currentUser.uid);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  const markAsRead = async (notificationId: string) => {
    if (!currentUser) return;

    try {
      await markNotificationAsRead(currentUser.uid, notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_alert':
        return <Briefcase className="h-5 w-5 text-emerald-400" />;
      case 'application_update':
        return <User className="h-5 w-5 text-blue-400" />;
      case 'profile_view':
        return <Eye className="h-5 w-5 text-purple-400" />;
      case 'rating':
        return <Star className="h-5 w-5 text-yellow-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto mb-4"></div>
        <div className="text-gray-400">Loading notifications...</div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-emerald-400" />
            Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.isRead
                    ? 'bg-gray-800/50 border-gray-700'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No notifications yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
