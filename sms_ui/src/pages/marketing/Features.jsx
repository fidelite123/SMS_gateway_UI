import React from 'react';
import Nav from '../../components/marketing/Nav';
import Footer from '../../components/marketing/Footer';
import smsIcon from '../../assets/sms-icon.png';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#1a1a3e] text-white">
      <Nav />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <img src={smsIcon} alt="SMS Icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">Powerful Features</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Everything you need to run a modern SMS business — admin control, resellers, API & SMPP connectivity, and analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">📡</div>
              <h4 className="font-bold text-xl mb-3 text-white">SMPP + HTTP API</h4>
              <p className="text-white/80 leading-relaxed">Full support for SMPP v3.4 connectors and HTTP APIs for submission and DLRs.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🏢</div>
              <h4 className="font-bold text-xl mb-3 text-white">Multi-Tenant Resellers</h4>
              <p className="text-white/80 leading-relaxed">White-label portals, per-reseller pricing, and separate wallets for complete control.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🔄</div>
              <h4 className="font-bold text-xl mb-3 text-white">Routing & Failover</h4>
              <p className="text-white/80 leading-relaxed">Assign upstreams, weights, and automatic failover for maximum reliability.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">📊</div>
              <h4 className="font-bold text-xl mb-3 text-white">Delivery Reports</h4>
              <p className="text-white/80 leading-relaxed">Real-time DLR ingestion and searchable logs for complete troubleshooting.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">💰</div>
              <h4 className="font-bold text-xl mb-3 text-white">Billing & Wallets</h4>
              <p className="text-white/80 leading-relaxed">Prepaid wallets, detailed transactions, and automated invoice exports.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all border border-white/10 hover:border-fuchsia-500/50">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🔒</div>
              <h4 className="font-bold text-xl mb-3 text-white">Audit Logs</h4>
              <p className="text-white/80 leading-relaxed">Track all critical actions for complete compliance and security oversight.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
