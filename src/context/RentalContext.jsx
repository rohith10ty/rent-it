import React, { createContext, useContext, useState, useEffect } from 'react';
import { CARS_DATA } from '../data/cars';

const RentalContext = createContext();

export function RentalProvider({ children }) {
  // Search parameters state (from Hero or Search widgets)
  const [searchParams, setSearchParams] = useState({
    pickupLocation: 'lax',
    dropoffLocation: 'lax',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    pickupTime: '10:00',
    returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], // 3 days later
    returnTime: '10:00',
    category: 'All'
  });

  // Currency selection: USD, EUR, GBP
  const [currency, setCurrency] = useState('USD');
  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 }
  };

  const formatPrice = (usdAmount) => {
    const { symbol, rate } = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(usdAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  // Saved / Favorited Cars
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rent_it_favorites');
      return saved ? JSON.parse(saved) : ['rolls-royce-phantom', 'porsche-911-gt3-rs'];
    } catch {
      return ['rolls-royce-phantom', 'porsche-911-gt3-rs'];
    }
  });

  useEffect(() => {
    localStorage.setItem('rent_it_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  // User Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('rent_it_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rent_it_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  // My Bookings drawer / modal visibility
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);

  return (
    <RentalContext.Provider value={{
      cars: CARS_DATA,
      searchParams,
      setSearchParams,
      currency,
      setCurrency,
      formatPrice,
      currencyRates,
      favorites,
      toggleFavorite,
      bookings,
      addBooking,
      cancelBooking,
      isBookingsDrawerOpen,
      setIsBookingsDrawerOpen
    }}>
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
}
