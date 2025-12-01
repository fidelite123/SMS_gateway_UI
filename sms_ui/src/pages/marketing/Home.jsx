import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../../components/marketing/Nav';
import Footer from '../../components/marketing/Footer';
import smsIcon from '../../assets/sms-icon.png';

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{background: 'linear-gradient(to bottom right, #007BFF, #FF00FF, #1b1b3a)'}}>
      <Nav />
      <header className="py-24" style={{background: 'linear-gradient(to right, #FF00FF, #007BFF)'}}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 lg:col-span-6 space-y-6">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Supercharge Your Business Communication
            </motion.h1>
            <p className="text-white/90 max-w-2xl leading-relaxed space-y-4">
              <span className="block">Send, automate, and manage SMS directly from your web app — fast, reliable, and developer‑friendly.</span>
              <span className="block">Built for scale with an integration‑first approach and beautiful analytics.</span>
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/register" className="bg-white hover:bg-gray-100 px-7 py-3 rounded-full font-semibold shadow" style={{color: '#FF00FF'}}>
                Get Started
              </Link>
              <a href="#features" className="border border-white/60 hover:border-white px-7 py-3 rounded-full text-white/90 hover:text-white transition-colors">
                Learn More
              </a>
            </div>
            <div className="flex items-center gap-4 pt-6 text-sm text-white/90">
              <img src={smsIcon} alt="WeCall SMS Integration Logo" className="w-14 h-14" />
              <div className="leading-relaxed">
                <div className="font-semibold tracking-wide">WeCall SMS Integration</div>
                <div className="text-white/70">Reliable, Scalable, Insightful Communication</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 lg:col-span-6 flex justify-end">
            <div className="w-full max-w-lg grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <img src="https://via.placeholder.com/420x260?text=Analytics+Dashboard" alt="Analytics dashboard placeholder" className="w-full h-40 object-cover rounded-md" />
                <p className="mt-3 text-xs text-white/90 leading-relaxed">Real‑time delivery and conversion metrics.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <img src="https://via.placeholder.com/420x260?text=Message+Composer" alt="Message composer placeholder" className="w-full h-40 object-cover rounded-md" />
                <p className="mt-3 text-xs text-white/90 leading-relaxed">Template‑driven multi‑language messaging.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg col-span-2">
                <img src="https://via.placeholder.com/800x260?text=Global+Routing" alt="Global routing map placeholder" className="w-full h-44 object-cover rounded-md" />
                <p className="mt-3 text-xs text-white/90 leading-relaxed">Optimized routing across carriers & regions.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight text-center" style={{color: '#FF00FF'}}>Core Features</h3>
          <p className="mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">Tools designed to help you deliver messages at scale with speed, reliability, and full insight from submission to delivery.</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[{title:'Bulk & Individual SMS', text:'Send to many users at once or personalize individual messages easily.'},{title:'REST API Integration', text:'Seamlessly connect SMS into your app or CRM with a simple API.'},{title:'Scheduling & Automation', text:'Trigger SMS based on events like signups, purchases, or reminders.'},{title:'Delivery Tracking', text:'Monitor sent, delivered, or failed messages in real time.'},{title:'Two‑Way Messaging', text:'Receive replies from customers and manage them in your system.'},{title:'Scalable & Reliable', text:'Built to handle both small and large volumes without breaking a sweat.'}].map((f,i)=> (
              <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-md transition space-y-2 border border-gray-100">
                <h4 className="font-semibold" style={{color: '#007BFF'}}>{f.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-gray-700 leading-relaxed">
              <h5 className="text-xl font-semibold text-fuchsia-600">Developer Friendly</h5>
              <p>Clear API surface, consistent webhooks, idempotent endpoints, and environment-aware sandboxing reduce integration friction.</p>
              <p className="leading-relaxed">Observability hooks feed logs directly to your monitoring stack while structured error objects keep failure handling predictable.</p>
              <Link to="/register" className="inline-block mt-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-3 rounded-md text-sm font-semibold shadow">Start Building</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://via.placeholder.com/360x360?text=API+Schemas" alt="API schemas placeholder" className="rounded-lg object-cover h-44 w-full" />
              <img src="https://via.placeholder.com/360x360?text=Webhook+Flow" alt="Webhook flow placeholder" className="rounded-lg object-cover h-44 w-full" />
              <img src="https://via.placeholder.com/360x360?text=Retry+Logic" alt="Retry logic placeholder" className="rounded-lg object-cover h-44 w-full col-span-2" />
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight text-center" style={{color: '#FF00FF'}}>Use Cases</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[{title:'Order & Delivery Updates', text:'Keep e‑commerce customers informed in real‑time about their orders.'},{title:'Appointment Reminders', text:'Reduce no‑shows with automated SMS reminders for bookings.'},{title:'Marketing Campaigns', text:'Run promotions, offers, and announcements with instant reach.'},{title:'Alerts & Notifications', text:'Send billing alerts, system notifications, and critical updates.'},{title:'Customer Support', text:'Engage in two‑way SMS to provide timely support and responses.'}].map((u,i)=> (
              <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-md transition space-y-2 border border-gray-100">
                <h4 className="font-semibold" style={{color: '#007BFF'}}>{u.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="py-20 text-white" style={{background: '#007BFF'}}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Ready to Elevate Your Communication?</h3>
          <p className="mt-4 text-white/90 leading-relaxed">Start sending SMS in minutes with WeCall — reliable, scalable, and easy to integrate.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/register" className="hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold shadow" style={{background: '#FF00FF'}}>Start for Free</Link>
            <Link to="/contact" className="bg-white hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow" style={{color: '#007BFF'}}>Contact Sales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
