import React from 'react';
import Nav from '../../components/marketing/Nav';
import Footer from '../../components/marketing/Footer';
import smsIcon from '../../assets/sms-icon.png';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#1a1a3e] text-white">
      <Nav />
      <main className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <img src={smsIcon} alt="SMS Icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">Questions about integrations, pricing, or reselling? Reach out and we'll respond quickly.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Full Name</label>
                  <input className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-white/50 border border-white/10 focus:border-fuchsia-500 focus:outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Email Address</label>
                  <input type="email" className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-white/50 border border-white/10 focus:border-fuchsia-500 focus:outline-none transition" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Phone Number</label>
                  <input className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-white/50 border border-white/10 focus:border-fuchsia-500 focus:outline-none transition" placeholder="+250 788 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Message</label>
                  <textarea className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-white/50 border border-white/10 focus:border-fuchsia-500 focus:outline-none transition" rows={5} placeholder="Tell us about your project..." />
                </div>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 rounded-lg font-semibold text-white shadow-lg transition">Send Message</button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-3xl mb-3">📧</div>
                <h4 className="font-bold text-xl mb-2 text-white">Email Us</h4>
                <p className="text-white/70 mb-2">For general inquiries</p>
                <a href="mailto:info@wecall.rw" className="text-fuchsia-400 hover:text-fuchsia-300 transition">info@wecall.rw</a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-3xl mb-3">📞</div>
                <h4 className="font-bold text-xl mb-2 text-white">Call Us</h4>
                <p className="text-white/70 mb-2">Monday to Friday, 8am-6pm</p>
                <a href="tel:+250788191802" className="text-fuchsia-400 hover:text-fuchsia-300 transition">+250 788 191 802</a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-3xl mb-3">📍</div>
                <h4 className="font-bold text-xl mb-2 text-white">Visit Us</h4>
                <p className="text-white/70">M. Peace Plaza, 8th Floor, Tower B<br/>Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
