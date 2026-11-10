import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Star, 
  Gauge, 
  Fuel, 
  Users, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Award,
  Sparkles,
  Info,
  Car as CarIcon,
  Luggage,
  ShieldAlert,
  Sliders
} from 'lucide-react';
import { useRental } from '../context/RentalContext';
import { LOCATIONS } from '../data/cars';
import CarCard from '../components/CarCard';

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    cars, 
    formatPrice, 
    favorites, 
    toggleFavorite,
    searchParams 
  } = useRental();

  const car = cars.find((c) => c.id === id);

  // If car not found, render fallback
  if (!car) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested car could not be located in our fleet registry.</p>
        <Link 
          to="/cars" 
          className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm inline-block"
        >
          Return to Fleet
        </Link>
      </div>
    );
  }

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pricingPlan, setPricingPlan] = useState('daily'); // 'daily' | 'weekly' | 'monthly'

  // Interactive Booking Estimator state
  const [estimatorDates, setEstimatorDates] = useState({
    pickupDate: searchParams.pickupDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnDate: searchParams.returnDate || new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    pickupLocation: searchParams.pickupLocation || 'lax',
    includeShield: true
  });

  const durationDays = useMemo(() => {
    const start = new Date(estimatorDates.pickupDate);
    const end = new Date(estimatorDates.returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [estimatorDates.pickupDate, estimatorDates.returnDate]);

  const estimatedTotal = useMemo(() => {
    let base = 0;
    if (durationDays >= 30) {
      const months = Math.floor(durationDays / 30);
      const remainingDays = durationDays % 30;
      base = months * car.monthlyPrice + remainingDays * car.dailyPrice;
    } else if (durationDays >= 7) {
      const weeks = Math.floor(durationDays / 7);
      const remainingDays = durationDays % 7;
      base = weeks * car.weeklyPrice + remainingDays * car.dailyPrice;
    } else {
      base = durationDays * car.dailyPrice;
    }
    const insuranceFee = estimatorDates.includeShield ? durationDays * 29 : 0;
    return base + insuranceFee;
  }, [durationDays, car, estimatorDates.includeShield]);

  const isFav = favorites.includes(car.id);

  // Similar cars (same type or similar price)
  const similarCars = cars
    .filter((c) => c.id !== car.id && (c.type === car.type || Math.abs(c.dailyPrice - car.dailyPrice) < 200))
    .slice(0, 3);

  const handleProceedBooking = () => {
    navigate(`/booking/${car.id}?from=${estimatorDates.pickupDate}&to=${estimatorDates.returnDate}&pickup=${estimatorDates.pickupLocation}`);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/cars" className="hover:text-amber-400 transition-colors">Fleet</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to={`/cars?type=${car.type}`} className="hover:text-amber-400 transition-colors">{car.type}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-white font-semibold truncate">{car.brand} {car.name}</span>
      </div>


      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {car.brand}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
              {car.model}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for Instant Key
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {car.name}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{car.rating}</span>
              <span className="text-slate-400">({car.reviewCount} verified VIP reviews)</span>
            </div>
            <span>•</span>
            <span>Zero-deductible options available</span>
          </div>
        </div>

        {/* Favorite & Share */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(car.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
              isFav 
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400' 
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save Car'}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Car link copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>


      {/* Main Grid: Gallery & Details (Left) + Pricing Estimator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Gallery View */}
          <div className="space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group">
              <img
                src={car.images[selectedImageIndex] || car.images[0]}
                alt={`${car.name} View ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-slate-300 border border-white/10">
                Angle {selectedImageIndex + 1} of {car.images.length}
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="grid grid-cols-3 gap-3">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>


          {/* 3 Tier Pricing Cards (Daily / Weekly / Monthly) */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Transparent Pricing Tiers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Daily */}
              <div 
                onClick={() => setPricingPlan('daily')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  pricingPlan === 'daily' 
                    ? 'bg-amber-500/10 border-amber-400 shadow-md' 
                    : 'bg-slate-950/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Daily Rate</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Standard</span>
                </div>
                <div className="text-2xl font-black text-white">
                  {formatPrice(car.dailyPrice)} <span className="text-xs font-normal text-slate-400">/day</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Ideal for quick getaways and weekend experiences.
                </p>
              </div>

              {/* Weekly */}
              <div 
                onClick={() => setPricingPlan('weekly')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  pricingPlan === 'weekly' 
                    ? 'bg-amber-500/10 border-amber-400 shadow-md' 
                    : 'bg-slate-950/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Weekly Rate</span>
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-400/15 px-2 py-0.5 rounded">Save 15%</span>
                </div>
                <div className="text-2xl font-black text-white">
                  {formatPrice(car.weeklyPrice)} <span className="text-xs font-normal text-slate-400">/week</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Approx. {formatPrice(Math.round(car.weeklyPrice / 7))}/day for extended trips.
                </p>
              </div>

              {/* Monthly */}
              <div 
                onClick={() => setPricingPlan('monthly')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  pricingPlan === 'monthly' 
                    ? 'bg-amber-500/10 border-amber-400 shadow-md' 
                    : 'bg-slate-950/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Monthly Rate</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/15 px-2 py-0.5 rounded">Save 30%</span>
                </div>
                <div className="text-2xl font-black text-white">
                  {formatPrice(car.monthlyPrice)} <span className="text-xs font-normal text-slate-400">/month</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Approx. {formatPrice(Math.round(car.monthlyPrice / 30))}/day for executive long-term rentals.
                </p>
              </div>

            </div>
          </div>


          {/* Key Engineering Specifications */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Technical Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">0-60 MPH</span>
                <span className="text-lg font-black text-amber-300">{car.zeroToSixty}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Speed</span>
                <span className="text-lg font-black text-white">{car.topSpeed}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Horsepower</span>
                <span className="text-lg font-black text-white">{car.horsepower}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fuel Economy</span>
                <span className="text-lg font-black text-emerald-400">{car.fuelEconomy}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Transmission</span>
                <span className="text-base font-bold text-white">{car.transmission}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fuel / Power</span>
                <span className="text-base font-bold text-white">{car.fuel}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Passenger Seats</span>
                <span className="text-base font-bold text-white">{car.seats} Adults</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Luggage Capacity</span>
                <span className="text-base font-bold text-white">{car.luggage}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Mileage Allowance: <strong>{car.mileage}</strong></span>
            </div>
          </div>


          {/* Description & Overview */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Vehicle Overview & Heritage
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {car.description}
            </p>
          </div>


          {/* Included Features Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Key Luxury & Safety Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {car.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Complimentary VIP Inclusions */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Complimentary With Every Rent it Reservation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <strong className="text-white block mb-0.5">Free Cancellation</strong>
                <span>Full 100% refund up to 24h before pickup</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <strong className="text-white block mb-0.5">Sanitized & Detailed</strong>
                <span>Hospital grade 50-point cleanliness standard</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <strong className="text-white block mb-0.5">24/7 Road Assistance</strong>
                <span>Instant dispatch anywhere nationwide</span>
              </div>
            </div>
          </div>

        </div>


        {/* Right Column (4 cols) - Sticky Pricing & Date Estimator */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 glass-panel p-6 rounded-3xl shadow-2xl space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase text-slate-400 font-semibold block">Rental Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{formatPrice(car.dailyPrice)}</span>
                  <span className="text-xs text-slate-400">/day</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  Best Price Match
                </span>
              </div>
            </div>

            {/* Trip Configuration */}
            <div className="space-y-4">
              
              {/* Pickup Station */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Pickup / Delivery Station
                </label>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-white/10">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <select
                    value={estimatorDates.pickupLocation}
                    onChange={(e) => setEstimatorDates({ ...estimatorDates, pickupLocation: e.target.value })}
                    className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Pickup Date
                  </label>
                  <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-900 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <input
                      type="date"
                      value={estimatorDates.pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEstimatorDates({ ...estimatorDates, pickupDate: e.target.value })}
                      className="w-full bg-transparent text-white text-[11px] font-semibold focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Return Date
                  </label>
                  <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-900 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <input
                      type="date"
                      value={estimatorDates.returnDate}
                      min={estimatorDates.pickupDate}
                      onChange={(e) => setEstimatorDates({ ...estimatorDates, returnDate: e.target.value })}
                      className="w-full bg-transparent text-white text-[11px] font-semibold focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Insurance option toggle */}
              <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/90 border border-white/10 cursor-pointer hover:border-amber-400/30 transition-colors">
                <input
                  type="checkbox"
                  checked={estimatorDates.includeShield}
                  onChange={(e) => setEstimatorDates({ ...estimatorDates, includeShield: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-800 border-white/20 focus:ring-amber-400 focus:ring-offset-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">Add Premium Full Shield (+$29/day)</span>
                  <span className="text-[11px] text-slate-400">Zero deductible for collision, tires, and roadside</span>
                </div>
              </label>

            </div>

            {/* Price Breakdown Calculation */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Duration</span>
                <span className="font-bold text-white">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Base Rate</span>
                <span>{formatPrice(estimatedTotal - (estimatorDates.includeShield ? durationDays * 29 : 0))}</span>
              </div>
              {estimatorDates.includeShield && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Full Protection Shield</span>
                  <span>{formatPrice(durationDays * 29)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-300">
                <span>Taxes & Airport Surcharges</span>
                <span className="text-emerald-400 font-bold">$0 (Included)</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-black text-white">
                <span>Estimated Total</span>
                <span className="text-amber-400 text-lg">{formatPrice(estimatedTotal)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleProceedBooking}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition-all glow-btn"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="text-center text-[11px] text-slate-400">
              🔒 Instant confirmation • No charge until vehicle inspection
            </div>

          </div>
        </div>

      </div>


      {/* Similar Vehicles Showcase */}
      {similarCars.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Recommendations</span>
              <h3 className="text-2xl font-bold text-white">Similar Vehicles in Fleet</h3>
            </div>
            <Link to="/cars" className="text-xs font-semibold text-amber-400 hover:underline">
              View All 22 Cars →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map((simCar) => (
              <CarCard key={simCar.id} car={simCar} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
