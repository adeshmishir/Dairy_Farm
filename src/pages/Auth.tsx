import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../lib/auth';

const API = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('tab') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const body = isLogin ? { email, password } : { name, email, password };
      
      const response = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      login(data.user, data.token);
      toast.success(isLogin ? 'Successfully logged in!' : 'Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Google Auth failed');

      login(data.user, data.token);
      toast.success('Signed in with Google! 🚀');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background with About Us image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dfect5qyk/image/upload/v1773772540/mishra_dairy/about/about_hero_background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02110b] via-transparent to-[#02110b]" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-[#0a2318]/80 backdrop-blur-xl p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-white/10 relative z-10 scale-in-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <User className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join Our Farm'}
          </h2>
          <p className="text-base text-green-100/40 font-medium">
            {isLogin ? 'Enter your credentials to continue' : 'Become a part of our pure dairy family'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-green-500/40 group-focus-within:text-green-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#02110b]/50 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-green-500/40 group-focus-within:text-green-400 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-[#02110b]/50 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                placeholder="Email address"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-green-500/40 group-focus-within:text-green-400 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-[#02110b]/50 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-green-600 hover:bg-green-700 active:scale-95 shadow-xl shadow-green-900/20 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-6 inset-y-0 flex items-center">
                <ArrowRight className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-[#0a2318] text-green-100/20 font-black uppercase tracking-widest">Or Secure Login</span>
          </div>
        </div>

        <div className="flex justify-center overflow-hidden rounded-2xl border border-white/5">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            theme="filled_black"
            shape="pill"
            text="continue_with"
            width="100%"
          />
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors border-b border-green-500/10 pb-1"
          >
            {isLogin ? "Don't have an account? Create one" : 'Already part of the family? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
