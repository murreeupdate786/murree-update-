import { MurreeWeather, DailyForecast, HourlyForecast } from './types';

// Murree geographic coordinates
const MURREE_LAT = 33.907;
const MURREE_LON = 73.3903;
const MURREE_ELEVATION = 2291; // meters

function decodeWmoCode(code: number): { condition: string; description: string; isSnow: boolean } {
  if (code === 0) return { condition: 'Sunny / Clear', description: 'Crystal clear alpine skies, pleasant sunshine', isSnow: false };
  if (code === 1 || code === 2) return { condition: 'Partly Cloudy', description: 'Mild mountain clouds with cool breeze', isSnow: false };
  if (code === 3) return { condition: 'Overcast', description: 'Dense cloud cover over Galyat hills', isSnow: false };
  if (code === 45 || code === 48) return { condition: 'Misty / Fog', description: 'Heavy fog on Mall Road & Lower Topa, low visibility', isSnow: false };
  if (code >= 51 && code <= 57) return { condition: 'Light Drizzle', description: 'Cool drizzle across Murree ridge', isSnow: false };
  if (code >= 61 && code <= 67) return { condition: 'Rain', description: 'Steady mountain rain, slippery roads', isSnow: false };
  if (code >= 71 && code <= 77) return { condition: 'Snowfall', description: 'Active snowfall, tire snow chains advised', isSnow: true };
  if (code >= 80 && code <= 82) return { condition: 'Rain Showers', description: 'Intermittent brisk rain showers', isSnow: false };
  if (code === 85 || code === 86) return { condition: 'Snow Showers', description: 'Flurries & moderate snow accumulating', isSnow: true };
  if (code >= 95) return { condition: 'Thunderstorm', description: 'Mountain thunderstorm with lightning advisory', isSnow: false };
  return { condition: 'Cloudy', description: 'Typical cool Murree mountain atmosphere', isSnow: false };
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export async function fetchMurreeWeather(): Promise<MurreeWeather> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${MURREE_LAT}&longitude=${MURREE_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,snowfall,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_sum&timezone=Asia%2FKarachi`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error('Weather API responded with error');
    
    const data = await response.json();
    const currentCode = data.current?.weather_code ?? 2;
    const { condition, description, isSnow } = decodeWmoCode(currentCode);
    const temp = Math.round(data.current?.temperature_2m ?? 9);
    const feelsLike = Math.round(data.current?.apparent_temperature ?? 7);
    const humidity = Math.round(data.current?.relative_humidity_2m ?? 68);
    const windSpeed = Math.round(data.current?.wind_speed_10m ?? 12);
    
    // Hourly next 8 hours
    const hourlyList: HourlyForecast[] = [];
    const hourlyTimes = data.hourly?.time || [];
    const currentHourIndex = Math.max(0, new Date().getHours());
    
    for (let i = currentHourIndex; i < Math.min(currentHourIndex + 8, hourlyTimes.length); i++) {
      const timeStr = hourlyTimes[i] ? new Date(hourlyTimes[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${i % 24}:00`;
      const hCode = data.hourly?.weather_code?.[i] ?? 2;
      const hCond = decodeWmoCode(hCode).condition;
      hourlyList.push({
        time: timeStr,
        temp: Math.round(data.hourly?.temperature_2m?.[i] ?? temp),
        condition: hCond,
        precipitationProb: Math.round(data.hourly?.precipitation_probability?.[i] ?? 20),
        snowProb: Math.round((data.hourly?.snowfall?.[i] ?? 0) > 0 ? 60 : 5)
      });
    }

    // Daily next 7 days
    const dailyList: DailyForecast[] = [];
    const dailyTimes = data.daily?.time || [];
    for (let i = 0; i < Math.min(7, dailyTimes.length); i++) {
      const d = new Date(dailyTimes[i]);
      const dayName = i === 0 ? 'Today' : DAYS[d.getDay()];
      const dCode = data.daily?.weather_code?.[i] ?? 2;
      const snowSum = data.daily?.snowfall_sum?.[i] ?? 0;
      dailyList.push({
        day: dayName,
        date: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        tempMax: Math.round(data.daily?.temperature_2m_max?.[i] ?? 13),
        tempMin: Math.round(data.daily?.temperature_2m_min?.[i] ?? 3),
        condition: decodeWmoCode(dCode).condition,
        snowProb: snowSum > 0 ? 80 : 10,
        rainMm: Math.round((data.daily?.precipitation_sum?.[i] ?? 0) * 10) / 10
      });
    }

    const roadIceRisk: 'Low' | 'Moderate' | 'Severe' = temp <= 0 ? 'Severe' : temp <= 3 ? 'Moderate' : 'Low';

    return {
      temp,
      feelsLike,
      condition,
      description,
      humidity,
      windSpeed,
      visibilityKm: currentCode === 45 || currentCode === 48 ? 1.5 : 9.8,
      elevationM: MURREE_ELEVATION,
      roadIceRisk,
      snowWarning: isSnow || temp <= 1,
      snowfallExpectedCm: isSnow ? 6 : 0,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hourly: hourlyList.length > 0 ? hourlyList : getFallbackHourly(),
      daily: dailyList.length > 0 ? dailyList : getFallbackDaily()
    };
  } catch {
    // Return resilient fallback
    return getFallbackWeather();
  }
}

function getFallbackHourly(): HourlyForecast[] {
  return [
    { time: '10:00 AM', temp: 8, condition: 'Partly Cloudy', precipitationProb: 15, snowProb: 5 },
    { time: '12:00 PM', temp: 11, condition: 'Misty Sunshine', precipitationProb: 10, snowProb: 0 },
    { time: '02:00 PM', temp: 13, condition: 'Sunny / Mild', precipitationProb: 10, snowProb: 0 },
    { time: '04:00 PM', temp: 10, condition: 'Partly Cloudy', precipitationProb: 20, snowProb: 5 },
    { time: '06:00 PM', temp: 7, condition: 'Cool Fog', precipitationProb: 30, snowProb: 10 },
    { time: '08:00 PM', temp: 5, condition: 'Chilly Evening', precipitationProb: 35, snowProb: 20 },
    { time: '10:00 PM', temp: 3, condition: 'Crisp Night', precipitationProb: 40, snowProb: 30 }
  ];
}

function getFallbackDaily(): DailyForecast[] {
  return [
    { day: 'Today', date: 'Oct 29', tempMax: 12, tempMin: 4, condition: 'Partly Cloudy', snowProb: 10, rainMm: 0.5 },
    { day: 'Thu', date: 'Oct 30', tempMax: 11, tempMin: 3, condition: 'Misty / Fog', snowProb: 20, rainMm: 1.2 },
    { day: 'Fri', date: 'Oct 31', tempMax: 9, tempMin: 2, condition: 'Chilly Rain', snowProb: 40, rainMm: 4.8 },
    { day: 'Sat', date: 'Nov 01', tempMax: 7, tempMin: 0, condition: 'Flurries & Cold', snowProb: 65, rainMm: 6.0 },
    { day: 'Sun', date: 'Nov 02', tempMax: 8, tempMin: 1, condition: 'Snow Showers', snowProb: 75, rainMm: 8.5 },
    { day: 'Mon', date: 'Nov 03', tempMax: 10, tempMin: 2, condition: 'Sunny / Clear', snowProb: 15, rainMm: 0 },
    { day: 'Tue', date: 'Nov 04', tempMax: 12, tempMin: 3, condition: 'Clear Sky', snowProb: 5, rainMm: 0 }
  ];
}

export function getFallbackWeather(): MurreeWeather {
  return {
    temp: 8,
    feelsLike: 6,
    condition: 'Partly Cloudy',
    description: 'Chilly autumn alpine breeze with mist creeping around Lower Topa',
    humidity: 65,
    windSpeed: 14,
    visibilityKm: 7.5,
    elevationM: MURREE_ELEVATION,
    roadIceRisk: 'Low',
    snowWarning: false,
    snowfallExpectedCm: 0,
    lastUpdated: 'Just now',
    hourly: getFallbackHourly(),
    daily: getFallbackDaily()
  };
}
