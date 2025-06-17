
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Users, TrendingUp, Clock, Star, Building2, ArrowRight, Zap } from "lucide-react";

const Index = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Join our innovative team building next-generation web applications...",
      tags: ["React", "TypeScript", "JavaScript"],
      posted: "2 days ago",
      featured: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Lead product strategy and work with cross-functional teams...",
      tags: ["Product Strategy", "Analytics", "Leadership"],
      posted: "1 day ago",
      featured: false
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio Inc",
      location: "New York, NY",
      type: "Contract",
      salary: "$70 - $90/hr",
      description: "Create beautiful and intuitive user experiences for mobile apps...",
      tags: ["Figma", "User Research", "Prototyping"],
      posted: "3 days ago",
      featured: true
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "2,847", color: "text-purple-600" },
    { icon: Users, label: "Companies", value: "1,200+", color: "text-emerald-600" },
    { icon: TrendingUp, label: "Successful Hires", value: "15,000+", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-2 rounded-xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                JobConnect
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Find Jobs</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Companies</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Post Job</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50">Sign In</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-1" />
              Over 10,000 jobs posted this week
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Dream Career
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with innovative companies and unlock opportunities that match your passion and expertise.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-16 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-purple-400" />
                <Input 
                  placeholder="Job title, keywords, or company"
                  className="pl-12 h-14 text-lg border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-purple-400" />
                <Input 
                  placeholder="City, state, or remote"
                  className="pl-12 h-14 text-lg border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <Button className="h-14 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                Search Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-1" />
              Featured Opportunities
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Jobs</h2>
            <p className="text-gray-600 text-lg">Hand-picked opportunities from top-tier companies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className={`hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 ${
                job.featured ? 'bg-gradient-to-br from-white to-purple-50 ring-2 ring-purple-200' : 'bg-white'
              }`}>
                <CardHeader className="relative">
                  {job.featured && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
                      {job.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold mb-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {job.company}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
              Explore All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-purple-400 to-cyan-400 p-2 rounded-xl">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  JobConnect
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Connecting talented professionals with amazing opportunities worldwide through innovative technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-300">For Job Seekers</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-cyan-300">For Employers</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Find Candidates</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-300">Company</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-emerald-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-300 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-300 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
