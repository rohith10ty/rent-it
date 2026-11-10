import React, { createContext, useContext, useState, useEffect } from 'react';
import { CARS_DATA } from '../data/cars';

const RentalContext = createContext();

export function RentalProvider({ children }) {
  // Search parameters state (from Hero or Search widgets)
  const [searchParams, setSearchParams] = useState({
    pickupLocation: 'blr-airport',
    dropoffLocation: 'blr-airport',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    pickupTime: '10:00',
    returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], // 3 days later
    returnTime: '10:00',
    category: 'All'
  });

  // Selected City in India
  const [selectedCity, setSelectedCity] = useState('Bengaluru');

  // Format Price in Indian Rupees (INR ₹)
  const formatPrice = (amount) => {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Saved / Favorited Cars
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rent_it_in_favorites');
      return saved ? JSON.parse(saved) : ['mahindra-thar', 'toyota-fortuner', 'rolls-royce-phantom'];
    } catch {
      return ['mahindra-thar', 'toyota-fortuner', 'rolls-royce-phantom'];
    }
  });

  useEffect(() => {
    localStorage.setItem('rent_it_in_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  // User Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('rent_it_in_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rent_it_in_bookings', JSON.stringify(bookings));
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
      selectedCity,
      setSelectedCity,
      formatPrice,
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
