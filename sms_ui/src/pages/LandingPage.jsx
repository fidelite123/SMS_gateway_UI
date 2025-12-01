import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-pink-500 flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div className="text-pink-600 font-bold text-lg">WeCall</div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <Link to="/login" className="text-gray-700">Login</Link>
            <Link to="/register" className="ml-2 inline-block bg-pink-500 text-white px-4 py-2 rounded-md text-sm">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">Never Lose a Customer Again</h1>
            <p className="mt-6 text-gray-600 max-w-xl">Reliable cloud messaging and calling solutions that ensure your business never misses an opportunity. Connect with customers anytime, anywhere.</p>
            <div className="mt-8 flex gap-4">
              <Link to="/register" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-semibold">Get Started</Link>
              <a href="#features" className="border border-gray-200 px-6 py-3 rounded-md text-gray-700">Learn More</a>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex justify-end">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
              <div className="rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1589571894960-20bbe2828d8a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0" alt="WeCall dashboard" className="w-full h-56 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold">Experience Smarter Messaging with WeCall</h2>
              <p className="mt-4 text-gray-600">Connect seamlessly from anywhere with crystal clear messages and real-time analytics all in one smart, intuitive platform.</p>
            </div>
            <div className="flex justify-end">
              <div className="w-64 bg-gray-100 rounded-xl p-6 shadow">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0" alt="mobile" className="w-full h-40 object-cover rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features (simple grid) */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8">Powerful Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Fast Delivery</h4>
              <p className="text-gray-600 text-sm">High throughput and low latency delivery to global carriers.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Templates & Automation</h4>
              <p className="text-gray-600 text-sm">Create templates, personalize messages and automate workflows.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Analytics</h4>
              <p className="text-gray-600 text-sm">Real-time delivery reports and campaign performance metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div>&copy; 2025 WeCall. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
