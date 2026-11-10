import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  KeyRound, 
  Zap, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Clock, 
  MapPin, 
  Shield, 
  Award,
  ChevronRight,
  Plane,
  Building2,
  Compass
} from 'lucide-react';
import BookingSearchWidget from '../components/BookingSearchWidget';
import CarCard from '../components/CarCard';
import { useRental } from '../context/RentalContext';
import { TESTIMONIALS, FAQ_DATA, LOCATIONS } from '../data/cars';

export default function HomePage() {
  const { cars, formatPrice, selectedCity } = useRental();
  const [activeFleetTab, setActiveFleetTab] = useState('popular');
  const [openFaq, setOpenFaq] = useState(0);

  // Filter cars for home page showcase
  const popularCars = cars.filter(c => c.isPopular).slice(0, 6);
  const featuredSupercars = cars.filter(c => c.type === 'Sports' || c.dailyPrice > 25000).slice(0, 6);
  const budgetValueCars = cars.filter(c => c.dailyPrice <= 3500).slice(0, 6);
  const electricCars = cars.filter(c => c.type === 'Electric' || c.fuel === 'Electric').slice(0, 6);

  const getActiveFleetList = () => {
    if (activeFleetTab === 'supercars') return featuredSupercars;
    if (activeFleetTab === 'budget') return budgetValueCars;
    if (activeFleetTab === 'electric') return electricCars;
    return popularCars;
  };

  return (
    <div className="relative overflow-hidden pt-14">
      
      {/* =========================================================================
          HERO SECTION (TAILORED FOR INDIA) - FITS VIEWPORT PERFECTLY WITH 4 BOXES
         ========================================================================= */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Background Visual with Ambient Lighting */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85"
            alt="Rent it India Fleet"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.32] contrast-[1.1]"
          />
          {/* Ambient colored lighting glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle"></div>
          <div className="absolute bottom-10 left-10 w-[500px] h-[250px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/90 via-[#0b0f17]/60 to-[#0b0f17] pointer-events-none"></div>
        </div>

        {/* Hero Content: Badge, Headline, 2-line Paragraph, and 4 Stat Boxes */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 my-auto">
          
          {/* VIP Badge with Tricolor Accent */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>India's #1 Rated Car Rental & Self-Drive Fleet • Starting at ₹1,499/day</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.08]">
            Drive Across India. <br />
            <span className="gold-gradient-text">Rent it With Pure Freedom.</span>
          </h1>

          {/* Subtitle - Exactly 2 lines */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            From agile city hatchbacks in Bengaluru to rugged 4x4 Thars in Goa and Rolls-Royces in Mumbai.
            <span className="hidden sm:inline"><br /></span>
            Experience 100% digital KYC, doorstep airport delivery, and pre-activated Fastag across India.
          </p>

          {/* Quick Stats Grid - 4 Boxes Sitting Comfortably Above Bottom Viewport */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-colors shadow-lg">
              <span className="text-2xl font-black text-amber-400 block">22+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Verified Cars</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-colors shadow-lg">
              <span className="text-2xl font-black text-white block">₹1,499 – ₹2.65L</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Daily Rate Spectrum</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-colors shadow-lg">
              <span className="text-2xl font-black text-amber-400 block">12+ Metros</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">DEL, BOM, BLR, GOA</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-colors shadow-lg">
              <span className="text-2xl font-black text-white block">Fastag Ready</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Automatic Toll Pass</span>
            </div>
          </div>

          {/* Subtle Quick Scroll Prompt */}
          <div className="pt-2">
            <a
              href="#search"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('search');
                if (el) {
                  if (window.lenis) window.lenis.scrollTo(el, { offset: -90 });
                  else el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium cursor-pointer"
            >
              <span>Search & Reserve Fleet Below</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>

        </div>

      </section>


      {/* =========================================================================
          BOOKING SEARCH WIDGET (DEDICATED SECTION BELOW HERO)
         ========================================================================= */}
      <section className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="search">
        <BookingSearchWidget />
      </section>


      {/* =========================================================================
          INDIAN AIRPORT & CITY HUBS
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="hubs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Plane className="w-4 h-4" />
              <span>Doorstep Curbside Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Major Indian Airports & Luxury Hubs
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Cars staged at arrival terminals with keys ready upon landing
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {LOCATIONS.slice(0, 6).map((loc) => (
            <div
              key={loc.id}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-amber-400/30 transition-all text-left"
            >
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase mb-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{loc.city}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{loc.name.split('(')[0]}</h4>
              <span className="text-[10px] text-emerald-400 block mt-1 font-medium">✓ 24/7 Handover</span>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          FEATURED CARS FLEET SHOWCASE
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="fleet">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Car className="w-4 h-4" />
              <span>India Fleet Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured & Popular Rental Cars
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From Maruti Swift (₹1,499/day) and Thar 4x4 (₹3,499/day) to the Mercedes-AMG G-Wagon and Rolls-Royce Phantom. Fully detailed and sanitized.
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
              Trending in India
            </button>
            <button
              onClick={() => setActiveFleetTab('supercars')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'supercars'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Exotics & VIP Fleet
            </button>
            <button
              onClick={() => setActiveFleetTab('budget')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFleetTab === 'budget'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Budget City Drives (₹1,499+)
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

        {/* View All Fleet Link Button - NO STAR SYMBOL */}
        <div className="mt-14 text-center">
          <Link
            to="/cars"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-white/10 hover:border-amber-400/50 shadow-xl transition-all group"
          >
            <span>Explore All 22 Vehicles in India (₹1,499 to ₹2,65,000/day)</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </section>


      {/* =========================================================================
          SPECTRUM BANNER: CHEAPEST TO COSTLIEST IN RUPEES
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/10 p-8 sm:p-12 shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 inline-block">
              Unmatched Range in Indian Rupees
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              From Everyday Swift & Creta to Exotic Supercars
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              Whether you need a reliable <strong className="text-white">Maruti Swift at {formatPrice(1499)}/day</strong> for daily Bengaluru commutes, a <strong className="text-white">Mahindra Thar 4x4 at {formatPrice(3499)}/day</strong> for Goa beaches, an executive <strong className="text-white">Toyota Innova Hycross</strong> for family trips, or a <strong className="text-white">Rolls-Royce Phantom at {formatPrice(265000)}/day</strong> for wedding royalty, <strong className="text-amber-400">Rent it</strong> has you covered.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/cars?sort=price-asc"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Budget Cars (From ₹1,499)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cars?sort=price-desc"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center gap-2 transition-all"
              >
                <span>Luxury & Supercars</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          THE RENT IT ADVANTAGE / WHY CHOOSE US IN INDIA
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="experience">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4" />
            <span>The Rent it India Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Smooth Driving on Indian Roads
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Fastag pre-installed, high ground clearance, transparent security deposits, and 24/7 NH roadside assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Pre-Loaded Fastag Highway Tolls</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never wait in toll cash queues. All vehicles feature automated Fastag with digital itemized billing and zero convenience fee surcharges.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">All-India Tourist Permit (Yellow Plate)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drive across Karnataka, Maharashtra, Goa, Delhi NCR, Tamil Nadu, and Telangana with valid national permits and zero border harassment.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Curbside Airport Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We hand over cars directly at airport arrival pickup lanes (DEL T3, BOM T2, BLR, HYD, GOA Mopa) or your 5-star hotel lobby.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant UPI Deposit Refund</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Security deposits are settled directly back into your Bank account or UPI handle within 2 to 4 hours of vehicle return. Zero deposit drama.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Full Comprehensive Shield Cover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero deductible protection covering accidental bumper damage, tires, windshield cracks, and 24/7 highway towing across India.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-amber-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">60-Second Digital KYC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your Indian Driving License and Aadhaar / Passport. Get verified instantly online without paper physical forms.
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
            <span>Fast & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Rent it Works in 3 Simple Steps
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            From booking to ignition in under 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Pick Vehicle & Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose from 22 verified cars. Select your city (Bengaluru, Mumbai, Delhi, Goa, etc.) and preferred pickup hub or doorstep delivery.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Digital KYC & Protection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify your Driving License & Aadhaar in 60 seconds. Add our Full Shield Protection for zero liability peace of mind.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Unlock & Hit the Highway</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive your digital key or meet your concierge curbside. Drive with active Fastag and 24/7 nationwide roadside assistance.
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
            Trusted by Leaders, Travelers & Creators Across India
          </h2>
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
            Everything you need to know about Fastag, interstate travel, permits, and deposits.
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
          BOTTOM VIP CALL TO ACTION - NO STAR SYMBOL
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-8 sm:p-14 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950/15 text-slate-950 inline-block">
              PAN-India Availability
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Take the Wheel?
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-900/90 leading-relaxed">
              Explore 22 exceptional cars across Bengaluru, Mumbai, Delhi, Hyderabad, and Goa. Instant confirmation in 60 seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/cars"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-black text-sm uppercase tracking-wider text-center shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Browse All 22 Cars</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
