import React, { useState } from 'react';
import { db } from '../lib/db';
import { CarRental, TourPackage } from '../lib/types';
import { Car, Users, Gauge, Check, ShieldCheck, MapPin, Calendar, Compass, Sparkles } from 'lucide-react';

interface RentACarViewProps {
  onStartBooking: (item: { type: 'HOTEL' | 'CAR' | 'TOUR'; title: string; price: number; id: string }) => void;
}

export const RentACarView: React.FC<RentACarViewProps> = ({ onStartBooking }) => {
  const [activeTab, setActiveTab] = useState<'cars' | 'tours'>('cars');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const cars = db.getCars();
  const tours = db.getTours();

  const categories = ['All', '4x4 SUV', 'Sedan', 'Van & Hiace', 'Compact'];

  const filteredCars = cars.filter(
    (c) => categoryFilter === 'All' || c.category === categoryFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <Car className="w-4 h-4" />
            <span>Transport & Guided Day Trips</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Murree Rent-a-Car & Guided Mountain Tours
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            4x4 Land Cruisers, family sedans, and group Hiace vans with licensed mountain drivers skilled on Murree hairpin bends and snow-covered passes.
          </p>
        </div>

        {/* Tab switch between Cars and Day Tours */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cars' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rent a Car Fleet ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'tours' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day Tours ({tours.length})
          </button>
        </div>
      </div>

      {activeTab === 'cars' ? (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">Vehicle Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/9 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={car.image}
                      alt={car.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded font-medium">
                      {car.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-base text-slate-900">{car.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
                      <span>{car.seating} Seats</span>
                      <span>·</span>
                      <span>{car.transmission}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">{car.isWithDriver ? 'With Chauffeur' : 'Self-Drive'}</span>
                    </div>

                    <div className="space-y-1.5 mt-4 pt-3 border-t border-slate-100">
                      {car.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Daily Rental</span>
                      <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums leading-none">
                        PKR {car.dailyRate.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500 font-sans"> / day</span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onStartBooking({
                          type: 'CAR',
                          title: car.title,
                          price: car.dailyRate,
                          id: car.id
                        })
                      }
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Book Vehicle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tours List */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded font-mono">
                    {tour.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-slate-900">{tour.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Pickup: {tour.pickupPoint}</p>

                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-4 mb-2">
                    Tour Highlights
                  </h4>
                  <div className="space-y-1.5">
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Package Price</span>
                    <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums leading-none">
                      PKR {tour.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onStartBooking({
                        type: 'TOUR',
                        title: tour.title,
                        price: tour.price,
                        id: tour.id
                      })
                    }
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Reserve Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
