import React from 'react';
import smsIcon from '../../assets/sms-icon.png';

export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-sm text-white py-12 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={smsIcon} alt="WeCall SMS" className="w-10 h-10" />
              <span className="font-bold text-lg">WeCall SMS</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">Reliable cloud SMS gateway solutions for modern businesses.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/features" className="hover:text-white transition">Features</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <div>© {new Date().getFullYear()} WeCall SMS Gateway. All rights reserved.</div>
          <div className="mt-4 md:mt-0">Website: <a href="https://wecall.rw" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:text-fuchsia-300 transition">wecall.rw</a></div>
        </div>
      </div>
    </footer>
  );
}
