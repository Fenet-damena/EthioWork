
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign,
  Briefcase,
  Filter
} from 'lucide-react';
import { getAllJobs } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';

const JobBrowsing = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs for job browsing...');
        const jobsData = await getAllJobs();
        console.log('Jobs fetched:', jobsData);
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((job: any) => {
      const matchesSearch = 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading jobs...</div>
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
              Browse Jobs
            </h1>
            <p className="text-gray-400 text-lg">Find your next opportunity</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setTypeFilter('');
                }}
                variant="outline"
                className="border-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">
            Showing {filteredJobs.length} jobs
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: any) => (
              <Card 
                key={job.id} 
                className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="border-emerald-500/20 text-emerald-400 bg-emerald-500/10"
                    >
                      {job.type}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {job.title}
                  </h3>

                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <Building2 className="h-4 w-4 mr-1" />
                    {job.company}
                  </div>

                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>

                  {job.description && (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                      {job.description}
                    </p>
                  )}

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          +{job.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {job.salaryMin && job.salaryMax && (
                      <div className="flex items-center text-emerald-400 text-sm">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salaryMin} - {job.salaryMax} {job.currency || 'ETB'}
                      </div>
                    )}
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-blue-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs/${job.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-2">
                {jobs.length === 0 ? 'No jobs available yet' : 'No jobs match your search'}
              </div>
              <p className="text-gray-500">
                {jobs.length === 0 
                  ? 'Check back later for new opportunities'
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

export default JobBrowsing;
