import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Car, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Lock, 
  ArrowRight,
  User,
  Zap,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRental } from '../context/RentalContext';
import { LOCATIONS } from '../data/cars';

export default function BookingPage() {
  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    cars, 
    formatPrice, 
    searchParams, 
    addBooking,
    setIsBookingsDrawerOpen 
  } = useRental();

  // Find car by param ID or default to first featured car
  const car = cars.find((c) => c.id === id) || cars[0];

  // Booking details form state
  const [formData, setFormData] = useState({
    pickupLocation: queryParams.get('pickup') || searchParams.pickupLocation || 'blr-airport',
    dropoffLocation: queryParams.get('dropoff') || searchParams.dropoffLocation || 'blr-airport',
    pickupDate: queryParams.get('from') || searchParams.pickupDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupTime: searchParams.pickupTime || '10:00',
    returnDate: queryParams.get('to') || searchParams.returnDate || new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    returnTime: searchParams.returnTime || '10:00',
    
    // Customer Info in India
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    aadhaarNumber: '',
    isOver21: true,
    flightNumber: '',
    gstNumber: '',

    // Add-ons in INR
    shieldInsurance: true, // ₹499/day
    additionalDriver: false, // ₹299/day
    childSeat: false, // ₹199/day
    prepaidFuel: false, // ₹1,499 flat

    // Payment method
    paymentMethod: 'upi', // upi, card, netbanking
    upiId: 'name@oksbi'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Duration calculation
  const durationDays = useMemo(() => {
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [formData.pickupDate, formData.returnDate]);

  // Pricing calculations in INR (₹)
  const pricing = useMemo(() => {
    let baseRate = 0;
    let discount = 0;

    if (durationDays >= 30) {
      const months = Math.floor(durationDays / 30);
      const rem = durationDays % 30;
      baseRate = months * car.monthlyPrice + rem * car.dailyPrice;
      discount = (durationDays * car.dailyPrice) - baseRate;
    } else if (durationDays >= 7) {
      const weeks = Math.floor(durationDays / 7);
      const rem = durationDays % 7;
      baseRate = weeks * car.weeklyPrice + rem * car.dailyPrice;
      discount = (durationDays * car.dailyPrice) - baseRate;
    } else {
      baseRate = durationDays * car.dailyPrice;
    }

    const insuranceCost = formData.shieldInsurance ? durationDays * 499 : 0;
    const additionalDriverCost = formData.additionalDriver ? durationDays * 299 : 0;
    const childSeatCost = formData.childSeat ? durationDays * 199 : 0;
    const prepaidFuelCost = formData.prepaidFuel ? 1499 : 0;

    const addonsTotal = insuranceCost + additionalDriverCost + childSeatCost + prepaidFuelCost;
    const grandTotal = baseRate + addonsTotal;

    return {
      baseRate,
      discount,
      insuranceCost,
      additionalDriverCost,
      childSeatCost,
      prepaidFuelCost,
      addonsTotal,
      grandTotal
    };
  }, [durationDays, car, formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full legal name is required as per Driving License';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'A valid email address is required for digital key voucher';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number is required';
    }
    if (!formData.licenseNumber.trim()) {
      errors.licenseNumber = "Indian Driving License Number is required";
    }
    if (!formData.aadhaarNumber.trim()) {
      errors.aadhaarNumber = "Aadhaar Card or Passport number is required for digital KYC";
    }
    if (!formData.isOver21) {
      errors.isOver21 = 'You must confirm driver is 21 or older';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newBookingRecord = {
        id: `BK-IN-${Date.now().toString().slice(-6)}`,
        bookingRef: `RENT-IN-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        carId: car.id,
        carName: car.name,
        carBrand: car.brand,
        carImage: car.images[0],
        dailyPrice: car.dailyPrice,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        returnDate: formData.returnDate,
        returnTime: formData.returnTime,
        durationDays,
        totalPrice: pricing.grandTotal,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        aadhaarNumber: formData.aadhaarNumber,
        insuranceShield: formData.shieldInsurance
      };

      addBooking(newBookingRecord);
      setConfirmedBooking(newBookingRecord);
      setIsSubmitting(false);

      // Trigger Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error("Confetti trigger:", err);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const getLocationName = (locId) => {
    const loc = LOCATIONS.find(l => l.id === locId);
    return loc ? `${loc.name} (${loc.city})` : locId;
  };

  // =========================================================================
  // CONFIRMATION UI SCREEN (When booking is completed)
  // =========================================================================
  if (confirmedBooking) {
    return (
      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Celebration Banner */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <span>Reservation Confirmed & Guaranteed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            You're All Set to Drive!
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your booking confirmation and digital key voucher have been sent to <strong className="text-white">{confirmedBooking.email}</strong> and mobile SMS.
          </p>
        </div>


        {/* Printable Booking Voucher Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
          
          {/* Top Voucher Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Booking Reference</span>
              <div className="text-2xl font-mono font-black text-white mt-0.5">
                {confirmedBooking.bookingRef}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                Fastag & Trip Active
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>

          {/* Reserved Car Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <img
              src={confirmedBooking.carImage}
              alt={confirmedBooking.carName}
              className="w-full sm:w-44 aspect-[16/10] object-cover rounded-xl"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {confirmedBooking.carBrand}
              </span>
              <h3 className="text-xl font-black text-white">
                {confirmedBooking.carName}
              </h3>
              <p className="text-xs text-slate-400">
                Total Duration: <strong className="text-white">{confirmedBooking.durationDays} Days</strong> • Total Amount: <strong className="text-amber-400">{formatPrice(confirmedBooking.totalPrice)}</strong>
              </p>
            </div>

            {/* QR Code Simulation */}
            <div className="p-3 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-950 flex items-center justify-center p-1 rounded">
                <QrCode className="w-14 h-14 text-amber-400" />
              </div>
              <span className="text-[9px] font-mono text-slate-900 font-bold mt-1 uppercase">Digital Key</span>
            </div>
          </div>

          {/* Itinerary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Pickup Hub</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-white">{getLocationName(confirmedBooking.pickupLocation)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Return Hub</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-white">{getLocationName(confirmedBooking.dropoffLocation)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{confirmedBooking.returnDate} at {confirmedBooking.returnTime}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Primary Driver</span>
              <strong className="text-white">{confirmedBooking.customerName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Driving License</span>
              <strong className="text-white">{confirmedBooking.licenseNumber}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
              <strong className="text-white">{confirmedBooking.phone}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Protection Shield</span>
              <strong className="text-emerald-400">{confirmedBooking.insuranceShield ? 'Full Shield Active' : 'Standard'}</strong>
            </div>
          </div>

          {/* Action CTAs - NO STAR SYMBOL */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBookingsDrawerOpen(true)}
              className="w-full sm:flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all text-center cursor-pointer"
            >
              View In My Reservations
            </button>
            <Link
              to="/cars"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Browse Other Cars
            </Link>
          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // BOOKING CHECKOUT FORM
  // =========================================================================
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to car</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted Indian Payment Gateway</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Step 2 of 2</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Complete Your Reservation
          </h1>
        </div>
      </div>


      {/* Two Column Layout (Form on Left + Sticky Order Summary on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Sections (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Rental Station & Timing */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>1. Hub Location & Schedule</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Pickup Hub (Airports & Metro Hubs)
                </label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id} className="bg-slate-900 text-white">
                      {l.name} ({l.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Return Hub
                </label>
                <select
                  value={formData.dropoffLocation}
                  onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id} className="bg-slate-900 text-white">
                      {l.name} ({l.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Pickup Date & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={formData.pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Return Date & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={formData.returnDate}
                    min={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* Section 2: Driver & Customer Details */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <User className="w-4 h-4 text-amber-400" />
              <span>2. Primary Driver Digital KYC</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Full Name (As on Driving License) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full bg-slate-900 border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none ${formErrors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'}`}
                />
                {formErrors.fullName && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.fullName}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Mobile Number (For WhatsApp Voucher) *
                </label>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-amber-400">+91</span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                  />
                </div>
                {formErrors.phone && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.phone}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="rahul@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-slate-900 border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none ${formErrors.email ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'}`}
                />
                {formErrors.email && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.email}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Indian Driving License Number *
                </label>
                <input
                  type="text"
                  placeholder="DL-0420220123456"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className={`w-full bg-slate-900 border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none ${formErrors.licenseNumber ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'}`}
                />
                {formErrors.licenseNumber && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.licenseNumber}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Aadhaar Card / Passport No. *
                </label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX or Passport"
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  className={`w-full bg-slate-900 border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none ${formErrors.aadhaarNumber ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'}`}
                />
                {formErrors.aadhaarNumber && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.aadhaarNumber}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  GST Number (Optional for Tax Input Credit)
                </label>
                <input
                  type="text"
                  placeholder="29AAAAA0000A1Z5"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>
            </div>

            {/* Age confirmation checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isOver21}
                  onChange={(e) => setFormData({ ...formData, isOver21: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-white/20 focus:ring-amber-400 cursor-pointer"
                />
                <span className="text-xs text-slate-300">
                  I confirm the primary driver is at least 21 years of age with a valid Indian driving license.
                </span>
              </label>
              {formErrors.isOver21 && <span className="text-[10px] text-rose-400 mt-1 block">{formErrors.isOver21}</span>}
            </div>
          </div>


          {/* Section 3: Protection & Add-ons in Rupees */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>3. Full Shield Protection & Road Add-ons</span>
            </h3>

            <div className="space-y-3">
              
              {/* Full Shield Insurance */}
              <label className={`flex items-start justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                formData.shieldInsurance 
                  ? 'bg-amber-500/10 border-amber-400/40' 
                  : 'bg-slate-900/60 border-white/10'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.shieldInsurance}
                    onChange={(e) => setFormData({ ...formData, shieldInsurance: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-800 border-white/20 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Premium Comprehensive Shield (Zero Deductible)
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      Zero liability for accidental bumper scrapes, windshield stone chips, tyre punctures, and 24/7 highway towing across India.
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-400">+₹499/day</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">({formatPrice(durationDays * 499)})</span>
                </div>
              </label>

              {/* Additional Driver */}
              <label className={`flex items-center justify-between gap-4 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                formData.additionalDriver ? 'bg-amber-500/10 border-amber-400/40' : 'bg-slate-900/60 border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.additionalDriver}
                    onChange={(e) => setFormData({ ...formData, additionalDriver: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-white/20 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Additional Registered Driver</span>
                    <span className="text-[11px] text-slate-400">Share driving privileges across long highway journeys</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white">+₹299/day</span>
                </div>
              </label>

              {/* Pre-paid Fuel */}
              <label className={`flex items-center justify-between gap-4 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                formData.prepaidFuel ? 'bg-amber-500/10 border-amber-400/40' : 'bg-slate-900/60 border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.prepaidFuel}
                    onChange={(e) => setFormData({ ...formData, prepaidFuel: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-white/20 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Pre-Paid Full Tank Fuel</span>
                    <span className="text-[11px] text-slate-400">Return the car empty at the airport with zero refuel penalty</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white">+₹1,499 flat</span>
                </div>
              </label>

            </div>
          </div>


          {/* Section 4: Indian Payment Simulation */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>4. Payment & Verification</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  formData.paymentMethod === 'upi'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 border-white/10 text-slate-300'
                }`}
              >
                UPI (GPay / PhonePe)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  formData.paymentMethod === 'card'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 border-white/10 text-slate-300'
                }`}
              >
                Cards (RuPay / Visa)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  formData.paymentMethod === 'netbanking'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 border-white/10 text-slate-300'
                }`}
              >
                Net Banking
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
              {formData.paymentMethod === 'upi' ? (
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <input
                      type="text"
                      defaultValue="9876543210@paytm"
                      className="w-full bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">BHIM UPI</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Card Number (RuPay, Visa, Mastercard)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono">
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      defaultValue="5242 •••• •••• 1234"
                      className="w-full bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] text-amber-400 font-bold uppercase">RuPay</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full free cancellation permitted up to 24 hours prior to scheduled trip start.</span>
            </div>
          </div>

          {/* Submit Action - NO STAR SYMBOL */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl shadow-amber-500/25 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <span>Confirm Reservation • {formatPrice(pricing.grandTotal)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>

        </form>


        {/* Right Column: Order Summary Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 glass-panel p-6 rounded-3xl space-y-6 shadow-2xl">
            
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider pb-3 border-b border-white/10">
              Booking Itinerary & Total (₹)
            </h3>

            {/* Car Mini View */}
            <div className="flex items-center gap-4">
              <img
                src={car.images[0]}
                alt={car.name}
                className="w-24 aspect-[16/10] rounded-xl object-cover bg-slate-800"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {car.brand}
                </span>
                <h4 className="text-base font-bold text-white leading-tight">
                  {car.name}
                </h4>
                <div className="text-xs text-slate-400">
                  {formatPrice(car.dailyPrice)} <span className="text-[10px]">/day</span>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-300 text-center font-medium">
              <div>{car.transmission}</div>
              <div>{car.fuel}</div>
              <div>{car.fuelEconomy}</div>
            </div>

            {/* Location & Dates Itinerary */}
            <div className="space-y-3 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Pickup Hub</span>
                  <span className="text-white font-medium">{getLocationName(formData.pickupLocation)}</span>
                  <span className="text-slate-400 block text-[11px]">{formData.pickupDate} at {formData.pickupTime}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Return Hub</span>
                  <span className="text-white font-medium">{getLocationName(formData.dropoffLocation)}</span>
                  <span className="text-slate-400 block text-[11px]">{formData.returnDate} at {formData.returnTime}</span>
                </div>
              </div>
            </div>

            {/* Financial Breakdown in INR */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-slate-300">
                <span>Duration</span>
                <span className="font-bold text-white">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Vehicle Base Rate</span>
                <span>{formatPrice(pricing.baseRate + pricing.discount)}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Duration Discount Applied</span>
                  <span>-{formatPrice(pricing.discount)}</span>
                </div>
              )}
              {formData.shieldInsurance && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Comprehensive Protection Shield</span>
                  <span>{formatPrice(pricing.insuranceCost)}</span>
                </div>
              )}
              {formData.additionalDriver && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Additional Driver</span>
                  <span>{formatPrice(pricing.additionalDriverCost)}</span>
                </div>
              )}
              {formData.prepaidFuel && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pre-Paid Refueling</span>
                  <span>{formatPrice(1499)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-300">
                <span>Fastag Highway Toll Tag</span>
                <span className="text-emerald-400 font-bold">Pre-Activated</span>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base font-black text-white">
                <span>Total Amount (INR)</span>
                <span className="text-2xl font-black text-amber-400">
                  {formatPrice(pricing.grandTotal)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full refund guarantee if canceled up to 24h prior.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
