
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthActions } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, loading, error } = useAuthActions();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Attempting login with email:', email);
      await login(email, password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to EthioWork!",
      });
      
      // Add a small delay to show the success message
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (err: any) {
      console.error('Login form error:', err);
      toast({
        title: "Login Failed",
        description: err.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900/50 backdrop-blur-xl border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Sign In to EthioWork
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded"
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
          
          <div className="text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
