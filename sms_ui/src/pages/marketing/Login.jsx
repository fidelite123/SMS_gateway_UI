import React from 'react';
import Nav from '../../components/marketing/Nav';
import Footer from '../../components/marketing/Footer';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <Nav />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-6 bg-white/6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Login</h3>
          <form className="space-y-3">
            <input className="w-full p-3 rounded bg-white/5 text-white" placeholder="Email" />
            <input className="w-full p-3 rounded bg-white/5 text-white" placeholder="Password" type="password" />
            <button className="w-full px-4 py-3 bg-white text-blue-700 rounded font-semibold">Sign In</button>
          </form>

          <div className="mt-4 text-white/90">
            <p>Use mock mode credentials: <strong>demo@wecall.test</strong></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
