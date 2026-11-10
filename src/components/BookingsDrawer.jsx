import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  CalendarCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Car,
  Printer
} from 'lucide-react';
import { useRental } from '../context/RentalContext';
import { LOCATIONS } from '../data/cars';

export default function BookingsDrawer() {
  const { 
    bookings, 
    cancelBooking, 
    isBookingsDrawerOpen, 
    setIsBookingsDrawerOpen,
    formatPrice 
  } = useRental();

  if (!isBookingsDrawerOpen) return null;

  const getLocationName = (id) => {
    const found = LOCATIONS.find(l => l.id === id);
    return found ? found.name : id;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsBookingsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1420] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Reservations</h3>
                <p className="text-xs text-slate-400">Manage confirmed bookings & digital keys</p>
              </div>
            </div>
            <button
              onClick={() => setIsBookingsDrawerOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="my-4 flex-1 overflow-y-auto space-y-4 pr-1">
            {bookings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-4 text-slate-500">
                  <Car className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">No Reservations Found</h4>
                <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                  You haven't reserved any vehicles yet. Explore our fleet of 22 cars ranging from budget daily drivers to exotic hypercars.
                </p>
                <Link
                  to="/cars"
                  onClick={() => setIsBookingsDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                >
                  Explore Fleet
                </Link>
              </div>
            ) : (
              bookings.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 relative space-y-3"
                >
                  {/* Top Bar with Status & Booking Code */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      ID: {item.bookingRef || item.id}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Confirmed
                    </span>
                  </div>

                  {/* Car Details Mini Card */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.carImage || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80'} 
                      alt={item.carName}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-800 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {item.carBrand}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.carName}
                      </h4>
                      <p className="text-xs font-semibold text-amber-400">
                        {formatPrice(item.totalPrice)} • {item.durationDays} Days
                      </p>
                    </div>
                  </div>

                  {/* Trip details */}
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Pickup: {getLocationName(item.pickupLocation)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.pickupDate} ({item.pickupTime}) → {item.returnDate} ({item.returnTime})</span>
                    </div>
                  </div>

                  {/* Customer summary */}
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Driver: {item.customerName}</span>
                    <span className="text-slate-300">{item.phone}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Print Voucher</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to cancel this reservation?")) {
                          cancelBooking(item.id);
                        }
                      }}
                      className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Drawer */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link
              to="/cars"
              onClick={() => setIsBookingsDrawerOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Book Another Vehicle</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
