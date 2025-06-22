
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Shield, 
  Ban, 
  Trash2,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Building2
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

const AdminDashboard = () => {
  const { 
    users, 
    jobs, 
    statistics, 
    loading, 
    banUser, 
    unbanUser, 
    deleteUser 
  } = useAdmin();

  const handleBanUser = async (userId: string) => {
    try {
      await banUser(userId);
    } catch (error) {
      console.error('Failed to ban user:', error);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      await unbanUser(userId);
    } catch (error) {
      console.error('Failed to unban user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Manage users, jobs, and platform settings</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-blue-500">
            <Shield className="h-4 w-4 mr-2" />
            Admin Panel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{statistics.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Jobs</p>
                  <p className="text-2xl font-bold text-blue-400">{statistics.totalJobs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Applications</p>
                  <p className="text-2xl font-bold text-purple-400">{statistics.totalApplications}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Today</p>
                  <p className="text-2xl font-bold text-green-400">
                    {users.filter((user: any) => {
                      const lastActive = new Date(user.updatedAt?.toDate?.() || user.updatedAt);
                      const today = new Date();
                      return lastActive.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Management */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-emerald-400" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {users.slice(0, 10).map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                        {user.role === 'employer' ? <Building2 className="h-4 w-4 text-white" /> : <UserCheck className="h-4 w-4 text-white" />}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {user.profile?.firstName && user.profile?.lastName 
                            ? `${user.profile.firstName} ${user.profile.lastName}`
                            : user.profile?.companyName || user.email}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              user.role === 'admin' ? 'border-red-500/30 text-red-400' :
                              user.role === 'employer' ? 'border-blue-500/30 text-blue-400' :
                              'border-green-500/30 text-green-400'
                            }
                          >
                            {user.role}
                          </Badge>
                          {user.banned && (
                            <Badge variant="destructive" className="bg-red-500/20 text-red-400">
                              Banned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {user.banned ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/30 text-green-400"
                          onClick={() => handleUnbanUser(user.id)}
                        >
                          Unban
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-500/30 text-yellow-400"
                          onClick={() => handleBanUser(user.id)}
                        >
                          <Ban className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Management */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-emerald-400" />
                Job Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {jobs.slice(0, 10).map((job: any) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{job.title}</p>
                      <p className="text-gray-400 text-xs">{job.company} • {job.location}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={job.status === 'active' ? 'default' : 'secondary'}
                          className={
                            job.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }
                        >
                          {job.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400"
                      >
                        <AlertTriangle className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Admin Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="border-gray-700 justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="font-medium">Manage Users</span>
                  </div>
                  <p className="text-sm text-gray-400">View and moderate user accounts</p>
                </div>
              </Button>
              
              <Button variant="outline" className="border-gray-700 justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Briefcase className="h-5 w-5 mr-2 text-green-400" />
                    <span className="font-medium">Review Jobs</span>
                  </div>
                  <p className="text-sm text-gray-400">Moderate job postings</p>
                </div>
              </Button>
              
              <Button variant="outline" className="border-gray-700 justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="font-medium">Reported Content</span>
                  </div>
                  <p className="text-sm text-gray-400">Handle user reports</p>
                </div>
              </Button>
              
              <Button variant="outline" className="border-gray-700 justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                    <span className="font-medium">Analytics</span>
                  </div>
                  <p className="text-sm text-gray-400">View platform statistics</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
