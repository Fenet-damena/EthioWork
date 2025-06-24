
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  User, 
  Mail,
  Phone,
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';
import { getAllUsers } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';

const JobSeekerProfiles = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        console.log('Fetching job seekers...');
        const users = await getAllUsers();
        const seekers = users.filter((user: any) => user.role === 'job_seeker');
        console.log('Job seekers found:', seekers.length);
        setJobSeekers(seekers);
        setFilteredJobSeekers(seekers);
      } catch (error) {
        console.error('Error fetching job seekers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekers();
  }, []);

  useEffect(() => {
    let filtered = jobSeekers.filter((seeker: any) => {
      const profile = seeker.profile;
      const matchesSearch = 
        profile?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile?.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile?.skills?.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationFilter || profile?.location?.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesLocation;
    });

    setFilteredJobSeekers(filtered);
  }, [jobSeekers, searchTerm, locationFilter]);

  const handleContactSeeker = (seeker: any) => {
    if (seeker.email) {
      window.open(`mailto:${seeker.email}`, '_blank');
    }
  };

  const handleViewResume = (resumeUrl: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading job seekers...</div>
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
            <p className="text-gray-400 text-lg">Find and connect with talented professionals</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by name, skills, or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                }}
                variant="outline"
                className="border-gray-700"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">
            Showing {filteredJobSeekers.length} job seekers
          </div>
        </div>

        {/* Job Seekers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobSeekers.length > 0 ? (
            filteredJobSeekers.map((seeker: any) => (
              <Card 
                key={seeker.id} 
                className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center overflow-hidden">
                      {seeker.profile?.profileImageUrl ? (
                        <img 
                          src={seeker.profile.profileImageUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-white" />
                      )}
                    </div>
                    {seeker.profile?.experience && (
                      <Badge 
                        variant="outline" 
                        className="border-emerald-500/20 text-emerald-400 bg-emerald-500/10"
                      >
                        {seeker.profile.experience}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {seeker.profile?.firstName && seeker.profile?.lastName
                      ? `${seeker.profile.firstName} ${seeker.profile.lastName}`
                      : 'Job Seeker'
                    }
                  </h3>

                  {seeker.profile?.location && (
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {seeker.profile.location}
                    </div>
                  )}

                  {seeker.profile?.bio && (
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {seeker.profile.bio}
                    </p>
                  )}

                  {seeker.profile?.skills && seeker.profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {seeker.profile.skills.slice(0, 4).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                      {seeker.profile.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          +{seeker.profile.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Contact and Links Section */}
                  <div className="space-y-2 mb-4">
                    {seeker.email && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="truncate">{seeker.email}</span>
                      </div>
                    )}
                    
                    {seeker.profile?.phoneNumber && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        {seeker.profile.phoneNumber}
                      </div>
                    )}

                    {/* Professional Links */}
                    <div className="flex space-x-2 mt-2">
                      {seeker.profile?.links?.linkedin && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 p-1"
                          onClick={() => window.open(seeker.profile.links.linkedin, '_blank')}
                        >
                          <Linkedin className="h-3 w-3" />
                        </Button>
                      )}
                      {seeker.profile?.links?.github && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 p-1"
                          onClick={() => window.open(seeker.profile.links.github, '_blank')}
                        >
                          <Github className="h-3 w-3" />
                        </Button>
                      )}
                      {seeker.profile?.links?.portfolio && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 p-1"
                          onClick={() => window.open(seeker.profile.links.portfolio, '_blank')}
                        >
                          <Globe className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-sm"
                      onClick={() => handleContactSeeker(seeker)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    
                    {seeker.profile?.resumeUrl && (
                      <Button 
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => handleViewResume(seeker.profile.resumeUrl)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-2">
                {jobSeekers.length === 0 ? 'No job seekers found' : 'No job seekers match your search'}
              </div>
              <p className="text-gray-500">
                {jobSeekers.length === 0 
                  ? 'Check back later for new profiles'
                  : 'Try adjusting your search criteria'
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
