import React, { useState } from 'react';
import { RoadSection, RoadStatus } from '../lib/types';
import { db } from '../lib/db';
import { Car, AlertTriangle, CheckCircle2, Clock, MapPin, Gauge, ShieldCheck, DollarSign } from 'lucide-react';

interface TrafficMapProps {
  onSelectRoad?: (road: RoadSection) => void;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ onSelectRoad }) => {
  const [roads, setRoads] = useState<RoadSection[]>(() => db.getRoads());
  const [selectedRoadId, setSelectedRoadId] = useState<string>('road-1');
  const [tollVehicleType, setTollVehicleType] = useState<'car' | 'van' | 'coaster'>('car');

  const selectedRoad = roads.find(r => r.id === selectedRoadId) || roads[0];

  const getStatusBadge = (status: RoadStatus) => {
    switch (status) {
      case 'CLEAR':
        return {
          label: 'Clear / Open',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'text-emerald-600',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
      case 'MODERATE_TRAFFIC':
        return {
          label: 'Moderate Traffic',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'text-amber-600',
          icon: <AlertTriangle className="w-3.5 h-3.5" />
        };
      case 'HEAVY_TRAFFIC':
        return {
          label: 'Heavy Congestion',
          bg: 'bg-orange-50 text-orange-800 border-orange-200',
          dot: 'text-orange-600',
          icon: <AlertTriangle className="w-3.5 h-3.5" />
        };
      case 'SNOW_CHAINS_REQUIRED':
        return {
          label: 'Chains Required',
          bg: 'bg-sky-50 text-sky-800 border-sky-200',
          dot: 'text-sky-600',
          icon: <AlertTriangle className="w-3.5 h-3.5" />
        };
      case 'TEMPORARILY_BLOCKED':
        return {
          label: 'Temporarily Blocked',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'text-rose-600',
          icon: <AlertTriangle className="w-3.5 h-3.5" />
        };
    }
  };

  const getTollAmount = () => {
    if (tollVehicleType === 'car') return 120;
    if (tollVehicleType === 'van') return 220;
    return 350;
  };

  // Node positions on the interactive topological diagram
  const checkpoints = [
    { id: 'barakahu', name: 'Barakahu Toll Plaza', x: 100, y: 380, roadId: 'road-1', note: 'M-75 Entry Point' },
    { id: 'tret', name: 'Tret / Chharra Pani', x: 200, y: 320, roadId: 'road-3', note: 'Old Murree Road' },
    { id: 'lowertopa', name: 'Lower Topa Interchange', x: 380, y: 250, roadId: 'road-1', note: 'Expressway Exit' },
    { id: 'patriata', name: 'Patriata (New Murree)', x: 550, y: 310, roadId: 'road-4', note: 'Cable Car Base' },
    { id: 'sunnybank', name: 'Sunny Bank Chowk', x: 420, y: 170, roadId: 'road-2', note: 'Central Traffic Fork' },
    { id: 'mallroad', name: 'Mall Road & GPO', x: 390, y: 100, roadId: 'road-2', note: 'Pedestrian Core' },
    { id: 'kashmirpoint', name: 'Kashmir Point', x: 460, y: 70, roadId: 'road-6', note: 'High Lookout' },
    { id: 'bhurban', name: 'Bhurban Resort', x: 560, y: 180, roadId: 'road-1', note: 'Golf & PC Hotel' },
    { id: 'changla', name: 'Changla Gali / Galyat', x: 310, y: 60, roadId: 'road-5', note: 'High Elevation Pass' }
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Map & Route Visualizer Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Murree Expressway & Galyat Road Network</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live status from City Traffic Police Murree & National Highway Authority
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Total Corridor: <span className="font-mono text-slate-200">55 km</span></span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Avg Islamabad Travel Time: <span className="font-mono text-emerald-300">50 mins</span></span>
          </div>
        </div>

        {/* SVG Topological Map */}
        <div className="relative bg-slate-950 p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[680px] h-[420px] relative select-none">
            <svg className="w-full h-full" viewBox="0 0 680 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background mountain contour traces */}
              <path d="M40 380 Q 200 280, 360 300 T 650 360" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M120 220 Q 300 120, 480 150 T 650 200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M220 100 Q 380 40, 520 60 T 650 120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Road segment lines */}
              {/* M-75 Expressway: Barakahu -> Lower Topa */}
              <line x1="100" y1="380" x2="380" y2="250" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
              {/* Old Murree Road: Barakahu -> Tret -> Sunny Bank */}
              <path d="M100 380 Q 180 340, 200 320 T 420 170" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" fill="none" />
              {/* Lower Topa -> Patriata */}
              <line x1="380" y1="250" x2="550" y2="310" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              {/* Lower Topa -> Sunny Bank */}
              <line x1="380" y1="250" x2="420" y2="170" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
              {/* Sunny Bank -> Mall Road */}
              <line x1="420" y1="170" x2="390" y2="100" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
              {/* Mall Road -> Kashmir Point */}
              <line x1="390" y1="100" x2="460" y2="70" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              {/* Sunny Bank -> Bhurban */}
              <line x1="420" y1="170" x2="560" y2="180" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              {/* Sunny Bank -> Changla Gali / Nathia Gali */}
              <line x1="420" y1="170" x2="310" y2="60" stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 3" strokeLinecap="round" />

              {/* Labels on Roads */}
              <text x="210" y="300" fill="#6ee7b7" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                M-75 Expressway (Dual Carriageway)
              </text>
              <text x="470" y="275" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                Patriata Link (14km)
              </text>
              <text x="325" y="115" fill="#fde68a" fontSize="10" fontFamily="sans-serif">
                Sunny Bank to Mall Road
              </text>
              <text x="270" y="85" fill="#bae6fd" fontSize="10" fontFamily="sans-serif">
                Galyat Pass (Chains Needed)
              </text>
            </svg>

            {/* Checkpoint Nodes */}
            {checkpoints.map((pt) => {
              const road = roads.find(r => r.id === pt.roadId);
              const isSelected = selectedRoadId === pt.roadId;
              const status = road?.status || 'CLEAR';

              let nodeColor = 'bg-emerald-500 border-emerald-300';
              if (status === 'MODERATE_TRAFFIC') nodeColor = 'bg-amber-500 border-amber-300';
              if (status === 'HEAVY_TRAFFIC') nodeColor = 'bg-orange-500 border-orange-300';
              if (status === 'SNOW_CHAINS_REQUIRED') nodeColor = 'bg-sky-400 border-sky-200';
              if (status === 'TEMPORARILY_BLOCKED') nodeColor = 'bg-rose-500 border-rose-300';

              return (
                <div
                  key={pt.id}
                  style={{ left: `${pt.x}px`, top: `${pt.y}px` }}
                  onClick={() => {
                    setSelectedRoadId(pt.roadId);
                    if (road && onSelectRoad) onSelectRoad(road);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-2 ${nodeColor} shadow-md flex items-center justify-center text-white ${isSelected ? 'ring-4 ring-white/40' : ''}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <div className="mt-1 bg-slate-900/90 text-slate-100 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm whitespace-nowrap border border-slate-700">
                      {pt.name}
                    </div>
                    <div className="text-[9px] text-slate-400 whitespace-nowrap">
                      {pt.note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Road Detail Inspector Strip */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500">Selected Sector:</span>
                <h4 className="text-base font-bold text-slate-900">{selectedRoad.name}</h4>
                <div className={`text-xs px-2.5 py-0.5 rounded-md border font-medium flex items-center gap-1 ${getStatusBadge(selectedRoad.status).bg}`}>
                  {getStatusBadge(selectedRoad.status).icon}
                  <span>{getStatusBadge(selectedRoad.status).label}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Section: </span>{selectedRoad.section}
              </p>
              <p className="text-xs text-slate-700 mt-1.5 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                <span className="font-semibold text-slate-900">Advisory: </span>{selectedRoad.advisory}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 text-xs">
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200 min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Transit Time</span>
                </div>
                <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {selectedRoad.travelTimeMins} mins
                </div>
              </div>

              <div className="text-center p-3 bg-white rounded-xl border border-slate-200 min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Distance</span>
                </div>
                <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {selectedRoad.distanceKm} km
                </div>
              </div>

              <div className="text-center p-3 bg-white rounded-xl border border-slate-200 min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
                  <span>Snow Depth</span>
                </div>
                <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {selectedRoad.snowLevelCm} cm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expressway Toll & Parking Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Toll Plaza Calculator */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Barakahu Toll Plaza Rates (M-75)</h4>
                <p className="text-xs text-slate-500">Official National Highway Authority (NHA) Tariff</p>
              </div>
            </div>
            <span className="text-xs text-emerald-700 font-semibold">One-Way</span>
          </div>

          <div className="flex items-center gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setTollVehicleType('car')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                tollVehicleType === 'car' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Car / Jeep (4x4)
            </button>
            <button
              onClick={() => setTollVehicleType('van')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                tollVehicleType === 'van' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hiace / Van
            </button>
            <button
              onClick={() => setTollVehicleType('coaster')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                tollVehicleType === 'coaster' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Coaster / Bus
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Toll Fee for Selected Vehicle</span>
              <span className="text-xs font-semibold text-slate-700 capitalize">{tollVehicleType} Class Entry</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              PKR {getTollAmount()}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            Note: Electronic M-Tag lanes are active at Barakahu for non-stop cashless transit.
          </p>
        </div>

        {/* Murree Parking Plazas Capacity Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Designated Parking Plazas</h4>
                <p className="text-xs text-slate-500">Real-time bay capacity to avoid Mall Road gridlocks</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Mall Road Multi-Story Plaza</span>
                <span className="text-[11px] text-slate-500">General Post Office (GPO) Access</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-700">320 Bays Open</span>
                <span className="text-[11px] text-slate-400 block">75% Capacity</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Sunny Bank Parking Ground</span>
                <span className="text-[11px] text-slate-500">Shuttle connection to Mall Road</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-700">450 Bays Open</span>
                <span className="text-[11px] text-slate-400 block">40% Capacity</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Patriata Base Station Area</span>
                <span className="text-[11px] text-slate-500">Chairlift & Cable Car Terminal</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-700">280 Bays Open</span>
                <span className="text-[11px] text-slate-400 block">20% Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Roads Status Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50">
          <h4 className="text-sm font-bold text-slate-900">Comprehensive Road & Pass Directory</h4>
          <p className="text-xs text-slate-500">Updated continuously by Highway Patrol & Snow Clearance Operators</p>
        </div>

        <div className="divide-y divide-slate-100">
          {roads.map((r) => {
            const badge = getStatusBadge(r.status);
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRoadId(r.id)}
                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedRoadId === r.id ? 'bg-slate-50/80 border-l-2 border-emerald-600' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{r.name}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded border font-medium flex items-center gap-1 ${badge.bg}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{r.section}</p>
                  <p className="text-xs text-slate-700 mt-1">{r.advisory}</p>
                </div>

                <div className="flex items-center gap-6 text-xs shrink-0">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Travel Time</span>
                    <span className="font-mono font-bold text-slate-900">{r.travelTimeMins} mins</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Distance</span>
                    <span className="font-mono text-slate-700">{r.distanceKm} km</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Updated</span>
                    <span className="font-mono text-slate-500">{r.lastUpdated}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
