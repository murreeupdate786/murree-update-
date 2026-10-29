import React, { useState } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { Mountain, Snowflake, Wind, Droplets, Sun, AlertTriangle, CloudRain, ShieldCheck } from 'lucide-react';

export const WeatherView: React.FC = () => {
  const [altitudeZone, setAltitudeZone] = useState<'murree' | 'bhurban' | 'nathiagali' | 'islamabad'>('murree');

  const altitudeData = {
    islamabad: {
      location: 'Islamabad / Rawalpindi Foothills',
      elevation: '508 m (1,667 ft)',
      currentTemp: '24°C',
      nightTemp: '14°C',
      status: 'Mild Autumn',
      advisory: 'Clear sunny highway conditions approaching Barakahu.'
    },
    bhurban: {
      location: 'Bhurban & Golf Valley',
      elevation: '1,830 m (6,000 ft)',
      currentTemp: '12°C',
      nightTemp: '5°C',
      status: 'Cool Pine Breeze',
      advisory: 'Pleasant daytime weather, light sweater required in evening.'
    },
    murree: {
      location: 'Murree Ridge (Mall Road & Kashmir Point)',
      elevation: '2,291 m (7,516 ft)',
      currentTemp: '8°C',
      nightTemp: '2°C',
      status: 'Chilly Alpine Mist',
      advisory: 'Thick jackets and gloves recommended after 5 PM.'
    },
    nathiagali: {
      location: 'Nathia Gali & Miranjani Peak',
      elevation: '2,500 m (8,200 ft)',
      currentTemp: '4°C',
      nightTemp: '-2°C',
      status: 'Frost & Snow Risk',
      advisory: 'Black ice on shaded hairpin curves; snow chains required.'
    }
  };

  const currentZone = altitudeData[altitudeZone];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Mountain className="w-4 h-4" />
          <span>Atmospheric Telemetry & Forecast</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Live Murree Weather & 7-Day Alpine Forecast
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Direct meteorological readings for Murree Hills (lat 33.907° N, 73.390° E), precipitation probability, wind chill factors, and elevation-specific temperature comparisons.
        </p>
      </div>

      {/* Main Live Weather Station Component */}
      <WeatherCard />

      {/* Elevation Microclimate Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Elevation Microclimate Comparison</h3>
            <p className="text-xs text-slate-500">Noticeable temperature drop as you climb the 2,200m elevation gain from Islamabad</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs">
            <button
              onClick={() => setAltitudeZone('islamabad')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                altitudeZone === 'islamabad' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Islamabad (500m)
            </button>
            <button
              onClick={() => setAltitudeZone('bhurban')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                altitudeZone === 'bhurban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bhurban (1,830m)
            </button>
            <button
              onClick={() => setAltitudeZone('murree')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                altitudeZone === 'murree' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Murree Town (2,291m)
            </button>
            <button
              onClick={() => setAltitudeZone('nathiagali')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                altitudeZone === 'nathiagali' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nathia Gali (2,500m)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs text-slate-500 block">Selected Region</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">{currentZone.location}</span>
            <span className="text-xs text-slate-400 font-mono">{currentZone.elevation}</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Day / Night Temp</span>
            <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums block mt-0.5">
              {currentZone.currentTemp} / <span className="text-slate-500 font-normal">{currentZone.nightTemp}</span>
            </span>
            <span className="text-xs text-emerald-700 font-medium">{currentZone.status}</span>
          </div>

          <div className="md:col-span-2">
            <span className="text-xs text-slate-500 block">Travel & Driving Advisory</span>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
              {currentZone.advisory}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Mountain Attire based on Live Weather */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Clothing & Layering Guide</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            With temperatures dropping to near freezing point at night, carry a 3-layer system: thermal innerwear, fleece middle layer, and a windproof/waterproof down jacket.
          </p>
          <div className="text-xs text-slate-500 space-y-1 font-mono">
            <div>✓ Thermal inners + Woolen socks</div>
            <div>✓ Wind-resistant gloves & beanie</div>
            <div>✓ Insulated waterproof boots</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Fog & Rain Precaution</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Afternoon cloud condensation brings sudden visibility drop to less than 20 meters near Lower Topa and Kashmir Point.
          </p>
          <div className="text-xs text-slate-500 space-y-1 font-mono">
            <div>✓ Yellow fog lamps operational</div>
            <div>✓ Double hazard lights in dense fog</div>
            <div>✓ Windshield defogger functional</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Health & Altitude Tips</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Murree’s 2,291m altitude has lower atmospheric oxygen. Keep hydrated and walk at an unhurried pace when ascending steep stairs on Mall Road.
          </p>
          <div className="text-xs text-slate-500 space-y-1 font-mono">
            <div>✓ Carry thermos of green tea / water</div>
            <div>✓ Lip balm for dry mountain air</div>
            <div>✓ Basic altitude medication if needed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
