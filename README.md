# Rent it — Premium Car Rental Booking Platform 🏎️✨

A high-performance, modern car rental booking web application developed with **React.js**, **Vite**, **Tailwind CSS**, and **Lenis Smooth Scroll**. Designed with an ultra-sleek, luxury dark aesthetic using the **Outfit** typography and modern glassmorphism.

---

## 🌟 Key Features

### 1. 🏠 Home Page
- **Cinematic Hero Section**: High-impact visuals, dynamic metrics counter, and VIP credentials badge.
- **Interactive Booking Search Bar**:
  - Pickup station & drop-off station selector (with different return station toggle).
  - Date and time pickers with minimum validation.
  - Quick vehicle category selector (Sports, Luxury, SUV, Electric, Economy).
  - Service modes: Self-Drive, Doorstep VIP Delivery, and Airport Chauffeur.
- **Featured & Popular Fleet**: Dynamic tabs for trending cars, exotic supercars, budget city cruisers, and electric powertrains.
- **Spectrum Showcase**: Highlighting the complete spectrum from **$32/day (Hyundai i10)** to **$2,450/day (Rolls-Royce Phantom)**.
- **The Rent it Standard**: Highlighting Instant Digital Keys, Zero Hidden Fees, Doorstep Delivery, and 24/7 VIP Concierge.
- **How It Works**: 3-step interactive progression (Browse & Select ➔ Instant Verification ➔ Unlock & Drive).
- **VIP Customer Testimonials & Reviews**: Verified client reviews and ratings.
- **Interactive FAQ Accordion**: Comprehensive policy answers.

### 2. 🚘 Fleet & Cars Listing Page (`/cars`)
- **22 Curated Vehicles**: Spanning from cheapest economy to the world's most exotic hypercars.
- **Multi-parameter Filtering**:
  - Filter by Vehicle Type (Economy, Sedan, SUV, Sports, Luxury, Electric)
  - Filter by Brand (Ferrari, Lamborghini, Rolls-Royce, Porsche, BMW, Mercedes, Tesla, Toyota, Hyundai, etc.)
  - Filter by Transmission (Automatic vs Manual)
  - Filter by Fuel (Petrol, Hybrid, Electric)
  - Price Range Slider (Live min/max control)
- **Live Search**: Instant keyword matching across car names, brands, models, and tags.
- **Sorting**:
  - Price: Low to High (Cheapest first)
  - Price: High to Low (Costliest first)
  - Highest Customer Rating
  - Alphabetical (A-Z)
- **Favorites / Saved Filter**: View saved cars in one click.
- **View Modes**: Grid view and List view toggles.

### 3. 🔍 Car Details Page (`/cars/:id`)
- **Interactive Image Gallery**: Main hero display with thumbnail carousel and angle indicators.
- **Engineering Specifications Grid**: 0-60 MPH acceleration, Top Speed, Horsepower, Fuel Economy, Transmission, Passenger Capacity, and Luggage Capacity.
- **3-Tier Transparent Pricing**:
  - Daily Rate
  - Weekly Rate (Save 15%)
  - Monthly Rate (Save 30%)
- **Live Interactive Trip Estimator**: Real-time duration calculation, protection shield toggle, and price breakdown.
- **Luxury Features Checklist**: Apple CarPlay, 360 Camera, Panoramic Roof, etc.
- **Similar Fleet Recommendations**: Curated recommendations based on vehicle category.

### 4. 📝 Booking & Checkout Flow (`/booking/:id`)
- **Rental Station & Schedule Logistics**
- **Primary Driver Form with Validation**: Full name, email, phone, age verification (21+), driver's license number, and flight number.
- **Protection & Travel Add-ons**:
  - Premium Full Shield Insurance ($29/day, zero deductible)
  - Additional Driver ($15/day)
  - Child Safety Seat ($10/day)
  - Pre-paid Full Fuel Refill ($45 flat)
- **Dynamic Cost Breakdown**: Live real-time subtotal, duration discount, add-ons calculation, and waived fees.
- **Booking Confirmation Experience**:
  - Interactive celebration fireworks with `canvas-confetti`.
  - Confirmation voucher with unique **Booking Reference ID** (e.g. `RENT-849204`).
  - Digital Key QR code simulation for instant mobile key handover.
  - Printable reservation voucher.
  - Automatic persistence to `localStorage` accessible via the **My Trips** slide-over drawer anytime.

### 5. 💎 VIP Extras
- **Lenis Smooth Scrolling**: Ultra-fluid inertia scroll across the entire application with hidden scrollbars for a distraction-free experience.
- **Global Currency Switcher**: Live conversion between **USD ($)**, **EUR (€)**, and **GBP (£)**.
- **Favorites & Saved Fleet**: Heart button to bookmark cars across sessions.

---

## 🛠️ Technology Stack

- **Framework**: React.js 19
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti & CSS keyframes
- **Typography**: Google Fonts (Outfit)
- **Routing**: React Router DOM v7

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone <your-repo-url>
cd "car rental website"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the site.

---

## 📦 Production Deployment

### Option A: Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

*(Note: `vercel.json` is already configured in the root to handle client-side routing rewrites).*

### Option B: Netlify
1. Push your repository to GitHub.
2. Go to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Click **Deploy Site**.

*(Note: `public/_redirects` is already included to ensure proper single-page application routing).*
