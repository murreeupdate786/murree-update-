import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { EmergencyModal } from './components/EmergencyModal';
import { HomeView } from './views/HomeView';
import { WeatherView } from './views/WeatherView';
import { TrafficView } from './views/TrafficView';
import { HotelsView } from './views/HotelsView';
import { HotelDetailView } from './views/HotelDetailView';
import { BookingView } from './views/BookingView';
import { RentACarView } from './views/RentACarView';
import { PlacesView } from './views/PlacesView';
import { NewsView } from './views/NewsView';
import { DashboardView } from './views/DashboardView';
import { AdminView } from './views/AdminView';
import { Hotel, RoomOption, Booking } from './lib/types';
import { Compass, PhoneCall, ShieldCheck, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingItem, setBookingItem] = useState<{
    type: 'HOTEL' | 'CAR' | 'TOUR';
    title: string;
    price: number;
    id: string;
  } | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Scroll to top on navigation
  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHotelDetail = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setActiveTab('hotel-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookRoom = (hotel: Hotel, room: RoomOption) => {
    setBookingItem({
      type: 'HOTEL',
      title: `${hotel.name} - ${room.type}`,
      price: room.price,
      id: hotel.id
    });
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (item: {
    type: 'HOTEL' | 'CAR' | 'TOUR';
    title: string;
    price: number;
    id: string;
  }) => {
    setBookingItem(item);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (_newBooking: Booking) => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleSelectTab}
            onSelectHotel={handleOpenHotelDetail}
            onStartBooking={handleStartBooking}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'weather' && <WeatherView />}

        {activeTab === 'traffic' && (
          <TrafficView onOpenEmergency={() => setIsEmergencyOpen(true)} />
        )}

        {activeTab === 'hotels' && (
          <HotelsView
            onSelectHotel={handleOpenHotelDetail}
            onBookNow={(hotel) =>
              handleStartBooking({
                type: 'HOTEL',
                title: `${hotel.name} - ${hotel.rooms[0]?.type || 'Standard Room'}`,
                price: hotel.pricePerNight,
                id: hotel.id
              })
            }
          />
        )}

        {activeTab === 'hotel-detail' && selectedHotel && (
          <HotelDetailView
            hotel={selectedHotel}
            onBack={() => handleSelectTab('hotels')}
            onBookRoom={handleBookRoom}
          />
        )}

        {activeTab === 'booking' && (
          <BookingView
            initialItem={bookingItem || undefined}
            onSuccess={handleBookingSuccess}
            onCancel={() => handleSelectTab('hotels')}
          />
        )}

        {activeTab === 'rent-a-car' && (
          <RentACarView onStartBooking={handleStartBooking} />
        )}

        {activeTab === 'places' && <PlacesView />}

        {activeTab === 'news' && <NewsView />}

        {activeTab === 'dashboard' && (
          <DashboardView onNavigate={handleSelectTab} />
        )}

        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Emergency Helplines Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Quiet, Well-Crafted Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4 text-emerald-100" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">Murree Update</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                The premier travel intelligence and road advisory portal for Murree, Patriata, Bhurban, and Galyat.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Mall Road, Murree Hills, Punjab, Pakistan</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                Quick Navigation
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleSelectTab('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Travel Guide & Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('weather')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Live Weather & Snow Forecast
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('traffic')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Expressway Road & Traffic Map
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('hotels')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Verified Hotel Listings
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                Services & Sightseeing
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleSelectTab('rent-a-car')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    4x4 Rent-a-Car & Drivers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('places')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Top Sightseeing Attractions
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('news')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Official Travel Advisories
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('dashboard')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    My Itinerary & Bookings
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                24/7 Emergency Helplines
              </span>
              <ul className="space-y-2 font-mono text-[11px] text-slate-300">
                <li className="flex justify-between items-center">
                  <span>Traffic Police:</span>
                  <a href="tel:0519269200" className="hover:text-emerald-400 font-bold">051-9269200</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>Tourism Helpline:</span>
                  <a href="tel:1422" className="hover:text-emerald-400 font-bold">1422</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>Rescue 1122 Murree:</span>
                  <a href="tel:1122" className="hover:text-emerald-400 font-bold">1122</a>
                </li>
                <li className="flex justify-between items-center">
                  <span>Motorway Police M-75:</span>
                  <a href="tel:130" className="hover:text-emerald-400 font-bold">130</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              © {new Date().getFullYear()} Murree Update. Dedicated to safe and pleasant travels in the Himalayas.
            </div>
            <div className="flex items-center gap-4">
              <span>National Highway Authority (NHA) Verified</span>
              <span>·</span>
              <span>PDMA Punjab Active Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
