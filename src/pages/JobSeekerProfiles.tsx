
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Search, MapPin, Star, Phone, Mail, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RatingDialog from '@/components/rating/RatingDialog';

const JobSeekerProfiles = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [jobSeekers, setJobSeekers] = useState<any[]>([]);
  const [filteredJobSeekers, setFilteredJobSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobSeekers.filter(seeker =>
        seeker.profile?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seeker.profile?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seeker.profile?.skills?.some((skill: string) => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        seeker.profile?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobSeekers(filtered);
    } else {
      setFilteredJobSeekers(jobSeekers);
    }
  }, [searchTerm, jobSeekers]);

  const fetchJobSeekers = async () => {
    try {
      console.log('Fetching job seeker profiles');
      const jobSeekersQuery = query(
        collection(db, 'users'),
        where('role', '==', 'job_seeker')
      );
      
      const querySnapshot = await getDocs(jobSeekersQuery);
      const seekers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('Found job seekers:', seekers.length);
      setJobSeekers(seekers);
      setFilteredJobSeekers(seekers);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeeker = (seeker: any) => {
    if (seeker.email) {
      window.open(`mailto:${seeker.email}`, '_blank');
    }
  };

  const handleViewResume = (resumeUrl: string) => {
    window.open(resumeUrl, '_blank');
  };

  const handleViewPortfolio = (portfolioUrl: string) => {
    window.open(portfolioUrl, '_blank');
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-900/50 border border-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Job Seeker Profiles
              </h1>
              <p className="text-gray-400 text-lg">Discover talented professionals</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, skills, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Job Seekers Grid */}
        {filteredJobSeekers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No job seekers found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobSeekers.map((seeker) => (
              <Card key={seeker.id} className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={seeker.profile?.profileImageUrl} />
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                        {seeker.profile?.firstName?.[0]}{seeker.profile?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <CardTitle className="text-white">
                        {seeker.profile?.firstName} {seeker.profile?.lastName}
                      </CardTitle>
                      {seeker.profile?.location && (
                        <p className="text-gray-400 flex items-center justify-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {seeker.profile.location}
                        </p>
                      )}
                    </div>

                    {/* Rating */}
                    {seeker.profile?.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {seeker.profile.rating.toFixed(1)} ({seeker.profile.ratingCount || 0})
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bio */}
                  {seeker.profile?.bio && (
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {seeker.profile.bio}
                    </p>
                  )}

                  {/* Skills */}
                  {seeker.profile?.skills && seeker.profile.skills.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-xs mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {seeker.profile.skills.slice(0, 3).map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                        {seeker.profile.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            +{seeker.profile.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {seeker.profile?.experience && (
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Experience:</p>
                      <p className="text-gray-300 text-sm">{seeker.profile.experience}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 pt-4">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleContactSeeker(seeker)}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                        size="sm"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      
                      {currentUser && currentUser.uid !== seeker.id && (
                        <RatingDialog
                          jobSeekerId={seeker.id}
                          jobSeekerName={`${seeker.profile?.firstName} ${seeker.profile?.lastName}`}
                          trigger={
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                              <Star className="h-3 w-3 mr-1" />
                              Rate
                            </Button>
                          }
                        />
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {seeker.profile?.resumeUrl && (
                        <Button
                          onClick={() => handleViewResume(seeker.profile.resumeUrl)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                      )}
                      
                      {seeker.profile?.portfolioUrl && (
                        <Button
                          onClick={() => handleViewPortfolio(seeker.profile.portfolioUrl)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Portfolio
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerProfiles;
