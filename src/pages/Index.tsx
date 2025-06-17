
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Users, TrendingUp, Clock, Star, Building2, ArrowRight, Zap, Sparkles, Target, Rocket } from "lucide-react";

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
    { icon: Briefcase, label: "Active Jobs", value: "2,847", color: "text-orange-500", bg: "bg-orange-100" },
    { icon: Users, label: "Companies", value: "1,200+", color: "text-teal-500", bg: "bg-teal-100" },
    { icon: TrendingUp, label: "Successful Hires", value: "15,000+", color: "text-violet-500", bg: "bg-violet-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-1/4 w-20 h-20 border-2 border-yellow-400/30 rotate-45 animate-spin"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 transform rotate-12 animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-12 h-32 bg-gradient-to-b from-pink-400/30 to-transparent transform -rotate-12"></div>
      </div>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-2xl">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  JobConnect
                </span>
                <div className="text-xs text-cyan-400 font-medium">Find • Apply • Succeed</div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-yellow-400 font-medium transition-all duration-300 relative group">
                Find Jobs
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 font-medium transition-all duration-300 relative group">
                Companies
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 font-medium transition-all duration-300 relative group">
                Post Job
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-2xl transform hover:scale-105 transition-all duration-200">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-400/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  12,000+ New Opportunities This Week
                </Badge>
                
                <h1 className="text-7xl font-black leading-tight">
                  <span className="block text-white">Land Your</span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                  <span className="block text-4xl text-gray-300 font-normal">in 2024</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Connect with innovative companies worldwide and discover opportunities that align with your passion and expertise.
                </p>
              </div>

              {/* Stats in Hero */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl mb-2 inline-flex`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Search Card */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Start Your Search</h3>
                  <p className="text-gray-300">Find the perfect opportunity for you</p>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-yellow-400" />
                    <Input 
                      placeholder="Job title, skills, or company"
                      className="pl-12 h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />
                    <Input 
                      placeholder="Location or remote"
                      className="pl-12 h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                  
                  <Button className="w-full h-14 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200">
                    <Target className="mr-2 h-5 w-5" />
                    Find Jobs
                  </Button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-6">
              <Badge className="bg-gradient-to-r from-violet-400/20 to-purple-500/20 text-violet-300 border-violet-400/30 px-6 py-3 text-base font-medium backdrop-blur-sm">
                <Star className="h-5 w-5 mr-2" />
                Trending Opportunities
              </Badge>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Hot Jobs Right Now
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Handpicked positions from companies that are actively hiring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job, index) => (
              <Card key={job.id} className={`bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:-translate-y-4 hover:shadow-2xl group ${
                job.featured ? 'ring-2 ring-yellow-400/50' : ''
              }`}>
                <CardHeader className="relative">
                  {job.featured && (
                    <div className="absolute -top-3 -right-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                        <Zap className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {job.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-teal-400/20 text-teal-300 border-teal-400/30">
                      {job.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-orange-400 font-semibold mb-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {job.company}
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-cyan-400/30 text-cyan-300 bg-cyan-400/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-4">
              Explore All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    JobConnect
                  </span>
                  <div className="text-xs text-cyan-400">Find • Apply • Succeed</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Connecting ambitious professionals with extraordinary opportunities through cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-yellow-400">For Job Seekers</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-cyan-400">For Employers</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-pink-400">Company</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
