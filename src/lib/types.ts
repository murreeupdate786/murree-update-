export type RoadStatus =
  | 'CLEAR'
  | 'MODERATE_TRAFFIC'
  | 'HEAVY_TRAFFIC'
  | 'SNOW_CHAINS_REQUIRED'
  | 'TEMPORARILY_BLOCKED';

export interface RoadSection {
  id: string;
  name: string;
  section: string;
  status: RoadStatus;
  advisory: string;
  snowLevelCm: number;
  lastUpdated: string;
  travelTimeMins: number;
  distanceKm: number;
  tollFee?: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  precipitationProb: number;
  snowProb: number;
}

export interface DailyForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  snowProb: number;
  rainMm: number;
}

export interface MurreeWeather {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibilityKm: number;
  elevationM: number;
  roadIceRisk: 'Low' | 'Moderate' | 'Severe';
  snowWarning: boolean;
  snowfallExpectedCm: number;
  lastUpdated: string;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface RoomOption {
  id: string;
  type: string;
  capacity: number;
  price: number;
  available: number;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  phone: string;
  rooms: RoomOption[];
  isFeatured?: boolean;
}

export interface CarRental {
  id: string;
  title: string;
  category: '4x4 SUV' | 'Sedan' | 'Van & Hiace' | 'Compact';
  dailyRate: number;
  seating: number;
  transmission: 'Automatic' | 'Manual';
  isWithDriver: boolean;
  fuelIncluded: boolean;
  image: string;
  features: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  highlights: string[];
  pickupPoint: string;
  image: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  altitude: string;
  distance: string;
  bestTime: string;
  entryFee: string;
  image: string;
  description: string;
  activities: string[];
  tips: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  type: 'HOTEL' | 'CAR' | 'TOUR';
  itemTitle: string;
  hotelId?: string;
  roomType?: string;
  carId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  paymentMethod: string;
  notes?: string;
  createdAt: string;
}

export interface NewsAlert {
  id: string;
  title: string;
  category: 'Weather Advisory' | 'Traffic Alert' | 'Snow Warning' | 'Tourism Event';
  severity: 'High' | 'Moderate' | 'Info';
  summary: string;
  content: string;
  source: string;
  date: string;
  isPinned: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN';
}
