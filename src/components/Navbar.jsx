import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, 
  Heart, 
  CalendarCheck, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  MapPin,
  ChevronDown,
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { useRental } from '../context/RentalContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { 
    favorites, 
    bookings, 
    setIsBookingsDrawerOpen,
    selectedCity,
    setSelectedCity 
  } = useRental();

  const indianCities = [
    'Bengaluru',
    'Mumbai',
    'Delhi NCR',
    'Hyderabad',
    'Goa',
    'Chennai',
    'Pune'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fleet Catalog', path: '/cars' },
    { name: 'Airport & City Hubs', path: '/#hubs' },
    { name: 'Self-Drive Experience', path: '/#experience' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'FAQs', path: '/#faq' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top VIP Broadcast Bar */}
      <div className={`hidden lg:block bg-[#070b12] border-b border-white/5 transition-all duration-300 ${
        isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'py-2 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-slate-400">
          
          {/* Left: Indian Presence Indicator */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-white/10 text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 🇮🇳
              </span>
              PAN-India Luxury & Self-Drive Fleet
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> All-India Tourist Permit & Fastag Pre-Loaded
            </span>
          </div>

          {/* Right: Contact & Support */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 Roadside Hotline: <strong className="text-white font-mono">1800-889-RENT</strong></span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">Zero Cancellation Fee up to 24h</span>
          </div>

        </div>
      </div>


      {/* Main Luxury Nav Header */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080d17]/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl py-3' 
          : 'bg-[#0b101c]/80 backdrop-blur-xl border-b border-white/10 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & India Flag Dot */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Car className="w-6 h-6 text-slate-950 stroke-[2.2]" />
                </div>
                {/* Micro Tricolor Accent */}
                <div className="absolute -bottom-1 -right-1 flex gap-0.5 p-0.5 rounded-full bg-slate-950 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#138808]"></span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    Rent<span className="text-amber-400">it</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 font-mono">
                    .IN
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-0.5">
                  India Premier Mobility
                </span>
              </div>
            </Link>


            {/* City Hub Quick Selector (In Navbar) */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-2xl px-3 py-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400 text-[11px] font-medium">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                {indianCities.map((city) => (
                  <option key={city} value={city} className="bg-slate-900 text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>


            {/* Center Navigation Links (Floating Glass Capsule) */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-950/70 border border-white/10 rounded-2xl px-3 py-1 shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>


            {/* Header Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-3">
              
              {/* Saved Cars Button */}
              <Link
                to="/cars?filter=saved"
                title="Saved Vehicles"
                className="relative p-2.5 rounded-2xl bg-slate-900 border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-400/30 transition-all"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500/20 text-rose-400' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* My Bookings Trigger */}
              <button
                type="button"
                onClick={() => setIsBookingsDrawerOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 border border-white/10 text-slate-200 hover:text-amber-400 hover:border-amber-400/30 text-xs font-bold transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <span>My Trips</span>
                {bookings.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                    {bookings.length}
                  </span>
                )}
              </button>

              {/* Primary Book Now CTA - NO STAR SYMBOL */}
              <Link
                to="/cars"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Car</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

            </div>


            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsBookingsDrawerOpen(true)}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-white/10 text-amber-400"
              >
                <CalendarCheck className="w-5 h-5" />
                {bookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                    {bookings.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#090e18]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          
          {/* Mobile City Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-white/10">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" /> Current City:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {indianCities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/cars?filter=saved"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-500/10 px-3.5 py-2 rounded-xl border border-rose-500/20"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>Saved Cars ({favorites.length})</span>
            </Link>

            <span className="text-xs font-mono text-slate-400">1800-889-RENT</span>
          </div>

          {/* Mobile Book CTA - NO STAR SYMBOL */}
          <Link
            to="/cars"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30"
          >
            <span>Book a Car</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      )}

    </header>
  );
}
