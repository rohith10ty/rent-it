import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RentalProvider } from './context/RentalContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingsDrawer from './components/BookingsDrawer';
import HomePage from './pages/HomePage';
import CarsListingPage from './pages/CarsListingPage';
import CarDetailsPage from './pages/CarDetailsPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <Router>
      <RentalProvider>
        <SmoothScroll>
          <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-['Outfit']">
            <Navbar />
            <BookingsDrawer />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cars" element={<CarsListingPage />} />
                <Route path="/cars/:id" element={<CarDetailsPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </SmoothScroll>
      </RentalProvider>
    </Router>
  );
}
