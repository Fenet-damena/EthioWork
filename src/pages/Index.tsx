
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Users, Building2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              EthioWork
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={handleSignIn}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              Sign In
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Job in{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ethiopia
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect talented professionals with leading companies across Ethiopia. 
            Whether you're seeking opportunities or looking for talent, EthioWork is your gateway to success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4 h-auto"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/jobs')}
              className="border-gray-700 text-white hover:bg-gray-800/50 text-lg px-8 py-4 h-auto"
            >
              Browse Jobs
              <Briefcase className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <Users className="h-12 w-12 text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">For Job Seekers</h3>
              <p className="text-gray-400">
                Discover opportunities that match your skills and ambitions. Create your profile and get discovered by top employers.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-colors">
              <Building2 className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">For Employers</h3>
              <p className="text-gray-400">
                Find the perfect candidates for your team. Post jobs and connect with Ethiopia's top talent pool.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-colors">
              <Briefcase className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-gray-400">
                Our platform intelligently matches candidates with the right opportunities based on skills and preferences.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 EthioWork. Connecting talent with opportunity across Ethiopia.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
