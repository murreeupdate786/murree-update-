import React, { useState } from 'react';
import { Hotel, RoomOption } from '../lib/types';
import { ArrowLeft, Star, MapPin, Phone, Check, ShieldCheck, Wifi, Flame, Coffee, Car, Clock } from 'lucide-react';

interface HotelDetailViewProps {
  hotel: Hotel;
  onBack: () => void;
  onBookRoom: (hotel: Hotel, room: RoomOption) => void;
}

export const HotelDetailView: React.FC<HotelDetailViewProps> = ({ hotel, onBack, onBookRoom }) => {
  const [activeImage, setActiveImage] = useState(hotel.image);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(hotel.rooms[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Back Nav */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Hotels Directory</span>
      </button>

      {/* Main Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-700">{hotel.location}</span>
            <span aria-hidden="true">·</span>
            <span>{hotel.address}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{hotel.name}</h1>
          <p className="text-sm text-slate-600 mt-1">{hotel.tagline}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-slate-900 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{hotel.rating.toFixed(1)} / 5.0</span>
            </div>
            <span className="text-xs text-slate-500">{hotel.reviewsCount} verified guest reviews</span>
          </div>

          <a
            href={`tel:${hotel.phone}`}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Front Desk</span>
          </a>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={activeImage}
            alt={hotel.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {hotel.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`aspect-16/9 rounded-xl overflow-hidden bg-slate-100 border cursor-pointer transition-all ${
                activeImage === img ? 'ring-2 ring-emerald-600 border-transparent' : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${hotel.name} preview ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Details & Booking Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description & Rooms */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3">About the Property</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{hotel.description}</p>

            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-6 mb-3">
              Key Mountain Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((am, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Room Types */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Available Room Types</h2>
            <p className="text-xs text-slate-500">Select a room to book directly with instant reservation voucher</p>

            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    selectedRoom?.id === room.id
                      ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{room.type}</h3>
                      <span className="text-[11px] text-slate-500 font-mono">Max {room.capacity} Guests</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {room.features.map((f, i) => (
                        <span key={i} className="text-[10px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] text-emerald-700 font-medium block mt-2">
                      {room.available} rooms left for upcoming dates
                    </span>
                  </div>

                  <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 flex sm:flex-col items-center sm:items-end justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Nightly Rate</span>
                      <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                        PKR {room.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookRoom(hotel, room)}
                      className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Book This Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hotel Policies & Highlights */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Hotel Policies</h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Check-in / Check-out</span>
                  <span>Check-in from 2:00 PM · Check-out until 12:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Heating Guarantee</span>
                  <span>Heating runs continuously during night hours. Generator backup for load shedding.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Parking & Accessibility</span>
                  <span>On-site secure parking for cars and 4x4s. Drivers accommodation available on request.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 block">Need custom assistance?</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{hotel.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
