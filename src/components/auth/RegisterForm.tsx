
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthActions } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/user';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('job_seeker');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const { register, loading, error } = useAuthActions();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password should be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (role === 'job_seeker' && (!firstName || !lastName)) {
      toast({
        title: "Missing Information",
        description: "Please enter your first and last name.",
        variant: "destructive",
      });
      return;
    }

    if (role === 'employer' && !companyName) {
      toast({
        title: "Missing Information",
        description: "Please enter your company name.",
        variant: "destructive",
      });
      return;
    }

    const profileData = role === 'employer' 
      ? { 
          companyName, 
          industry: '', 
          description: '', 
          numberOfEmployees: '', 
          location: '',
          website: '',
          contactPerson: ''
        }
      : { 
          firstName, 
          lastName, 
          bio: '', 
          skills: [], 
          location: '',
          phoneNumber: '',
          experience: '',
          education: ''
        };

    try {
      console.log('Attempting registration with:', { email, role, profileData });
      await register(email, password, role, profileData);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to EthioWork! Your account has been created successfully.",
      });
      
      // Add a small delay to show the success message
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (err: any) {
      console.error('Registration form error:', err);
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Join EthioWork
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">I am a</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)} disabled={loading}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="job_seeker" className="text-white hover:bg-gray-700">Job Seeker</SelectItem>
                <SelectItem value="employer" className="text-white hover:bg-gray-700">Employer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === 'job_seeker' ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
                    placeholder="First name"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
                    placeholder="Last name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
                placeholder="Your company name"
                required
                disabled={loading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
              placeholder="Create a password (min 6 characters)"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400"
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
          
          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
