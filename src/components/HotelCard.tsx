import React, { useState } from 'react';
import { Hotel } from '../lib/types';
import { Star, MapPin, Check, Wifi, Flame, Sparkles, Phone } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  onBookNow: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect, onBookNow }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group">
      {/* Visual Asset Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
            <Sparkles className="w-8 h-8 text-emerald-400 mb-2 opacity-80" />
            <span className="font-bold text-sm tracking-tight">{hotel.name}</span>
            <span className="text-xs text-slate-300 mt-1">{hotel.location}</span>
          </div>
        )}

        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
          {hotel.location}
        </div>

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {hotel.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{hotel.tagline}</p>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
            <span>{hotel.reviewsCount} verified reviews</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Heating</span>
          </div>

          {/* Amenities snippets */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((am, i) => (
              <span
                key={i}
                className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
              >
                {am}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[11px] text-slate-400 self-center">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block">Starting from</span>
            <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums leading-none">
              PKR {hotel.pricePerNight.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 font-sans"> / night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(hotel)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(hotel)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
