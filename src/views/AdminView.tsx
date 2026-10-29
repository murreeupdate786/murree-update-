import React, { useState } from 'react';
import { db, IMAGES } from '../lib/db';
import { RoadSection, RoadStatus, NewsAlert, Hotel, Booking } from '../lib/types';
import { Shield, AlertTriangle, Plus, Check, RefreshCw, Car, Bed, Bell, FileText } from 'lucide-react';

export const AdminView: React.FC = () => {
  const [roads, setRoads] = useState<RoadSection[]>(() => db.getRoads());
  const [bookings, setBookings] = useState<Booking[]>(() => db.getBookings());
  const [news, setNews] = useState<NewsAlert[]>(() => db.getNews());

  const [activeTab, setActiveTab] = useState<'roads' | 'news' | 'bookings' | 'hotels'>('roads');
  const [successMsg, setSuccessMsg] = useState('');

  // Road edit form
  const [editingRoadId, setEditingRoadId] = useState<string>(roads[0]?.id || '');
  const [newStatus, setNewStatus] = useState<RoadStatus>('CLEAR');
  const [newAdvisory, setNewAdvisory] = useState('');
  const [newSnowLevel, setNewSnowLevel] = useState<number>(0);

  // New Alert form
  const [alertTitle, setAlertTitle] = useState('');
  const [alertCategory, setAlertCategory] = useState<'Weather Advisory' | 'Traffic Alert' | 'Snow Warning' | 'Tourism Event'>('Traffic Alert');
  const [alertSeverity, setAlertSeverity] = useState<'High' | 'Moderate' | 'Info'>('Info');
  const [alertSummary, setAlertSummary] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [alertSource, setAlertSource] = useState('Chief Traffic Officer Murree');

  // New Hotel form
  const [hotelName, setHotelName] = useState('');
  const [hotelTagline, setHotelTagline] = useState('');
  const [hotelLocation, setHotelLocation] = useState('Mall Road, Murree');
  const [hotelPrice, setHotelPrice] = useState(15000);
  const [hotelPhone, setHotelPhone] = useState('+92 51 3410000');

  const flashMessage = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleUpdateRoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoadId) return;
    db.updateRoad(editingRoadId, {
      status: newStatus,
      advisory: newAdvisory || undefined,
      snowLevelCm: newSnowLevel
    });
    setRoads(db.getRoads());
    flashMessage('Road condition published to live portal!');
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim()) return;

    const newAlert: NewsAlert = {
      id: `alert-${Date.now()}`,
      title: alertTitle,
      category: alertCategory,
      severity: alertSeverity,
      summary: alertSummary,
      content: alertContent,
      source: alertSource,
      date: 'Just now',
      isPinned: alertSeverity === 'High'
    };

    db.addNews(newAlert);
    setNews(db.getNews());
    setAlertTitle('');
    setAlertSummary('');
    setAlertContent('');
    flashMessage('Live official advisory bulletin broadcasted!');
  };

  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName.trim()) return;

    const newHotel: Hotel = {
      id: `hotel-${Date.now()}`,
      name: hotelName,
      tagline: hotelTagline || 'Comfortable mountain accommodation',
      location: hotelLocation,
      address: `${hotelLocation}, Murree`,
      rating: 4.7,
      reviewsCount: 12,
      pricePerNight: hotelPrice,
      image: IMAGES.resortBhurban,
      images: [IMAGES.resortBhurban, IMAGES.hero],
      amenities: ['Central Heating', 'Free WiFi', 'Generator Backup', 'Mountain View'],
      description: 'Newly listed verified accommodation with certified heating and winter services.',
      phone: hotelPhone,
      rooms: [
        {
          id: `room-${Date.now()}`,
          type: 'Executive Valley View Room',
          capacity: 2,
          price: hotelPrice,
          available: 4,
          features: ['King Bed', 'Heating', 'Balcony']
        }
      ]
    };

    db.addHotel(newHotel);
    setHotelName('');
    setHotelTagline('');
    flashMessage('Hotel verified and added to directory!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Murree Control Room Admin Desk</h1>
            <p className="text-xs text-slate-400">Authorized operator panel for live traffic, alerts, and reservation dispatch</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {successMsg && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-md animate-fade-in">
              {successMsg}
            </span>
          )}
          <button
            onClick={() => {
              if (window.confirm('Reset all road statuses, news, and bookings to default seed?')) {
                db.resetToDefault();
                window.location.reload();
              }
            }}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('roads')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'roads' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>Road Status Dispatch ({roads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'news' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Post Travel Alert</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'bookings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>All Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hotels')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'hotels' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bed className="w-3.5 h-3.5" />
          <span>Register Hotel</span>
        </button>
      </div>

      {/* Tab 1: Road Update Form & Table */}
      {activeTab === 'roads' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleUpdateRoad} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Broadcast Sector Status</h3>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Select Road / Sector</label>
              <select
                value={editingRoadId}
                onChange={(e) => {
                  setEditingRoadId(e.target.value);
                  const sel = roads.find(r => r.id === e.target.value);
                  if (sel) {
                    setNewStatus(sel.status);
                    setNewAdvisory(sel.advisory);
                    setNewSnowLevel(sel.snowLevelCm);
                  }
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                {roads.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.section})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">New Condition Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as RoadStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="CLEAR">CLEAR / ALL LANES OPEN</option>
                <option value="MODERATE_TRAFFIC">MODERATE TRAFFIC</option>
                <option value="HEAVY_TRAFFIC">HEAVY CONGESTION</option>
                <option value="SNOW_CHAINS_REQUIRED">SNOW CHAINS STRICTLY REQUIRED</option>
                <option value="TEMPORARILY_BLOCKED">TEMPORARILY BLOCKED</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Snow Depth on Asphalt (cm)</label>
              <input
                type="number"
                step="0.5"
                value={newSnowLevel}
                onChange={(e) => setNewSnowLevel(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Live Advisory Message</label>
              <textarea
                value={newAdvisory}
                onChange={(e) => setNewAdvisory(e.target.value)}
                placeholder="e.g. Salt trucks operational at Upper Topa. Clear dual carriageway."
                rows={3}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Publish Update to Live Map
            </button>
          </form>

          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900">Current Portal Status</span>
              <span className="text-xs text-slate-500 font-mono">{roads.length} Monitored Roads</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {roads.map(r => (
                <div key={r.id} className="p-4 flex items-center justify-between text-xs gap-3">
                  <div>
                    <span className="font-bold text-slate-900 block">{r.name}</span>
                    <span className="text-slate-500">{r.section}</span>
                    <span className="text-slate-700 block mt-0.5">{r.advisory}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-semibold text-slate-900 block">{r.status}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{r.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: News Alerts */}
      {activeTab === 'news' && (
        <form onSubmit={handleCreateAlert} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Issue Urgent Tourist Advisory</h3>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Advisory Headline</label>
            <input
              type="text"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="e.g. Fresh Snowfall Warning: 4x4 Only past Barian"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Category</label>
              <select
                value={alertCategory}
                onChange={(e) => setAlertCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Traffic Alert">Traffic Alert</option>
                <option value="Weather Advisory">Weather Advisory</option>
                <option value="Snow Warning">Snow Warning</option>
                <option value="Tourism Event">Tourism Event</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Severity Level</label>
              <select
                value={alertSeverity}
                onChange={(e) => setAlertSeverity(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Info">Info (Standard Bulletin)</option>
                <option value="Moderate">Moderate (Drive with Caution)</option>
                <option value="High">High (Urgent Emergency Pinned)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Summary (1-Line Teaser)</label>
            <input
              type="text"
              value={alertSummary}
              onChange={(e) => setAlertSummary(e.target.value)}
              placeholder="Quick one-line instruction for motorists"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Full Advisory Notice</label>
            <textarea
              value={alertContent}
              onChange={(e) => setAlertContent(e.target.value)}
              placeholder="Full official instructions, contact numbers, and guidelines"
              rows={4}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Authorizing Agency</label>
            <input
              type="text"
              value={alertSource}
              onChange={(e) => setAlertSource(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Broadcast to Live Alerts Section
          </button>
        </form>
      )}

      {/* Tab 3: Bookings Inspector */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900">All Portal Reservations</span>
            <span className="font-mono text-slate-500">{bookings.length} Registered Bookings</span>
          </div>

          <div className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{b.bookingNumber}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {b.status}
                    </span>
                    <span className="text-slate-500">· {b.type}</span>
                  </div>
                  <span className="font-semibold text-slate-800 block mt-0.5">{b.itemTitle}</span>
                  <span className="text-slate-500">
                    Traveler: {b.customerName} ({b.customerPhone}) · Dates: {b.checkInDate} to {b.checkOutDate}
                  </span>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="font-mono font-extrabold text-slate-900 text-sm">
                    PKR {b.totalAmount.toLocaleString()}
                  </div>
                  <span className="text-slate-400 text-[11px]">{b.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Register Hotel */}
      {activeTab === 'hotels' && (
        <form onSubmit={handleCreateHotel} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Add New Verified Hotel Listing</h3>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Hotel Property Name</label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="e.g. Pine View Lodge & Resort"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Tagline</label>
            <input
              type="text"
              value={hotelTagline}
              onChange={(e) => setHotelTagline(e.target.value)}
              placeholder="e.g. Scenic Pine Ridge Stays with Central Heating"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Location / Area</label>
              <select
                value={hotelLocation}
                onChange={(e) => setHotelLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Mall Road, Murree">Mall Road, Murree</option>
                <option value="Bhurban, Murree">Bhurban, Murree</option>
                <option value="Lower Topa, Murree">Lower Topa, Murree</option>
                <option value="Kashmir Point, Murree">Kashmir Point, Murree</option>
                <option value="Ghora Gali, Murree">Ghora Gali, Murree</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Starting Nightly Rate (PKR)</label>
              <input
                type="number"
                value={hotelPrice}
                onChange={(e) => setHotelPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Front Desk Phone</label>
            <input
              type="text"
              value={hotelPhone}
              onChange={(e) => setHotelPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Save & Publish Hotel to Directory
          </button>
        </form>
      )}
    </div>
  );
};
