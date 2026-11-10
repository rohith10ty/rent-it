import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Search, 
  ArrowRightLeft, 
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { LOCATIONS } from '../data/cars';
import { useRental } from '../context/RentalContext';

export default function BookingSearchWidget({ className = "" }) {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useRental();
  
  const [activeTab, setActiveTab] = useState('rental'); // rental, delivery, interstate
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [localState, setLocalState] = useState({
    pickupLocation: searchParams.pickupLocation || 'blr-airport',
    dropoffLocation: searchParams.dropoffLocation || 'blr-airport',
    pickupDate: searchParams.pickupDate,
    pickupTime: searchParams.pickupTime || '10:00',
    returnDate: searchParams.returnDate,
    returnTime: searchParams.returnTime || '10:00',
    category: 'All'
  });

  const categories = ['All', 'SUV', 'Sedan', 'Economy', 'Luxury', 'Sports', 'Electric'];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(localState);
    const query = new URLSearchParams();
    if (localState.category !== 'All') query.set('type', localState.category);
    query.set('pickup', localState.pickupLocation);
    query.set('dropoff', differentDropoff ? localState.dropoffLocation : localState.pickupLocation);
    query.set('from', localState.pickupDate);
    query.set('to', localState.returnDate);
    
    navigate(`/cars?${query.toString()}`);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto rounded-3xl glass-panel p-4 sm:p-6 lg:p-7 shadow-2xl relative z-20 ${className}`}>
      
      {/* Service Modes Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('rental')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'rental' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Self-Drive Fleet
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'delivery' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Airport & Doorstep Delivery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interstate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'interstate' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Interstate Highway Permits
          </button>
        </div>

        {/* Different drop-off station toggle */}
        <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
          <input
            type="checkbox"
            checked={differentDropoff}
            onChange={(e) => setDifferentDropoff(e.target.checked)}
            className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-white/20 focus:ring-amber-400 focus:ring-offset-0 cursor-pointer"
          />
          <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
          <span>Different drop-off hub</span>
        </label>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Pickup Location */}
          <div className="relative p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 focus-within:border-amber-400 transition-colors">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Pickup Station (Airports & Hubs)
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={localState.pickupLocation}
                onChange={(e) => setLocalState({ ...localState, pickupLocation: e.target.value })}
                className="w-full bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer truncate"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                    {loc.name} ({loc.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dropoff Location (Conditional or Same) */}
          <div className="relative p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 focus-within:border-amber-400 transition-colors">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              {differentDropoff ? 'Drop-off Station' : 'Drop-off Station'}
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              {differentDropoff ? (
                <select
                  value={localState.dropoffLocation}
                  onChange={(e) => setLocalState({ ...localState, dropoffLocation: e.target.value })}
                  className="w-full bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer truncate"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                      {loc.name} ({loc.city})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-xs font-semibold text-slate-300 truncate">
                  Same as pickup station
                </div>
              )}
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="relative p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 focus-within:border-amber-400 transition-colors">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Pickup Date & Time
            </span>
            <div className="grid grid-cols-5 gap-1.5 items-center">
              <div className="col-span-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={localState.pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setLocalState({ ...localState, pickupDate: e.target.value })}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                />
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="time"
                  value={localState.pickupTime}
                  onChange={(e) => setLocalState({ ...localState, pickupTime: e.target.value })}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="relative p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 focus-within:border-amber-400 transition-colors">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Return Date & Time
            </span>
            <div className="grid grid-cols-5 gap-1.5 items-center">
              <div className="col-span-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={localState.returnDate}
                  min={localState.pickupDate}
                  onChange={(e) => setLocalState({ ...localState, returnDate: e.target.value })}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                />
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="time"
                  value={localState.returnTime}
                  onChange={(e) => setLocalState({ ...localState, returnTime: e.target.value })}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Quick Category Pills and Search Action - NO STAR SYMBOL */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Quick Category selection */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1 shrink-0">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setLocalState({ ...localState, category: cat })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  localState.category === cat
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search CTA - NO STAR SYMBOL */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Fleet in India</span>
          </button>
        </div>

      </form>

      {/* Trust Mini Banner */}
      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active Fastag installed • All-India Tourist Commercial Permits</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-300">
            <Check className="w-3.5 h-3.5 text-amber-400" /> 22 Verified Vehicles Ready
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <Check className="w-3.5 h-3.5 text-amber-400" /> Instant Digital Key
          </span>
        </div>
      </div>

    </div>
  );
}
