import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      register(email, password, role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-3xl text-white">W</div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-white">Create Account</h1>
          <p className="text-center text-gray-300 mb-8 text-sm">Join WeCall SMS Gateway</p>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                placeholder="At least 6 characters"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 text-sm">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-200 font-semibold mb-3 text-sm">I want to register as:</label>
              <div className="space-y-3">
                {/* Client Option */}
                <label className="flex items-center p-4 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300" style={{ borderColor: role === 'client' ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.2)' }}>
                  <input
                    type="radio"
                    value="client"
                    checked={role === 'client'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-white font-semibold text-sm">Client</p>
                    <p className="text-gray-300 text-xs">Send SMS, manage contacts, track delivery</p>
                  </div>
                </label>

                {/* Reseller Option */}
                <label className="flex items-center p-4 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300" style={{ borderColor: role === 'reseller' ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.2)' }}>
                  <input
                    type="radio"
                    value="reseller"
                    checked={role === 'reseller'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-white font-semibold text-sm">Reseller</p>
                    <p className="text-gray-300 text-xs">Manage multiple clients, billing & reports</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign In
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
      </div>
    </div>
  );
}
