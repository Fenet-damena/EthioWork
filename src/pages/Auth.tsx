
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

type AuthMode = 'login' | 'register' | 'forgot-password';

const Auth = () => {
  const location = useLocation();
  const defaultMode = location.state?.mode || 'login';
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      console.log('User already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleAuthSuccess = () => {
    console.log('Authentication successful, redirecting to dashboard');
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={handleBackToHome}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {mode === 'login' && (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setMode('register')}
            onForgotPassword={() => setMode('forgot-password')}
          />
        )}
        
        {mode === 'register' && (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
        
        {mode === 'forgot-password' && (
          <ForgotPasswordForm
            onBack={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
