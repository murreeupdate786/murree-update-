import React, { useState, useMemo } from 'react';
import { db } from '../lib/db';
import { Hotel } from '../lib/types';
import { HotelCard } from '../components/HotelCard';
import { Bed, Search, Filter, SlidersHorizontal, MapPin, Sparkles } from 'lucide-react';

interface HotelsViewProps {
  onSelectHotel: (hotel: Hotel) => void;
  onBookNow: (hotel: Hotel) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({ onSelectHotel, onBookNow }) => {
  const allHotels = useMemo(() => db.getHotels(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  const locations = ['All', 'Mall Road', 'Bhurban', 'Lower Topa', 'Ghora Gali'];
  const amenitiesList = ['All', 'Central Heating', 'Mountain View', 'Generator Backup', 'Free WiFi', 'Valet Parking'];

  const filteredHotels = useMemo(() => {
    return allHotels
      .filter((h) => {
        const matchesQuery =
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLoc = selectedLocation === 'All' || h.location.toLowerCase().includes(selectedLocation.toLowerCase());
        const matchesPrice = h.pricePerNight <= maxPrice;
        const matchesAmenity =
          selectedAmenity === 'All' ||
          h.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()));
        return matchesQuery && matchesLoc && matchesPrice && matchesAmenity;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        return 0;
      });
  }, [allHotels, searchQuery, selectedLocation, maxPrice, selectedAmenity, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Bed className="w-4 h-4" />
          <span>Verified Accommodations</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Hotels & Mountain Resorts in Murree
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Book verified hotels with guaranteed heating, 24/7 backup power, and breathtaking Himalayan views.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Search Input & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel name or location..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
            <span className="text-slate-500 font-medium shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="rating">Top Rated First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Location Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">Location:</span>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedLocation === loc
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Amenities & Price Slider */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="font-semibold text-slate-500 shrink-0">Amenity:</span>
            {amenitiesList.map((am) => (
              <button
                key={am}
                onClick={() => setSelectedAmenity(am)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedAmenity === am
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-50'
                }`}
              >
                {am}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">Max Nightly Rate:</span>
            <span className="font-mono font-bold text-slate-900">PKR {maxPrice.toLocaleString()}</span>
            <input
              type="range"
              min="10000"
              max="80000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-emerald-600 cursor-pointer w-24 sm:w-32"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong className="text-slate-900">{filteredHotels.length}</strong> verified properties</span>
        <span>Best price guarantee · No cancellation fees on select rooms</span>
      </div>

      {/* Hotels Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((h) => (
            <HotelCard
              key={h.id}
              hotel={h}
              onSelect={onSelectHotel}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Bed className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No hotels matched your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try increasing your budget range or selecting "All Locations".</p>
          <button
            onClick={() => {
              setSelectedLocation('All');
              setSelectedAmenity('All');
              setMaxPrice(80000);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
