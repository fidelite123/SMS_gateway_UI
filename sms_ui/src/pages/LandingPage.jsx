import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Nav() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-bold">W</div>
          <div className="text-white font-semibold">WeCall</div>
        </Link>

        <div className="hidden md:flex gap-6 items-center text-white">
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/login" className="px-4 py-2 bg-white text-blue-700 rounded-lg font-medium shadow">Get Started</Link>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  return (
    <details className="text-white">
      <summary className="cursor-pointer">Menu</summary>
      <div className="mt-2 flex flex-col gap-2">
        <Link to="/features" className="px-3 py-2">Features</Link>
        <Link to="/pricing" className="px-3 py-2">Pricing</Link>
        <Link to="/contact" className="px-3 py-2">Contact</Link>
        <Link to="/login" className="px-3 py-2 bg-white text-blue-700 rounded">Get Started</Link>
      </div>
    </details>
  );
}

const Hero = () => (
  <section className="min-h-[70vh] flex items-center bg-gradient-to-br from-blue-700 to-indigo-800">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">The Fast, Reliable & Scalable SMS Platform</h1>
        <p className="mt-4 text-white/90 text-lg">Send messages worldwide with enterprise-grade SMPP routing, reseller support, and real-time delivery reporting.</p>

        <div className="mt-6 flex gap-4">
          <Link to="/pricing" className="px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold shadow hover:scale-105 transition">Get Started</Link>
          <a href="#features" className="px-6 py-3 border border-white rounded-xl text-white/95 hover:bg-white/10 transition">Learn More</a>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90">
          <li>⚡ High throughput (50–100 SMS/sec start)</li>
          <li>🔒 Secure role-based access & audit logs</li>
          <li>🔁 Smart failover routing</li>
          <li>🧾 Detailed delivery reports</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white/6 p-6 rounded-2xl">
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-white font-semibold">Quick Demo</h3>
          <p className="text-white/80 mt-2 text-sm">Mock mode: explore dashboards, send test messages, and preview delivery reports without credits.</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between bg-white/5 p-3 rounded">
              <div>
                <div className="text-white font-medium">WeCall Admin</div>
                <div className="text-white/70 text-sm">Global insights & routing</div>
              </div>
              <div className="text-white/90">Dashboard →</div>
            </div>

            <div className="flex items-center justify-between bg-white/5 p-3 rounded">
              <div>
                <div className="text-white font-medium">Reseller Portal</div>
                <div className="text-white/70 text-sm">Manage clients & pricing</div>
              </div>
              <div className="text-white/90">Portal →</div>
            </div>

            <div className="flex items-center justify-between bg-white/5 p-3 rounded">
              <div>
                <div className="text-white font-medium">Client Dashboard</div>
                <div className="text-white/70 text-sm">Send SMS & view logs</div>
              </div>
              <div className="text-white/90">Open →</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <p className="mb-8 text-white/90">Everything you need to run a modern SMS business — admin control, resellers, API & SMPP connectivity, and analytics.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="SMPP + HTTP" copy="Full support for SMPP v3.4 connectors and HTTP APIs for submission and DLRs." />
          <FeatureCard title="Multi-Tenant Resellers" copy="White-label portals, per-reseller pricing, and separate wallets." />
          <FeatureCard title="Routing & Failover" copy="Assign upstreams, weights, and automatic failover for reliability." />

          <FeatureCard title="Delivery Reports" copy="Real-time DLR ingestion and searchable logs for troubleshooting." />
          <FeatureCard title="Billing & Wallets" copy="Prepaid wallets, transactions, and invoice exports." />
          <FeatureCard title="Audit Logs" copy="Track all critical actions for compliance and security." />
        </div>

        <div className="mt-12 p-6 bg-white/6 rounded-2xl">
          <h3 className="text-xl font-semibold">For Developers</h3>
          <p className="text-white/80 mt-2">REST API, API keys, webhooks for DLRs — everything to integrate quickly and reliably.</p>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, copy }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white/6 p-5 rounded-xl">
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-white/80 mt-2 text-sm">{copy}</p>
    </motion.div>
  );
}

function PricingPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Pricing</h2>
        <p className="mb-8 text-gray-700">Simple pricing based on message usage — start free in mock mode and pay for SMS when ready.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <div className="text-xl font-semibold">Starter</div>
            <div className="mt-2 text-gray-600">Free (Mock Mode)</div>
            <ul className="mt-4 text-gray-700">
              <li>• Explore dashboards</li>
              <li>• Send mock SMS</li>
              <li>• API docs access</li>
            </ul>
            <div className="mt-6">
              <Link to="/signup" className="px-4 py-2 bg-blue-700 text-white rounded">Get Started</Link>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="text-xl font-semibold">Business</div>
            <div className="mt-2 text-gray-600">Pay-as-you-go</div>
            <ul className="mt-4 text-gray-700">
              <li>• Production SMS</li>
              <li>• 24/7 support</li>
              <li>• API & SMPP access</li>
            </ul>
            <div className="mt-6">
              <Link to="/signup" className="px-4 py-2 bg-blue-700 text-white rounded">Contact Sales</Link>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="text-xl font-semibold">Reseller</div>
            <div className="mt-2 text-gray-600">White-label</div>
            <ul className="mt-4 text-gray-700">
              <li>• Reseller portal</li>
              <li>• Per-reseller pricing</li>
              <li>• Custom domain</li>
            </ul>
            <div className="mt-6">
              <Link to="/signup" className="px-4 py-2 bg-blue-700 text-white rounded">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-6 text-white/90">Questions about integrations, pricing, or reselling? Reach out and we'll respond quickly.</p>

        <div className="bg-white/6 p-6 rounded-lg">
          <form className="grid gap-4">
            <input className="p-3 rounded bg-white/5" placeholder="Your name" />
            <input className="p-3 rounded bg-white/5" placeholder="Email" />
            <textarea className="p-3 rounded bg-white/5" rows={5} placeholder="Message" />
            <button className="px-4 py-3 bg-white text-blue-700 rounded font-semibold">Send Message</button>
          </form>
        </div>

        <div className="mt-8 text-white/80">
          <h4 className="font-semibold">Sales & Partnerships</h4>
          <p>sales@wecall.example</p>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-white/6 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div>© {new Date().getFullYear()} WeCall</div>
        <div className="flex gap-4">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="w-full max-w-md p-6 bg-white/6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Login</h3>
        <form className="space-y-3">
          <input className="w-full p-3 rounded bg-white/5" placeholder="Email" />
          <input className="w-full p-3 rounded bg-white/5" placeholder="Password" type="password" />
          <button className="w-full px-4 py-3 bg-white text-blue-700 rounded font-semibold">Sign In</button>
        </form>

        <div className="mt-4 text-white/90">
          <p>Use mock mode credentials: <strong>demo@wecall.test</strong></p>
        </div>
      </div>
    </main>
  );
}

export default function LandingPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <section id="features" className="py-16 bg-white">
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

      <Footer />
    </div>
  );
}
