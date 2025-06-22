
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Briefcase, Clock, Building2, Filter, Bookmark, Heart } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';

const JobBrowsing = () => {
  const navigate = useNavigate();
  const { jobs, loading } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    let filtered = jobs.filter((job: any) => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.skills && job.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
      const matchesJobType = !jobType || job.type === jobType;
      const matchesWorkMode = !workMode || job.workMode === workMode;
      
      // Simple salary range filter (you can make this more sophisticated)
      const matchesSalary = !salaryRange || true; // Implement based on your salary structure
      
      // Date filter - you can implement based on createdAt
      const matchesDate = !datePosted || true;

      return matchesSearch && matchesLocation && matchesJobType && matchesWorkMode && matchesSalary && matchesDate;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, location, jobType, workMode, salaryRange, datePosted]);

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Browse Jobs in Ethiopia
          </h1>
          <p className="text-gray-400 text-lg">Discover your next career opportunity</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs, skills, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500">
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={jobType} onValueChange={setJobType}>
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

              <Select value={workMode} onValueChange={setWorkMode}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Work Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Modes</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={salaryRange} onValueChange={setSalaryRange}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Ranges</SelectItem>
                  <SelectItem value="0-50k">0 - 50k ETB</SelectItem>
                  <SelectItem value="50k-100k">50k - 100k ETB</SelectItem>
                  <SelectItem value="100k+">100k+ ETB</SelectItem>
                </SelectContent>
              </Select>

              <Select value={datePosted} onValueChange={setDatePosted}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Date Posted" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-400">
            Showing {filteredJobs.length} jobs
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job: any) => (
            <Card 
              key={job.id} 
              className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
              onClick={() => handleJobClick(job.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                      🏢
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm mb-2">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(job.createdAt?.toDate?.() || job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                          {job.workMode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-emerald-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-red-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {job.description?.substring(0, 150)}...
                </p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 5).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{job.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    {job.salaryMin && job.salaryMax 
                      ? `${job.salaryMin} - ${job.salaryMax} ${job.currency}`
                      : 'Competitive Salary'
                    }
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job.id);
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job.id);
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No jobs found matching your criteria</div>
            <Button 
              variant="outline" 
              className="mt-4 border-gray-700"
              onClick={() => {
                setSearchTerm('');
                setLocation('');
                setJobType('');
                setWorkMode('');
                setSalaryRange('');
                setDatePosted('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700">Previous</Button>
              <Button className="bg-emerald-500">1</Button>
              <Button variant="outline" className="border-gray-700">2</Button>
              <Button variant="outline" className="border-gray-700">3</Button>
              <Button variant="outline" className="border-gray-700">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBrowsing;
