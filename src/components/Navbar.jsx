import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Heart, 
  CalendarCheck, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';
import { useRental } from '../context/RentalContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { 
    favorites, 
    bookings, 
    setIsBookingsDrawerOpen 
  } = useRental();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'All Cars', target: '/cars', isRoute: true },
    { name: 'Airport & City Hubs', target: 'hubs', isRoute: false },
    { name: 'Self-Drive Experience', target: 'experience', isRoute: false },
    { name: 'How It Works', target: 'how-it-works', isRoute: false },
    { name: 'FAQs', target: 'faq', isRoute: false }
  ];

  const handleNavigation = (link) => {
    setIsMobileMenuOpen(false);

    if (link.isRoute) {
      navigate(link.target);
      return;
    }

    // Anchor scrolling for sections
    const targetId = link.target;
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToElement(targetId);
      }, 150);
    } else {
      scrollToElement(targetId);
    }
  };

  const scrollToElement = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -90 });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      {/* Single Line Clean Luxury Header */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080d17]/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl py-2' 
          : 'bg-[#0b101c]/85 backdrop-blur-xl border-b border-white/10 py-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Brand Logo - Single Line with Tricolor Accent */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Car className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                </div>
                {/* Micro Tricolor Accent */}
                <div className="absolute -bottom-1 -right-1 flex gap-0.5 p-0.5 rounded-full bg-slate-950 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#138808]"></span>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                Rent<span className="text-amber-400">it</span>
              </span>
            </Link>


            {/* Center Navigation Links - 5 Working Links in a Single Horizontal Row */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-slate-950/60 border border-white/10 rounded-2xl px-3 py-1 shadow-inner">
              {navLinks.map((link) => {
                const isActive = link.isRoute ? pathname === link.target : false;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavigation(link)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>


            {/* Right Action Cluster - Single Line (Saved, My Trips, Book a Car) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              
              {/* Saved Cars Button */}
              <Link
                to="/cars?filter=saved"
                title="Saved Vehicles"
                className="relative p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-400/30 transition-all"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500/20 text-rose-400' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* My Trips - Single Line */}
              <button
                type="button"
                onClick={() => setIsBookingsDrawerOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-amber-400 hover:border-amber-400/30 text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">My Trips</span>
                {bookings.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center ml-0.5">
                    {bookings.length}
                  </span>
                )}
              </button>

              {/* Book a Car - Single Line, No Star Symbol */}
              <Link
                to="/cars"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Book a Car</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
              </Link>

            </div>


            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsBookingsDrawerOpen(true)}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-white/10 text-amber-400 cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" />
                {bookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                    {bookings.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#090e18]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => handleNavigation(link)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </button>
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

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBookingsDrawerOpen(true);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-amber-400"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>My Trips ({bookings.length})</span>
            </button>
          </div>

          {/* Mobile Book a Car CTA */}
          <Link
            to="/cars"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 whitespace-nowrap"
          >
            <span>Book a Car</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      )}

    </header>
  );
}
