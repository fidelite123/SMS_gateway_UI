import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/marketing/Nav';
import Footer from '../../components/marketing/Footer';
import smsIcon from '../../assets/sms-icon.png';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Nav />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <img src={smsIcon} alt="SMS Icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 bg-clip-text text-transparent">Pricing Plans</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">Simple pricing based on message usage — start free in mock mode and pay for SMS when ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-fuchsia-500">
              <div className="text-2xl font-bold text-gray-800">Starter</div>
              <div className="mt-2 text-3xl font-extrabold text-fuchsia-600">Free</div>
              <div className="text-sm text-gray-500">Mock Mode</div>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-center gap-2">✓ Explore dashboards</li>
                <li className="flex items-center gap-2">✓ Send mock SMS</li>
                <li className="flex items-center gap-2">✓ API docs access</li>
                <li className="flex items-center gap-2">✓ Test integrations</li>
              </ul>
              <div className="mt-8">
                <Link to="/register" className="block text-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition">Get Started</Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl transition-all border-2 border-fuchsia-500 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</div>
              <div className="text-2xl font-bold text-gray-800">Business</div>
              <div className="mt-2 text-3xl font-extrabold text-fuchsia-600">Custom</div>
              <div className="text-sm text-gray-500">Pay-as-you-go</div>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-center gap-2">✓ Production SMS</li>
                <li className="flex items-center gap-2">✓ 24/7 support</li>
                <li className="flex items-center gap-2">✓ API & SMPP access</li>
                <li className="flex items-center gap-2">✓ Priority routing</li>
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="block text-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition">Contact Sales</Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-fuchsia-500">
              <div className="text-2xl font-bold text-gray-800">Reseller</div>
              <div className="mt-2 text-3xl font-extrabold text-fuchsia-600">Enterprise</div>
              <div className="text-sm text-gray-500">White-label</div>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-center gap-2">✓ Reseller portal</li>
                <li className="flex items-center gap-2">✓ Per-reseller pricing</li>
                <li className="flex items-center gap-2">✓ Custom domain</li>
                <li className="flex items-center gap-2">✓ Dedicated support</li>
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="block text-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition">Talk to Sales</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
