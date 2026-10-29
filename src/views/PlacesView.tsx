import React, { useState } from 'react';
import { db } from '../lib/db';
import { TouristSpot } from '../lib/types';
import { MapPin, Compass, Mountain, Clock, Ticket, Check, Sparkles, Navigation } from 'lucide-react';

export const PlacesView: React.FC = () => {
  const places = db.getPlaces();
  const [selectedPlace, setSelectedPlace] = useState<TouristSpot | null>(places[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Attractions & Sightseeing Guide</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Must-Visit Places in Murree & Galyat
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          From the vibrant heritage of Mall Road to soaring cable cars over Patriata pine canopies and quiet treks along colonial pipeline routes.
        </p>
      </div>

      {/* Featured Spotlight Card */}
      {selectedPlace && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-16/9 lg:aspect-auto h-full min-h-[320px] bg-slate-100 relative">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md font-mono">
              Elevation: {selectedPlace.altitude}
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedPlace.distance}</span>
                <span aria-hidden="true">·</span>
                <span>Best: {selectedPlace.bestTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedPlace.name}</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedPlace.description}</p>

              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-6 mb-2">
                Popular Activities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedPlace.activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-xs">
              <span className="font-bold text-emerald-950 block mb-0.5">Local Insider Tip:</span>
              <p className="text-emerald-900 leading-relaxed">{selectedPlace.tips}</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Places */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Complete Destination Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                setSelectedPlace(place);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between group ${
                selectedPlace?.id === place.id
                  ? 'border-emerald-600 ring-2 ring-emerald-600/30 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="aspect-16/10 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
                    {place.altitude}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs px-2.5 py-0.5 rounded font-medium shadow-xs">
                    {place.entryFee}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{place.distance}</span>
                  <span className="font-medium text-emerald-700 group-hover:underline">View Details & Tips →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
