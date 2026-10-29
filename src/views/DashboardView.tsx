import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { Booking } from '../lib/types';
import { NavTab } from '../components/Navbar';
import { getCurrentUser } from '../lib/auth';
import { Calendar, User, Phone, Printer, CheckCircle2, XCircle, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenBookingVoucher?: (booking: Booking) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenBookingVoucher }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => db.getBookings());
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const user = getCurrentUser();

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      db.cancelBooking(id);
      setBookings(db.getBookings());
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED';
    if (filter === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <User className="w-4 h-4" />
            <span>Traveler Management Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            My Bookings & Mountain Itinerary
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Active reservations for <strong className="text-slate-800">{user.name}</strong> ({user.email})
          </p>
        </div>

        <button
          onClick={() => onNavigate('hotels')}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          Book New Hotel or Car
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Reservations ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('CONFIRMED')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'CONFIRMED' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Confirmed Active ({bookings.filter(b => b.status === 'CONFIRMED').length})
        </button>
        <button
          onClick={() => setFilter('CANCELLED')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'CANCELLED' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Cancelled ({bookings.filter(b => b.status === 'CANCELLED').length})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-slate-900 font-mono tracking-tight">
                    {b.bookingNumber}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      b.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {b.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono uppercase">{b.type}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{b.itemTitle}</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Duration Dates</span>
                    <span className="font-mono font-medium text-slate-800">{b.checkInDate} to {b.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Guests / Party</span>
                    <span className="font-medium text-slate-800">{b.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Mode</span>
                    <span className="font-medium text-slate-800">{b.paymentMethod}</span>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg leading-relaxed">
                    <strong>Note:</strong> {b.notes}
                  </p>
                )}
              </div>

              {/* Amount and Action */}
              <div className="md:text-right shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex md:flex-col items-center md:items-end justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Fare</span>
                  <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                    PKR {b.totalAmount.toLocaleString()}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Print Voucher"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No bookings found</h3>
          <p className="text-xs text-slate-500 mt-1">You haven't made any reservations under this filter.</p>
          <button
            onClick={() => onNavigate('hotels')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            Explore Hotels Now
          </button>
        </div>
      )}
    </div>
  );
};
