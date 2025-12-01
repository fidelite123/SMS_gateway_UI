import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = login(email, password);
      if (!user || user.role !== 'admin') {
        // If not admin, immediately logout and show error
        logout();
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-3xl text-white">A</div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-white">Admin Login</h1>
          <p className="text-center text-gray-300 mb-8 text-sm">Sign in with an admin account</p>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-200 font-semibold mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                placeholder="admin@yourdomain.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-semibold mb-2 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm font-semibold transition-colors">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
