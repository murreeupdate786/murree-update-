import React, { useState } from 'react';
import { db } from '../lib/db';
import { Booking } from '../lib/types';
import { getCurrentUser } from '../lib/auth';
import { CheckCircle2, Calendar, User, Phone, Mail, CreditCard, ShieldCheck, Printer, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookingViewProps {
  initialItem?: {
    type: 'HOTEL' | 'CAR' | 'TOUR';
    title: string;
    price: number;
    id?: string;
  };
  onSuccess: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ initialItem, onSuccess, onCancel }) => {
  const currentUser = getCurrentUser();

  const [itemTitle, setItemTitle] = useState(initialItem?.title || 'Pearl Continental Resort Bhurban - Deluxe Room');
  const [itemType, setItemType] = useState<'HOTEL' | 'CAR' | 'TOUR'>(initialItem?.type || 'HOTEL');
  const [nightlyRate, setNightlyRate] = useState<number>(initialItem?.price || 38500);

  const [customerName, setCustomerName] = useState(currentUser.name);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone);
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [checkInDate, setCheckInDate] = useState('2026-11-05');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-08');
  const [guests, setGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('Pay on Arrival');
  const [notes, setNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate duration in days
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const diffTime = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const daysCount = isNaN(diffTime) || diffTime < 1 ? 1 : diffTime;
  const totalAmount = daysCount * nightlyRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMsg('Please enter your full name, phone number, and email.');
      return;
    }
    setErrorMsg('');

    const newBooking = db.createBooking({
      type: itemType,
      itemTitle,
      customerName,
      customerPhone,
      customerEmail,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
      status: 'CONFIRMED',
      paymentMethod,
      notes,
      hotelId: initialItem?.id,
      carId: initialItem?.id
    });

    setConfirmedBooking(newBooking);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Reservation Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Your Booking is Verified
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              A copy of your voucher and itinerary has been registered with Murree Update Central Directory
            </p>
          </div>

          {/* Booking Voucher Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs text-slate-500 block">Booking Reference ID</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {confirmedBooking.bookingNumber}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Payment Mode</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
                  {confirmedBooking.paymentMethod}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Reserved Item</span>
                <span className="font-bold text-slate-900 text-sm block mt-0.5">{confirmedBooking.itemTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lead Guest / Traveler</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{confirmedBooking.customerName}</span>
                <span className="text-slate-500 font-mono">{confirmedBooking.customerPhone}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Schedule Dates</span>
                <span className="font-mono font-semibold text-slate-900 block mt-0.5">
                  {confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate} ({daysCount} {daysCount === 1 ? 'day' : 'nights'})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Due Amount</span>
                <span className="font-mono font-extrabold text-slate-900 text-lg tabular-nums block mt-0.5">
                  PKR {confirmedBooking.totalAmount.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">All local mountain taxes included</span>
              </div>
            </div>

            {confirmedBooking.notes && (
              <div className="pt-3 border-t border-slate-200 text-xs">
                <span className="text-slate-500 block">Special Requests</span>
                <p className="text-slate-700 mt-0.5">{confirmedBooking.notes}</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Voucher</span>
            </button>

            <button
              onClick={() => onSuccess(confirmedBooking)}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>View in My Bookings Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top back */}
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Return</span>
      </button>

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Reservation</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Booking Checkout & Voucher Generation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Instant confirmation with zero booking fees and free on-arrival payment support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Item details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">1. Selected Service Details</h2>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Reservation Item</label>
              <input
                type="text"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Check-in / Start Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Check-out / End Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Number of Guests / Passengers</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Family)</option>
                <option value={6}>6+ Guests</option>
              </select>
            </div>
          </div>

          {/* Traveler Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">2. Primary Traveler Contact</h2>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Muhammad Arslan"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Phone (Active on WhatsApp)</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="arslan@example.com"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Special Requests / Arrival Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Arriving late evening around 8 PM, require extra heater blanket, etc."
                rows={2}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">3. Select Payment Preference</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'Pay on Arrival', title: 'Pay Cash at Check-In', desc: 'No advance deposit needed' },
                { id: 'JazzCash', title: 'JazzCash Mobile', desc: 'Instant till payment' },
                { id: 'EasyPaisa', title: 'EasyPaisa Wallet', desc: 'Direct merchant transfer' },
                { id: 'Bank Transfer', title: 'Online Bank IBFT', desc: 'HBL, Meezan, Alfalah' }
              ].map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === pm.id
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">{pm.title}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{pm.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-md"
          >
            Confirm Reservation & Generate Booking ID
          </button>
        </form>

        {/* Right 1 Col: Summary Card */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs sticky top-24 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Fare Summary</h3>

            <div className="space-y-2 text-xs text-slate-600 pb-4 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Base Rate</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  PKR {nightlyRate.toLocaleString()} / day
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {daysCount} {daysCount === 1 ? 'day' : 'nights'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tourism Cess & Taxes</span>
                <span className="text-emerald-700 font-medium">Included (0%)</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs font-bold text-slate-900">Total Payable</span>
              <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                PKR {totalAmount.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
              <span className="font-bold block">Murree Update Guarantee:</span>
              <p className="text-[11px] leading-relaxed">
                Direct hotel confirmation code dispatched upon checkout. 100% price lock with no snow surcharge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
