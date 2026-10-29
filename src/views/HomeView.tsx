import React, { useState } from 'react';
import { NavTab } from '../components/Navbar';
import { WeatherCard } from '../components/WeatherCard';
import { HotelCard } from '../components/HotelCard';
import { IMAGES, db } from '../lib/db';
import { Hotel, TouristSpot } from '../lib/types';
import { Compass, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Snowflake, Car, Mountain, Bed, Sparkles, MapPin, Phone } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onStartBooking: (item: { type: 'HOTEL' | 'CAR' | 'TOUR'; title: string; price: number; id: string }) => void;
  onOpenEmergency: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectHotel,
  onStartBooking,
  onOpenEmergency,
}) => {
  const hotels = db.getHotels().slice(0, 3);
  const places = db.getPlaces().slice(0, 4);
  const roads = db.getRoads();
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-slate-800">
        <div className="absolute inset-0 z-0">
          {!heroImgError ? (
            <img
              src={IMAGES.hero}
              alt="Murree pine covered scenic hills and expressway"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className="w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3.5 py-1.5 rounded-full mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>Official Murree & Galyat Travel & Advisory Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
            Real-Time Road Status, Weather & Travel Guide for Murree
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Live M-75 expressway condition alerts, authentic mountain weather telemetry, verified hotel accommodations, and reliable 4x4 rent-a-car bookings.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('traffic')}
              className="px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Car className="w-4 h-4 text-slate-950" />
              <span>Check Live Road Status</span>
            </button>

            <button
              onClick={() => onNavigate('hotels')}
              className="px-6 py-3 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-750 border border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bed className="w-4 h-4 text-emerald-300" />
              <span>Explore Verified Hotels</span>
            </button>

            <button
              onClick={onOpenEmergency}
              className="px-5 py-3 text-sm font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Emergency 1422</span>
            </button>
          </div>
        </div>

        {/* Tabular KPI Strip below hero content */}
        <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-2">
              <span className="text-[11px] text-slate-400 block">Expressway M-75</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clear & Open
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Islamabad: 45 mins</span>
            </div>

            <div className="p-2">
              <span className="text-[11px] text-slate-400 block">Murree Altitude Temp</span>
              <span className="text-sm font-bold text-white font-mono tabular-nums mt-0.5">
                8°C · Crisp Mountain Air
              </span>
              <span className="text-[11px] text-slate-400">Elevation: 2,291m</span>
            </div>

            <div className="p-2">
              <span className="text-[11px] text-slate-400 block">Galyat High Passes</span>
              <span className="text-sm font-bold text-sky-400 flex items-center gap-1.5 mt-0.5">
                <Snowflake className="w-3.5 h-3.5" /> Snow Chains Advised
              </span>
              <span className="text-[11px] text-slate-400">Past Barian Checkpoint</span>
            </div>

            <div className="p-2">
              <span className="text-[11px] text-slate-400 block">Mall Road Parking Plaza</span>
              <span className="text-sm font-bold text-white font-mono tabular-nums mt-0.5">
                320 Spaces Open
              </span>
              <span className="text-[11px] text-emerald-400">Free Shuttle Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Live Weather Station Component */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                01. Live Mountain Weather & Snowfall Forecast
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Real-time atmospheric telemetry and 7-day outlook directly from Murree summit
              </p>
            </div>
            <button
              onClick={() => onNavigate('weather')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Full Meteorological Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <WeatherCard />
        </section>

        {/* Section 2: Road & Traffic Live Digest */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                02. Live Road & Traffic Conditions
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Official road status monitored by City Traffic Police Murree and Highway Patrol
              </p>
            </div>
            <button
              onClick={() => onNavigate('traffic')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Open Interactive Route Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roads.slice(0, 3).map((r) => (
              <div
                key={r.id}
                onClick={() => onNavigate('traffic')}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{r.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      r.status === 'CLEAR'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : r.status === 'SNOW_CHAINS_REQUIRED'
                        ? 'bg-sky-50 text-sky-800 border border-sky-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {r.status === 'CLEAR' ? 'Clear' : r.status === 'SNOW_CHAINS_REQUIRED' ? 'Chains Req.' : 'Moderate'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{r.section}</p>
                <p className="text-xs text-slate-700 mt-2 bg-slate-50 p-2 rounded-lg leading-relaxed">{r.advisory}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{r.distanceKm} km · {r.travelTimeMins} mins</span>
                  <span>{r.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Featured Hotels */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                03. Verified Mountain Resorts & Hotels
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Central heating, reliable 24/7 electricity backup, and breathtaking pine valley views
              </p>
            </div>
            <button
              onClick={() => onNavigate('hotels')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View All 15+ Hotels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((h) => (
              <HotelCard
                key={h.id}
                hotel={h}
                onSelect={onSelectHotel}
                onBookNow={(hotel) =>
                  onStartBooking({
                    type: 'HOTEL',
                    title: `${hotel.name} - ${hotel.rooms[0]?.type || 'Standard Room'}`,
                    price: hotel.pricePerNight,
                    id: hotel.id
                  })
                }
              />
            ))}
          </div>
        </section>

        {/* Section 4: Top Places to Visit */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                04. Top Attractions & Sightseeing in Murree
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Historic colonial promenade, soaring cable cars, and pristine pine forest tracks
              </p>
            </div>
            <button
              onClick={() => onNavigate('places')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => onNavigate('places')}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
                    {place.altitude}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-medium text-emerald-700">{place.entryFee}</span>
                    <span>{place.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Mountain Safety Checklist & Preparation */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
              Visitor Advisory Notice
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Essential Murree Winter & Monsoon Driving Guide
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              District administration urges all motorists to check their vehicles before leaving Islamabad or Rawalpindi to ensure safety on mountain inclines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Fuel & Anti-Freeze</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always maintain at least 60% fuel in your tank. Sub-zero mountain nights require engine coolant with anti-freeze to prevent radiator freezing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-700 text-sky-400 flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Tire Chains & 4x4</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traffic Police restricts 2WD cars past Barian during snowfall. Carry metallic tire chains; local technicians install them at Sunny Bank for PKR 500.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-700 text-rose-400 flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Safe Heating & Ventilation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Never keep car heaters running continuously while parked in snow drifts. Always keep windows slightly cracked to prevent carbon monoxide buildup.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs text-slate-400 block">Murree Traffic Police Emergency Hotline</span>
                <span className="text-sm font-mono font-bold text-white">051-9269200 / Helpline 1422</span>
              </div>
            </div>

            <button
              onClick={onOpenEmergency}
              className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Open Complete Directory
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
