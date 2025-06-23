
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  User, 
  MapPin, 
  Mail, 
  Phone,
  Briefcase,
  Star
} from 'lucide-react';
import { getAllUsers } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';

const JobSeekerProfiles = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const users = await getAllUsers();
        const jobSeekers = users.filter((user: any) => user.role === 'job_seeker');
        setProfiles(jobSeekers);
        setFilteredProfiles(jobSeekers);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const filtered = profiles.filter((profile: any) => {
      const fullName = `${profile.profile?.firstName || ''} ${profile.profile?.lastName || ''}`.toLowerCase();
      const skills = profile.profile?.skills?.join(' ').toLowerCase() || '';
      const location = profile.profile?.location?.toLowerCase() || '';
      
      return fullName.includes(searchTerm.toLowerCase()) ||
             skills.includes(searchTerm.toLowerCase()) ||
             location.includes(searchTerm.toLowerCase());
    });
    
    setFilteredProfiles(filtered);
  }, [profiles, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading profiles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Job Seeker Profiles
            </h1>
            <p className="text-gray-400 text-lg">Find talented candidates for your company</p>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">
            Showing {filteredProfiles.length} profiles
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile: any) => (
              <Card 
                key={profile.id} 
                className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {profile.profile?.firstName || 'Anonymous'} {profile.profile?.lastName || 'User'}
                    </h3>
                    {profile.profile?.location && (
                      <div className="flex items-center justify-center text-gray-400 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.profile.location}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  {profile.profile?.bio && (
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {profile.profile.bio}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  {profile.profile?.skills && profile.profile.skills.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.profile.skills.slice(0, 4).map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                        {profile.profile.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            +{profile.profile.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {profile.email && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        {profile.email}
                      </div>
                    )}
                    {profile.profile?.phoneNumber && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        {profile.profile.phoneNumber}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-gray-700"
                    >
                      View Full Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500"
                    >
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-2">
                {profiles.length ===0 ? 'No job seekers registered yet' : 'No profiles match your search'}
              </div>
              <p className="text-gray-500">
                {profiles.length === 0 
                  ? 'Check back later for new candidates'
                  : 'Try adjusting your search terms'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfiles;
