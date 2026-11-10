import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  Car, 
  Grid, 
  List, 
  Heart, 
  X,
  ChevronDown
} from 'lucide-react';
import { useRental } from '../context/RentalContext';
import CarCard from '../components/CarCard';

export default function CarsListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars, formatPrice, favorites, selectedCity } = useRental();

  // Filters state initialized from URL search params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [selectedTransmission, setSelectedTransmission] = useState(searchParams.get('transmission') || 'All');
  const [selectedFuel, setSelectedFuel] = useState(searchParams.get('fuel') || 'All');
  const [maxPrice, setMaxPrice] = useState(300000); // Up to 3 Lakhs in Rupees
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'price-asc'); // default cheapest to costliest!
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showSavedOnly, setShowSavedOnly] = useState(searchParams.get('filter') === 'saved');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync when query params change
  useEffect(() => {
    if (searchParams.get('type')) setSelectedType(searchParams.get('type'));
    if (searchParams.get('sort')) setSortBy(searchParams.get('sort'));
    if (searchParams.get('filter') === 'saved') setShowSavedOnly(true);
  }, [searchParams]);

  // Unique brands & types
  const allBrands = useMemo(() => {
    return ['All', ...new Set(cars.map(c => c.brand))].sort();
  }, [cars]);

  const allTypes = ['All', 'Economy', 'Sedan', 'SUV', 'Sports', 'Luxury', 'Electric'];
  const transmissions = ['All', 'Automatic', 'Manual'];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];

  // Filter & sort logic
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Search query
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = car.name.toLowerCase().includes(q);
          const matchBrand = car.brand.toLowerCase().includes(q);
          const matchModel = car.model.toLowerCase().includes(q);
          const matchDesc = car.description.toLowerCase().includes(q);
          const matchTags = car.tags?.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchModel && !matchDesc && !matchTags) return false;
        }

        // Type filter
        if (selectedType !== 'All' && car.type !== selectedType) return false;

        // Brand filter
        if (selectedBrand !== 'All' && car.brand !== selectedBrand) return false;

        // Transmission filter
        if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) return false;

        // Fuel filter
        if (selectedFuel !== 'All' && car.fuel !== selectedFuel) return false;

        // Max price filter (Rupees)
        if (car.dailyPrice > maxPrice) return false;

        // Saved filter
        if (showSavedOnly && !favorites.includes(car.id)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.dailyPrice - b.dailyPrice; // cheapest to costliest
        if (sortBy === 'price-desc') return b.dailyPrice - a.dailyPrice; // costliest to cheapest
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [cars, searchTerm, selectedType, selectedBrand, selectedTransmission, selectedFuel, maxPrice, sortBy, showSavedOnly, favorites]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedBrand('All');
    setSelectedTransmission('All');
    setSelectedFuel('All');
    setMaxPrice(300000);
    setSortBy('price-asc');
    setShowSavedOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = 
    searchTerm || 
    selectedType !== 'All' || 
    selectedBrand !== 'All' || 
    selectedTransmission !== 'All' || 
    selectedFuel !== 'All' || 
    maxPrice < 300000 || 
    showSavedOnly;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Car className="w-4 h-4" />
              <span>India Fleet Catalog • {selectedCity} Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Explore Available Cars in India
            </h1>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                showSavedOnly
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-rose-400' : ''}`} />
              <span>Saved Cars ({favorites.length})</span>
            </button>

            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-400 max-w-2xl">
          Complete fleet sorted from cheapest city cars (<strong className="text-white">Maruti Swift at ₹1,499/day</strong>) all the way to ultra-luxury supercars (<strong className="text-white">Rolls-Royce Phantom at ₹2,65,000/day</strong>). Fastag installed and ready for delivery.
        </p>
      </div>


      {/* Search & Bar Controls */}
      <div className="glass-panel p-4 rounded-3xl mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by car, brand, model or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Quick Chips (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto">
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Selector & View Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High (Cheapest)</option>
                <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low (Costliest)</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Customer Rating</option>
                <option value="name" className="bg-slate-900 text-white">Alphabetical (A-Z)</option>
              </select>
            </div>

            <div className="flex items-center p-1 bg-slate-900 border border-white/10 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filters Summary Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5 text-xs">
            <span className="text-slate-400">Active filters:</span>
            {selectedType !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Type: {selectedType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('All')} />
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Brand: {selectedBrand}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('All')} />
              </span>
            )}
            {selectedTransmission !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Transmission: {selectedTransmission}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTransmission('All')} />
              </span>
            )}
            {selectedFuel !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Fuel: {selectedFuel}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFuel('All')} />
              </span>
            )}
            {maxPrice < 300000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Under {formatPrice(maxPrice)}/day
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(300000)} />
              </span>
            )}
            {showSavedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Saved Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setShowSavedOnly(false)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:underline font-semibold ml-auto flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}
      </div>


      {/* Main Content Layout (Sidebar Filters + Car Cards Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:block ${isMobileFiltersOpen ? 'fixed inset-0 z-50 p-6 bg-[#0b0f17] overflow-y-auto' : 'hidden'} space-y-6`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 lg:hidden">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-400" />
              <span>Filters</span>
            </h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Car Type Selector */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Vehicle Category
            </h4>
            <div className="space-y-1.5">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{type}</span>
                  <span className="text-[10px] text-slate-500">
                    {type === 'All' ? cars.length : cars.filter(c => c.type === type).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Selector */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Automaker / Brand
            </h4>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {allBrands.map((brand) => (
                <option key={brand} value={brand} className="bg-slate-900 text-white">
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider in Rupees */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Max Daily Rate
              </h4>
              <span className="text-sm font-black text-white">
                {formatPrice(maxPrice)}/day
              </span>
            </div>
            <input
              type="range"
              min="1499"
              max="300000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span>{formatPrice(1499)} (Swift)</span>
              <span>{formatPrice(265000)} (Phantom)</span>
            </div>
          </div>

          {/* Transmission */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Transmission
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {transmissions.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTransmission(t)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold text-center transition-colors ${
                    selectedTransmission === t
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel / Powertrain */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Fuel & Powertrain
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {fuelTypes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFuel(f)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                    selectedFuel === f
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Close button for mobile */}
          <div className="lg:hidden pt-4">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
            >
              Apply Filters ({filteredCars.length} Cars)
            </button>
          </div>

        </aside>

        {/* Cars Showcase Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white font-bold">{filteredCars.length}</strong> of {cars.length} cars in India
            </span>
            <span className="text-amber-400 font-semibold">
              ✓ Fastag Pre-Installed on Every Vehicle
            </span>
          </div>

          {filteredCars.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No Vehicles Match Your Selected Filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Try widening your price range, clearing brand filters, or resetting the search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
