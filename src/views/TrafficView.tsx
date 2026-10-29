import React from 'react';
import { TrafficMap } from '../components/TrafficMap';
import { Car, AlertTriangle, ShieldCheck, Clock, MapPin, Truck, Compass } from 'lucide-react';

interface TrafficViewProps {
  onOpenEmergency: () => void;
}

export const TrafficView: React.FC<TrafficViewProps> = ({ onOpenEmergency }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <Car className="w-4 h-4" />
            <span>Real-Time Expressway & Galyat Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Live Road Status, Traffic & Interactive Map
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time highway clearance, congestion levels, toll plaza fee guide, and emergency recovery units along the Islamabad-Murree corridor.
          </p>
        </div>

        <button
          onClick={onOpenEmergency}
          className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
        >
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Traffic Police Control Room</span>
        </button>
      </div>

      {/* Main Traffic Map Component */}
      <TrafficMap />

      {/* Travel Guidelines by City Traffic Police Murree */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2">
          Official Entry Guidelines by Murree Traffic Police
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Strictly enforced at Barakahu and Lower Topa Checkposts for tourist safety
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-emerald-400 block mb-1">01. Vehicle Fitness Verification</span>
            <p className="leading-relaxed text-slate-300">
              Only vehicles with healthy brakes, battery, and working defoggers are allowed during freezing weather. 2WD vehicles with worn tires are diverted at Lower Topa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-sky-400 block mb-1">02. Snow Clearing Fleet Ready</span>
            <p className="leading-relaxed text-slate-300">
              6 heavy salt-sprinkler trucks and 8 hydraulic snow blowers are deployed at Kuldana, Barian, and Changla Gali to maintain non-stop connectivity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">03. One-Way Mall Road Protocol</span>
            <p className="leading-relaxed text-slate-300">
              Mall Road remains strictly a pedestrian zone. Tourist vehicles must park at designated multi-story plazas at Sunny Bank or General Bus Stand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
