
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Briefcase, Clock, Building2, Filter, Bookmark, Heart } from 'lucide-react';

const JobBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [datePosted, setDatePosted] = useState('');

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Software Developer",
      company: "TechCorp Ethiopia",
      location: "Addis Ababa, Ethiopia",
      jobType: "Full-time",
      workMode: "Hybrid",
      salary: "80,000 - 120,000 ETB",
      description: "We are looking for an experienced software developer to join our growing team...",
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      postedDate: "2 days ago",
      logo: "🏢"
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Growth Solutions",
      location: "Dire Dawa, Ethiopia",
      jobType: "Full-time",
      workMode: "Onsite",
      salary: "60,000 - 90,000 ETB",
      description: "Lead our marketing efforts and develop comprehensive marketing strategies...",
      tags: ["Digital Marketing", "SEO", "Analytics", "Strategy"],
      postedDate: "1 day ago",
      logo: "📈"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      jobType: "Contract",
      workMode: "Remote",
      salary: "50 - 80 ETB/hr",
      description: "Create beautiful and intuitive user experiences for web and mobile applications...",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      postedDate: "3 days ago",
      logo: "🎨"
    },
  ];

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                      {job.logo}
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
                          {job.postedDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                          {job.jobType}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                          {job.workMode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    {job.salary}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-500">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" className="border-gray-700">Previous</Button>
            <Button className="bg-emerald-500">1</Button>
            <Button variant="outline" className="border-gray-700">2</Button>
            <Button variant="outline" className="border-gray-700">3</Button>
            <Button variant="outline" className="border-gray-700">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBrowsing;
