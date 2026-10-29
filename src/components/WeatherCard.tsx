import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Mountain, RefreshCw, AlertCircle, Thermometer } from 'lucide-react';
import { MurreeWeather } from '../lib/types';
import { fetchMurreeWeather, getFallbackWeather } from '../lib/weather-api';

interface WeatherCardProps {
  compact?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ compact = false }) => {
  const [weather, setWeather] = useState<MurreeWeather>(getFallbackWeather());
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchMurreeWeather();
      setWeather(data);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Periodic refresh every 5 mins
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (cond: string) => {
    const lower = cond.toLowerCase();
    if (lower.includes('snow') || lower.includes('flurr')) {
      return <CloudSnow className="w-6 h-6 text-sky-500" />;
    }
    if (lower.includes('rain') || lower.includes('drizzle')) {
      return <CloudRain className="w-6 h-6 text-blue-500" />;
    }
    if (lower.includes('clear') || lower.includes('sun')) {
      return <Sun className="w-6 h-6 text-amber-500" />;
    }
    return <Cloud className="w-6 h-6 text-slate-400" />;
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-900 tracking-tight">Murree Hills Weather</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Alt: 2,291m</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {weather.temp}°C
              </div>
              <div className="text-xs text-slate-500">{weather.condition}</div>
            </div>
          </div>
          <div className="text-right text-xs text-slate-600 space-y-1">
            <div>Feels: <span className="font-mono tabular-nums font-semibold">{weather.feelsLike}°C</span></div>
            <div>Wind: <span className="font-mono tabular-nums">{weather.windSpeed} km/h</span></div>
          </div>
        </div>

        {weather.snowWarning && (
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-800 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Active snowfall / Frost warning on Galyat passes</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-base tracking-tight text-white">Live Murree & Galyat Weather Station</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinates: 33.907° N, 73.390° E · Elevation: 2,291 meters (7,516 ft)
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">Updated: <span className="text-slate-200 font-mono">{lastRefreshed}</span></span>
          <button
            onClick={loadData}
            disabled={loading}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Live Weather"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Main Temp */}
          <div className="md:col-span-2 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                  {weather.temp}°C
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  Feels like {weather.feelsLike}°C
                </span>
              </div>
              <p className="text-base font-semibold text-slate-800 mt-0.5">{weather.condition}</p>
              <p className="text-xs text-slate-500 mt-1">{weather.description}</p>
            </div>
          </div>

          {/* Meteorological metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>Humidity</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {weather.humidity}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span>Wind Speed</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {weather.windSpeed} km/h
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                <span>Road Ice Risk</span>
              </div>
              <div className={`font-semibold text-sm ${weather.roadIceRisk === 'Severe' ? 'text-red-700' : weather.roadIceRisk === 'Moderate' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {weather.roadIceRisk}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <CloudSnow className="w-3.5 h-3.5 text-sky-500" />
                <span>Snow Alert</span>
              </div>
              <div className="font-semibold text-sm text-slate-800">
                {weather.snowWarning ? 'Snow Advisory' : 'Normal'}
              </div>
            </div>
          </div>

          {/* Travel Advice Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
            <span className="font-bold block mb-1">Road Travel Recommendation</span>
            <p className="leading-relaxed text-emerald-900">
              {weather.roadIceRisk === 'Severe'
                ? 'High freezing risk. Strictly avoid late-night travel; carry tire snow chains.'
                : weather.roadIceRisk === 'Moderate'
                ? 'Wet and slippery patches on curves. Maintain 40 km/h speed limit on descents.'
                : 'Excellent driving visibility on M-75. Normal daylight transit recommended.'}
            </p>
          </div>
        </div>

        {/* Hourly Forecast Strip */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Next 8 Hours Alpine Trend
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {weather.hourly.map((h, i) => (
              <div key={i} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 text-center">
                <span className="text-[11px] text-slate-500 block mb-1 font-mono">{h.time}</span>
                <span className="text-sm font-bold text-slate-900 font-mono block tabular-nums">{h.temp}°C</span>
                <span className="text-[11px] text-slate-600 truncate block mt-0.5">{h.condition}</span>
                <span className="text-[10px] text-blue-600 block mt-1 font-mono">
                  {h.precipitationProb}% rain
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast Strip */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            7-Day Weather & Snow Forecast
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2.5">
            {weather.daily.map((day, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center transition-all ${
                  i === 0 ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50/60 border-slate-200/80'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">{day.day}</span>
                <span className="text-[11px] text-slate-500 block mb-2">{day.date}</span>
                <div className="flex justify-center mb-1">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs font-mono font-bold text-slate-900 tabular-nums">
                  {day.tempMax}° / <span className="text-slate-500 font-normal">{day.tempMin}°</span>
                </div>
                <span className="text-[11px] text-slate-600 block mt-1 truncate">{day.condition}</span>
                {day.snowProb > 20 && (
                  <span className="text-[10px] font-mono text-sky-700 block mt-1 font-medium">
                    {day.snowProb}% snow
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
