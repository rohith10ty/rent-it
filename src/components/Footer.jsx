import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#070a10] border-t border-white/10 text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/5 text-slate-300">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full Insurance Shield</h4>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive peace of mind</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 VIP Concierge</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant human roadside help</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Doorstep Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">To airport, hotel or villa</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pristine Fleet Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Deep detailed before arrival</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center">
                <Car className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Rent<span className="text-amber-400">it</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Your premier gateway to exceptional automobiles. From ultra-efficient city commuters to world-class exotic supercars, enjoy seamless digital booking and white-glove curbside handover.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Join the Rent it Private Club
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome! Exclusive discount code sent to your email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your VIP email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home Experience</Link></li>
              <li><Link to="/cars" className="hover:text-amber-400 transition-colors">Browse All 22 Cars</Link></li>
              <li><Link to="/cars?sort=price-asc" className="hover:text-amber-400 transition-colors">Cheapest Options (From $32)</Link></li>
              <li><Link to="/cars?sort=price-desc" className="hover:text-amber-400 transition-colors">Ultra Luxury & Supercars</Link></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How Booking Works</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Car Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Fleet Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/cars?type=Sports" className="hover:text-amber-400 transition-colors">Supercars & Exotic</Link></li>
              <li><Link to="/cars?type=Luxury" className="hover:text-amber-400 transition-colors">Executive Luxury Sedans</Link></li>
              <li><Link to="/cars?type=Electric" className="hover:text-amber-400 transition-colors">Electric & Hybrid Tech</Link></li>
              <li><Link to="/cars?type=SUV" className="hover:text-amber-400 transition-colors">Prestige 4x4 & SUVs</Link></li>
              <li><Link to="/cars?type=Economy" className="hover:text-amber-400 transition-colors">Budget City Commuters</Link></li>
              <li><Link to="/cars?transmission=Manual" className="hover:text-amber-400 transition-colors">Manual Track Drivers</Link></li>
            </ul>
          </div>

          {/* Concierge & Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Concierge Desk</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>+1 (800) 880-RENT (Toll Free 24/7)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>concierge@rentit-luxury.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Beverly Hills • Manhattan • Miami • Las Vegas</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Fleet Dispatchers Live Online</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rent it Global Inc. All rights reserved. Designed with pure automotive passion.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Rental</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Security & Insurance</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Fleet Standards</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
