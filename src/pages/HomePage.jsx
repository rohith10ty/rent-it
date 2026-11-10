import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  Zap, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Gauge, 
  Users, 
  Fuel, 
  Clock, 
  MapPin, 
  Shield, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import BookingSearchWidget from '../components/BookingSearchWidget';
import CarCard from '../components/CarCard';
import { useRental } from '../context/RentalContext';
import { TESTIMONIALS, FAQ_DATA } from '../data/cars';

export default function HomePage() {
  const { cars, formatPrice } = useRental();
  const [activeFleetTab, setActiveFleetTab] = useState('popular');
  const [openFaq, setOpenFaq] = useState(0);

  // Filter cars for home page showcase
  const popularCars = cars.filter(c => c.isPopular).slice(0, 6);
  const featuredSupercars = cars.filter(c => c.type === 'Sports' || c.dailyPrice > 500).slice(0, 6);
  const budgetValueCars = cars.filter(c => c.dailyPrice <= 60).slice(0, 6);
  const electricCars = cars.filter(c => c.type === 'Electric' || c.fuel === 'Electric').slice(0, 6);

  const getActiveFleetList = () => {
    if (activeFleetTab === 'supercars') return featuredSupercars;
    if (activeFleetTab === 'budget') return budgetValueCars;
    if (activeFleetTab === 'electric') return electricCars;
    return popularCars;
  };

  return (
    <div className="relative overflow-hidden pt-20">
      
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Background Visual with Dramatic Lighting */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* High-res cinematic sports/luxury car background */}
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85"
            alt="Rent it Hero Car"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.08]"
          />
          {/* Ambient colored lighting glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle"></div>
          <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/90 via-[#0b0f17]/60 to-[#0b0f17] pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12">
          
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>The Gold Standard in Car Rentals • From $32/day to Supercars</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Drive the Extraordinary. <br />
            <span className="gold-gradient-text">Rent it Without Limits.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Experience complete automotive freedom. Instant digital keys, zero hidden deposit traps, and doorstep delivery across major airports and luxury hotels.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
            <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-amber-400 block">22+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Curated Vehicles</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-white block">$32 – $2,450</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Cheapest to Exotic</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-amber-400 block">100%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Digital Check-in</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-white block">4.9 / 5.0</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Client Satisfaction</span>
            </div>
          </div>

        </div>

        {/* Hero Search Widget */}
        <div className="w-full relative z-20">
          <BookingSearchWidget />
        </div>

      </section>


      {/* =========================================================================
          FEATURED & POPULAR CARS FLEET SHOWCASE
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="fleet">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Car className="w-4 h-4" />
              <span>World-Class Automobile Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured & Popular Rental Cars
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From budget-conscious city runabouts to thunderous 1,000+ HP hypercars. Every vehicle is thoroughly inspected, sanitized, and ready for departure.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFleetTab('popular')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'popular'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Trending & Popular
            </button>
            <button
              onClick={() => setActiveFleetTab('supercars')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'supercars'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Exotic & Supercars
            </button>
            <button
              onClick={() => setActiveFleetTab('budget')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'budget'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Budget & Economy ($32+)
            </button>
            <button
              onClick={() => setActiveFleetTab('electric')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'electric'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Electric & Hybrid
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveFleetList().map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* View All Fleet Link Button */}
        <div className="mt-14 text-center">
          <Link
            to="/cars"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-white/10 hover:border-amber-400/50 shadow-xl transition-all group"
          >
            <span>Explore All 22 Vehicles (From $32 to $2,450/day)</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </section>


      {/* =========================================================================
          SPECTRUM BANNER: CHEAPEST TO COSTLIEST
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/10 p-8 sm:p-12 shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 inline-block">
              Complete Budget Spectrum
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              From Everyday Commuters to Ultra-Rare Hypercars
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              Whether you need a reliable <strong className="text-white">Hyundai i10 at {formatPrice(32)}/day</strong> for effortless city navigating, an executive <strong className="text-white">Mercedes E-Class</strong>, or a <strong className="text-white">Rolls-Royce Phantom at {formatPrice(2450)}/day</strong> with a starlight ceiling, <strong className="text-amber-400">Rent it</strong> delivers the exact experience tailored to your journey.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/cars?sort=price-asc"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span>View Budget Fleet (From $32)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cars?sort=price-desc"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center gap-2 transition-all"
              >
                <span>View Ultra Luxury & Supercars</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          THE RENT IT ADVANTAGE / WHY CHOOSE US
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="experience">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4" />
            <span>The Rent it Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Discerning Drivers Choose Rent it
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            We removed the friction, long lines, and surprise charges of traditional rental desks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Digital Key</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Skip rental counters and queues. Unlock your vehicle immediately upon arrival through your mobile device or receive white-glove curbside handover.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Guaranteed Pricing, Zero Traps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The rate you see is the rate you pay. No hidden airport surcharges, no mandatory mystery fees, and transparent low security holds.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Doorstep Curbside Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We stage vehicles directly outside airport baggage claims, executive aviation FBOs, 5-star hotels, or your private villa on demand.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">24/7 Human VIP Concierge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access to professional automotive coordinators. Whether extending a trip or requesting a route recommendation, our team is awake 24/7.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Comprehensive Shield Cover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full collision damage, tire, glass, and roadside emergency coverage with zero-deductible options for total peace of mind.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Pristine Hygiene Seal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every vehicle undergoes a 50-point mechanical check and multi-stage hospital-grade detail before key handover. Cleanliness guaranteed.
            </p>
          </div>

        </div>

      </section>


      {/* =========================================================================
          HOW IT WORKS (3-STEP PROGRESSION)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="how-it-works">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Zap className="w-4 h-4" />
            <span>Effortless Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Rent it Works in 3 Simple Steps
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            From browsing to ignition in less than three minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Select Your Car</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Browse our diverse fleet of 22 models. Filter by performance, fuel, brand, or price, and choose your preferred daily, weekly, or monthly plan.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Instant Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete our rapid online verification. No paperwork or long counter queues. Choose your insurance shield and optional add-ons.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Drive Away & Enjoy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive your digital key or meet your concierge at your designated pickup station. Experience the thrill of the open road with 24/7 support.
            </p>
          </div>

        </div>

      </section>


      {/* =========================================================================
          CLIENT REVIEWS / TESTIMONIALS
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="reviews">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Leaders, Travelers & Enthusiasts
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Hear from our clients who demand punctuality, discretion, and perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 flex flex-col justify-between space-y-4 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded inline-block">
                  Rented: {t.car}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          FAQ ACCORDION
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10" id="faq">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Everything you need to know about Rent it policies, insurance, and booking.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-amber-400 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          BOTTOM VIP CALL TO ACTION
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-8 sm:p-14 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950/15 text-slate-950 inline-block">
              Immediate Reservation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Take the Wheel?
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-900/90 leading-relaxed">
              Explore 22 exceptional cars with real-time availability. Confirm in 60 seconds with instant digital key access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/cars"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-black text-sm uppercase tracking-wider text-center shadow-xl transition-all"
            >
              Browse Complete Fleet
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
