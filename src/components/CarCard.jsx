import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Gauge, 
  Fuel, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { useRental } from '../context/RentalContext';

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const { formatPrice, favorites, toggleFavorite } = useRental();
  const [imageError, setImageError] = useState(false);
  const [pricingMode, setPricingMode] = useState('daily'); // 'daily' | 'weekly' | 'monthly'

  const isFav = favorites.includes(car.id);

  const getPrice = () => {
    if (pricingMode === 'weekly') return formatPrice(car.weeklyPrice);
    if (pricingMode === 'monthly') return formatPrice(car.monthlyPrice);
    return formatPrice(car.dailyPrice);
  };

  const getPriceSuffix = () => {
    if (pricingMode === 'weekly') return '/week';
    if (pricingMode === 'monthly') return '/month';
    return '/day';
  };

  return (
    <div className="group relative rounded-3xl bg-slate-900/70 border border-white/10 hover:border-amber-400/40 p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 backdrop-blur-md">
      
      {/* Top Image & Badge Container */}
      <div>
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-800/80 mb-4">
          
          {/* Main Car Photo */}
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80' : car.images[0]}
            alt={`${car.brand} ${car.name}`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none"></div>

          {/* Badges on Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 text-amber-400 border border-amber-400/30 backdrop-blur-md shadow-md">
              {car.type}
            </span>
            {car.tags && car.tags[0] && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-slate-200 backdrop-blur-md">
                {car.tags[0]}
              </span>
            )}
          </div>

          {/* Favorite Button on Top Right */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(car.id);
            }}
            title={isFav ? "Remove from saved" : "Save car"}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 backdrop-blur-md text-slate-300 hover:text-rose-400 transition-all z-10 border border-white/10"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Availability Status Ribbon */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Instant Digital Key</span>
          </div>

          {/* 0-100 / 0-60 Pill */}
          <div className="absolute bottom-3 right-3 z-10 text-[11px] font-semibold text-slate-300 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
            0-100: <span className="text-amber-400 font-bold">{car.zeroToSixty}</span>
          </div>
        </div>

        {/* Car Name & Model */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              {car.brand}
            </span>
            <Link 
              to={`/cars/${car.id}`}
              className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1"
            >
              {car.name}
            </Link>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">{car.rating}</span>
            <span className="text-[10px] text-slate-400">({car.reviewCount})</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {car.description}
        </p>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-4 text-slate-300 text-xs">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{car.seats} Seats</span>
          </div>
        </div>
      </div>

      {/* Pricing & Call to Actions */}
      <div className="pt-3 border-t border-white/10 space-y-3">
        
        {/* Pricing Mode Toggle: Day / Wk / Mo */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white tracking-tight">
              {getPrice()}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {getPriceSuffix()}
            </span>
          </div>

          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-800/80 text-[10px] font-semibold border border-white/5">
            <button
              type="button"
              onClick={() => setPricingMode('daily')}
              className={`px-2 py-0.5 rounded-md transition-colors ${pricingMode === 'daily' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('weekly')}
              className={`px-2 py-0.5 rounded-md transition-colors ${pricingMode === 'weekly' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Wk (-15%)
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('monthly')}
              className={`px-2 py-0.5 rounded-md transition-colors ${pricingMode === 'monthly' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Mo (-30%)
            </button>
          </div>
        </div>

        {/* Buttons - NO STAR SYMBOL IN BOOK NOW */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/cars/${car.id}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-white/5 transition-all text-center"
          >
            <span>Specs & Details</span>
          </Link>
          <button
            type="button"
            onClick={() => navigate(`/booking/${car.id}`)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all text-center cursor-pointer"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

      </div>

    </div>
  );
}
