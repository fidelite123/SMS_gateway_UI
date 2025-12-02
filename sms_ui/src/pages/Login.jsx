import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      const user = login(email, password);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetMessage('');
    
    if (!resetEmail) {
      setResetMessage('Please enter your email address');
      return;
    }

    // Simulate sending reset email
    setResetMessage('✓ Password reset link sent to ' + resetEmail + '. Check your email!');
    setTimeout(() => {
      setShowResetForm(false);
      setResetEmail('');
      setResetMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {showResetForm ? (
          // Reset Password Form
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            <button
              onClick={() => setShowResetForm(false)}
              className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Login
            </button>

            <h2 className="text-3xl font-bold text-center mb-2 text-white">Reset Password</h2>
            <p className="text-center text-gray-300 mb-8 text-sm">Enter your email address and we'll send you a link to reset your password</p>

            {resetMessage && (
              <div className={`mb-6 border rounded-lg p-4 ${
                resetMessage.includes('✓') 
                  ? 'bg-green-500/20 border-green-400/30' 
                  : 'bg-amber-500/20 border-amber-400/30'
              }`}>
                <p className={resetMessage.includes('✓') ? 'text-green-200' : 'text-amber-200'} style={{ fontSize: '0.875rem' }}>
                  {resetMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        ) : (
          // Login Form
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-3xl text-white shadow-lg">W</div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2 text-white">WeCall SMS Gateway</h1>
            <p className="text-center text-gray-300 mb-8 text-sm">Reseller Dashboard - Sign in to continue</p>

            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-200 font-semibold mb-2 text-sm">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowResetForm(true)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">Don't have an account?{' '}
                <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Create one now
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm font-semibold transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
