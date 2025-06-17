
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Users, TrendingUp, Clock, Star, Building2, ArrowRight, Zap, Sparkles, Target, Rocket, Play, Award, Globe, Filter } from "lucide-react";

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
      featured: true,
      urgent: true
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
      featured: false,
      urgent: false
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
      featured: true,
      urgent: false
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Live Jobs", value: "3.2K+", color: "from-emerald-400 to-teal-500", accent: "emerald" },
    { icon: Users, label: "Top Companies", value: "850+", color: "from-violet-400 to-purple-500", accent: "violet" },
    { icon: Award, label: "Success Rate", value: "94%", color: "from-amber-400 to-orange-500", accent: "amber" }
  ];

  const categories = [
    { name: "Technology", count: "1.2K+", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { name: "Design", count: "680+", icon: "🎨", color: "from-pink-500 to-rose-500" },
    { name: "Marketing", count: "420+", icon: "📈", color: "from-green-500 to-emerald-500" },
    { name: "Finance", count: "310+", icon: "💰", color: "from-yellow-500 to-amber-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  JobConnect
                </h1>
                <p className="text-xs text-gray-400 font-mono">NEXT-GEN CAREERS</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Explore</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Companies</a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors font-medium">Post Job</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-6 shadow-lg shadow-blue-500/25">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 font-mono text-sm backdrop-blur-sm">
                  <Play className="h-3 w-3 mr-2 fill-current" />
                  15,000+ OPPORTUNITIES LIVE
                </Badge>
                
                <div className="space-y-4">
                  <h2 className="text-7xl font-black leading-[0.9] tracking-tight">
                    <span className="block text-white">UNLOCK</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      YOUR NEXT
                    </span>
                    <span className="block text-5xl text-gray-300 font-normal">career move</span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-lg font-light">
                    Connect with forward-thinking companies and discover roles that match your ambitions in our AI-powered job ecosystem.
                  </p>
                </div>
                
                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">3.2K+</div>
                    <div className="text-sm text-gray-400 font-mono">ACTIVE JOBS</div>
                  </div>
                  <div className="w-px h-12 bg-gray-700"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">850+</div>
                    <div className="text-sm text-gray-400 font-mono">COMPANIES</div>
                  </div>
                  <div className="w-px h-12 bg-gray-700"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">94%</div>
                    <div className="text-sm text-gray-400 font-mono">SUCCESS RATE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Search Terminal */}
            <div className="relative">
              <div className="bg-gray-900/50 backdrop-blur-2xl rounded-3xl border border-gray-800 p-8 shadow-2xl">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 font-mono text-sm">job_search.exe</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-lg font-bold text-white mb-4">Initialize Job Search</div>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-4 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 font-mono text-sm">$</span>
                      </div>
                      <Input 
                        placeholder="Enter job title or skills..."
                        className="pl-16 h-14 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 font-mono focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-4 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                        <span className="text-purple-400 font-mono text-sm">@</span>
                      </div>
                      <Input 
                        placeholder="Location or remote..."
                        className="pl-16 h-14 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 font-mono focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/25 group">
                    <Target className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    EXECUTE SEARCH
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-mono">Status:</span>
                    <span className="text-green-400 font-mono flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      READY
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-80 animate-bounce blur-sm"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-white mb-4">Browse by Category</h3>
            <p className="text-gray-400 text-lg">Explore opportunities across different industries</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{category.name}</h4>
                      <p className="text-gray-400 font-mono text-sm">{category.count} positions</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h3 className="text-5xl font-black text-white mb-4">Featured Opportunities</h3>
              <p className="text-gray-400 text-xl">Hand-picked positions from top companies</p>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all duration-500 cursor-pointer group hover:scale-105">
                <CardHeader className="relative">
                  {job.urgent && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse">
                        <Zap className="h-3 w-3 mr-1" />
                        URGENT
                      </Badge>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-purple-400 font-semibold">
                        <Building2 className="h-4 w-4 mr-2" />
                        {job.company}
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-sm">
                        <Globe className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-blue-500/30 text-blue-400 bg-blue-500/10 font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm font-mono">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-purple-500/25 px-8 py-4">
              Explore All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/50 backdrop-blur-xl border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    JobConnect
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">NEXT-GEN CAREERS</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting talent with opportunity through advanced technology and human insight.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-blue-400">For Talents</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Find Jobs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Career Tools</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-purple-400">For Companies</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-pink-400">Resources</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm font-mono">
              © 2024 JobConnect. Engineered for the future of work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
