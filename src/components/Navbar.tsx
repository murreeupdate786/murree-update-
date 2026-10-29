import React from 'react';
import { Compass, PhoneCall, ShieldAlert, User, Shield } from 'lucide-react';
import { getCurrentUser, isAdmin, switchToAdmin, switchToUser } from '../lib/auth';

export type NavTab =
  | 'home'
  | 'weather'
  | 'traffic'
  | 'hotels'
  | 'hotel-detail'
  | 'rent-a-car'
  | 'places'
  | 'news'
  | 'dashboard'
  | 'admin'
  | 'booking';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenEmergency }) => {
  const adminMode = isAdmin();
  const currentUser = getCurrentUser();

  const handleToggleAdmin = () => {
    if (adminMode) {
      switchToUser();
    } else {
      switchToAdmin();
    }
    // Re-render
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner for Urgent Road / Weather Advisory */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] shrink-0">Live Advisory:</span>
            <span className="truncate">Murree Expressway M-75 open with normal transit. Snow chains required beyond Barian toward Nathia Gali.</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <button
              onClick={onOpenEmergency}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>Helpline: 1422</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={handleToggleAdmin}
              className={`text-[11px] font-medium px-2 py-0.5 rounded cursor-pointer transition-colors ${
                adminMode ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
              title={adminMode ? 'Switch to Traveler View' : 'Switch to Admin / Control Room View'}
            >
              {adminMode ? 'Admin Active' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-emerald-800 transition-colors">
            <Compass className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Murree Update
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              Travel & Road Advisory
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'home'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Guide
          </button>
          <button
            onClick={() => onSelectTab('weather')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'weather'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Weather
          </button>
          <button
            onClick={() => onSelectTab('traffic')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'traffic'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Roads & Traffic
          </button>
          <button
            onClick={() => onSelectTab('hotels')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'hotels' || activeTab === 'hotel-detail'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => onSelectTab('rent-a-car')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'rent-a-car'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Rent a Car & Tours
          </button>
          <button
            onClick={() => onSelectTab('places')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'places'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Top Places
          </button>
          <button
            onClick={() => onSelectTab('news')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'news'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Alerts & News
          </button>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'dashboard'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            My Bookings
          </button>
          {adminMode && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 flex items-center gap-1 text-amber-700 ${
                activeTab === 'admin'
                  ? 'font-bold border-b-2 border-amber-600'
                  : 'hover:text-amber-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Panel
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenEmergency}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Emergency Contacts</span>
          </button>

          <button
            onClick={() => onSelectTab('hotels')}
            className="px-4 py-2 text-xs font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Book Hotel
          </button>
        </div>
      </div>

      {/* Mobile Secondary Scrollable Tab Bar */}
      <div className="lg:hidden flex items-center gap-4 px-4 py-2.5 overflow-x-auto border-t border-slate-100 text-xs font-medium text-slate-600 bg-slate-50/80 no-scrollbar">
        <button
          onClick={() => onSelectTab('home')}
          className={`shrink-0 cursor-pointer ${activeTab === 'home' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Guide
        </button>
        <button
          onClick={() => onSelectTab('weather')}
          className={`shrink-0 cursor-pointer ${activeTab === 'weather' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Weather
        </button>
        <button
          onClick={() => onSelectTab('traffic')}
          className={`shrink-0 cursor-pointer ${activeTab === 'traffic' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Roads
        </button>
        <button
          onClick={() => onSelectTab('hotels')}
          className={`shrink-0 cursor-pointer ${activeTab === 'hotels' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Hotels
        </button>
        <button
          onClick={() => onSelectTab('rent-a-car')}
          className={`shrink-0 cursor-pointer ${activeTab === 'rent-a-car' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Rent a Car
        </button>
        <button
          onClick={() => onSelectTab('places')}
          className={`shrink-0 cursor-pointer ${activeTab === 'places' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Places
        </button>
        <button
          onClick={() => onSelectTab('news')}
          className={`shrink-0 cursor-pointer ${activeTab === 'news' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Alerts
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`shrink-0 cursor-pointer ${activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Bookings
        </button>
        {adminMode && (
          <button
            onClick={() => onSelectTab('admin')}
            className={`shrink-0 cursor-pointer text-amber-700 ${activeTab === 'admin' ? 'font-bold' : ''}`}
          >
            Admin
          </button>
        )}
      </div>
    </header>
  );
};
