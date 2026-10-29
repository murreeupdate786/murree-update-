import { RoadSection, Hotel, CarRental, TourPackage, TouristSpot, Booking, NewsAlert, UserProfile } from './types';

// Image assets
export const IMAGES = {
  hero: '/src/assets/images/hero_murree_hills_1793292926548.jpg',
  mallRoad: '/src/assets/images/mall_road_murree_1793292943182.jpg',
  patriata: '/src/assets/images/patriata_chairlift_1793292942743.jpg',
  resortBhurban: '/src/assets/images/resort_bhurban_1793292943178.jpg',
};

// Initial Seed Data
const INITIAL_ROADS: RoadSection[] = [
  {
    id: 'road-1',
    name: 'Murree Expressway (M-75)',
    section: 'Barakahu Toll Plaza → Lower Topa',
    status: 'CLEAR',
    advisory: 'Dual carriageway open. Light fog near Lower Topa. Flow speed 55-65 km/h.',
    snowLevelCm: 0,
    lastUpdated: '12 mins ago',
    travelTimeMins: 45,
    distanceKm: 42,
    tollFee: 120
  },
  {
    id: 'road-2',
    name: 'Sunny Bank to Mall Road',
    section: 'Sunny Bank Chowk → Post Office / General Bus Stand',
    status: 'MODERATE_TRAFFIC',
    advisory: 'Slow moving traffic due to tourist vehicle queues. Mall Road closed for heavy vehicles.',
    snowLevelCm: 0,
    lastUpdated: '5 mins ago',
    travelTimeMins: 25,
    distanceKm: 4.5
  },
  {
    id: 'road-3',
    name: 'Old Rawalpindi-Murree Road',
    section: 'Tret → Chharra Pani → Sunny Bank',
    status: 'CLEAR',
    advisory: 'Open for all traffic. Caution advised near sharp hairpin bends at Salgran.',
    snowLevelCm: 0,
    lastUpdated: '18 mins ago',
    travelTimeMins: 60,
    distanceKm: 38
  },
  {
    id: 'road-4',
    name: 'Patriata Chairlift Access Road',
    section: 'Lower Topa Interchange → New Murree Patriata Base',
    status: 'CLEAR',
    advisory: 'Smooth transit. Parking space available at base station.',
    snowLevelCm: 0,
    lastUpdated: '22 mins ago',
    travelTimeMins: 20,
    distanceKm: 14
  },
  {
    id: 'road-5',
    name: 'Murree to Changla Gali & Nathia Gali (Galyat)',
    section: 'Kuldana → Barian → Changla Gali',
    status: 'SNOW_CHAINS_REQUIRED',
    advisory: 'Frost and slippery patches at Barian. 4x4 vehicles or tire chains strictly required by Traffic Police.',
    snowLevelCm: 4.5,
    lastUpdated: '8 mins ago',
    travelTimeMins: 50,
    distanceKm: 28
  },
  {
    id: 'road-6',
    name: 'Kashmir Point Circular Road',
    section: 'Governor House → Kashmir Point Viewpoint',
    status: 'CLEAR',
    advisory: 'One-way traffic regulation in effect. Beautiful pine forest drive.',
    snowLevelCm: 0.5,
    lastUpdated: '30 mins ago',
    travelTimeMins: 15,
    distanceKm: 3.2
  }
];

const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'hotel-pc-bhurban',
    name: 'Pearl Continental Resort Bhurban',
    tagline: '5-Star Luxury Amidst Cascading Pine Valleys',
    location: 'Bhurban, Murree',
    address: 'PC Bhurban Road, Murree Hills, Punjab',
    rating: 4.9,
    reviewsCount: 384,
    pricePerNight: 38500,
    image: IMAGES.resortBhurban,
    images: [IMAGES.resortBhurban, IMAGES.hero, IMAGES.mallRoad],
    amenities: ['Central Heating', 'Heated Indoor Pool', 'Mountain Valley View', '24/7 Power Backup', 'Fine Dining', 'Helipad Access', 'Valet Parking'],
    description: 'Perched on a cliff edge overlooking the Kashmir peaks, PC Bhurban represents Pakistan’s premier mountain resort with world-class hospitality, flower terraces, squash courts, and lavish alpine breakfast buffets.',
    phone: '+92 51 3355700',
    isFeatured: true,
    rooms: [
      { id: 'pc-r1', type: 'Deluxe Pine View King', capacity: 2, price: 38500, available: 6, features: ['King Bed', 'Balcony', 'Heating', 'Marble Bath', 'Free Breakfast'] },
      { id: 'pc-r2', type: 'Executive Mountain Suite', capacity: 3, price: 58000, available: 3, features: ['Living Room', 'Panoramic Kashmir Vista', 'Fireplace', 'Jacuzzi'] },
      { id: 'pc-r3', type: 'Family Alpine Suite', capacity: 4, price: 72000, available: 2, features: ['2 Bedrooms', 'Full Balcony', 'Butler Service', 'Dining Area'] }
    ]
  },
  {
    id: 'hotel-lockwood',
    name: 'Lockwood Hotel Murree',
    tagline: 'Historic Colonial Charm Steps from Mall Road',
    location: 'Mall Road, Murree',
    address: 'Near General Post Office, Mall Road, Murree',
    rating: 4.7,
    reviewsCount: 242,
    pricePerNight: 16500,
    image: IMAGES.mallRoad,
    images: [IMAGES.mallRoad, IMAGES.hero, IMAGES.resortBhurban],
    amenities: ['Mall Road Walkable', 'Gas & Electric Heating', 'Free High Speed WiFi', 'Free Parking', 'Traditional BBQ Restaurant', 'Standby Generator'],
    description: 'One of the oldest and most atmospheric hotels in Murree, established during the British Raj. Features cozy wood-panelled interiors, open fireplaces, and unmatched walking proximity to the Mall.',
    phone: '+92 51 3410112',
    isFeatured: true,
    rooms: [
      { id: 'lw-r1', type: 'Heritage Standard Double', capacity: 2, price: 16500, available: 8, features: ['Double Bed', 'Warm Heating', 'Tea Maker', 'Hot Water 24/7'] },
      { id: 'lw-r2', type: 'Classic Pine View Room', capacity: 2, price: 21000, available: 5, features: ['Pine Forest View', 'Antique Fireplace Decor', 'Breakfast Included'] },
      { id: 'lw-r3', type: 'Imperial Family Cottage Room', capacity: 4, price: 32000, available: 2, features: ['2 Queen Beds', 'Living Lounge', 'Separate Entrance'] }
    ]
  },
  {
    id: 'hotel-arcadian-blue',
    name: 'Arcadian Blue Pines Ridge',
    tagline: 'Serene Boutique Sanctuary in the Forest',
    location: 'Lawrence College Bypass / Ghora Gali',
    address: 'Pine Avenue, Near Lawrence College Road, Murree',
    rating: 4.8,
    reviewsCount: 178,
    pricePerNight: 22000,
    image: IMAGES.hero,
    images: [IMAGES.hero, IMAGES.patriata, IMAGES.resortBhurban],
    amenities: ['100% Pine Valley Views', 'Silent Forest Setting', 'Underfloor Heating', 'Bonfire Nights', 'Chef Table Restaurant', 'Private Lawn'],
    description: 'Tucked away from city crowds amidst whispering deodars, Arcadian Blue Pines provides clean contemporary alpine aesthetics, floor-to-ceiling glass windows, and starlit night skies.',
    phone: '+92 305 5551234',
    isFeatured: true,
    rooms: [
      { id: 'ab-r1', type: 'Forest Canopy Queen', capacity: 2, price: 22000, available: 4, features: ['Forest Panorama', 'Underfloor Heating', 'Espresso Machine'] },
      { id: 'ab-r2', type: 'Skyline Terrace Loft', capacity: 3, price: 34000, available: 3, features: ['Private Wooden Deck', 'Sunset View', 'Smart TV'] }
    ]
  },
  {
    id: 'hotel-shangrila-murree',
    name: 'Shangrila Resort Murree',
    tagline: 'Peaceful Valley Retreat Near Lower Topa',
    location: 'Lower Topa, Murree',
    address: 'Main Murree Expressway link, Lower Topa',
    rating: 4.6,
    reviewsCount: 195,
    pricePerNight: 14000,
    image: IMAGES.patriata,
    images: [IMAGES.patriata, IMAGES.mallRoad, IMAGES.hero],
    amenities: ['Expressway Quick Access', 'Generator 24/7', 'Restaurant', 'Kids Play Zone', 'Spacious Parking', 'Hot Water'],
    description: 'Ideal for families seeking effortless expressway access without navigating town traffic. Surrounded by green stepped slopes with generous on-site parking.',
    phone: '+92 51 3410582',
    rooms: [
      { id: 'sh-r1', type: 'Standard Valley King', capacity: 2, price: 14000, available: 10, features: ['King Bed', 'Heating', 'Mountain Breeze'] },
      { id: 'sh-r2', type: 'Deluxe Family Suite', capacity: 4, price: 24000, available: 4, features: ['Two Interconnected Rooms', 'Balcony', 'Breakfast'] }
    ]
  }
];

const INITIAL_CARS: CarRental[] = [
  {
    id: 'car-prado',
    title: 'Toyota Land Cruiser Prado TX (4x4)',
    category: '4x4 SUV',
    dailyRate: 18000,
    seating: 7,
    transmission: 'Automatic',
    isWithDriver: true,
    fuelIncluded: false,
    image: IMAGES.hero,
    features: ['4WD Terrain Control', 'Snow Chain Kit Ready', 'Experienced Mountain Chauffeur', 'Heated Leather Seats', 'Luggage Carrier']
  },
  {
    id: 'car-fortuner',
    title: 'Toyota Fortuner 2.8L Sigma 4',
    category: '4x4 SUV',
    dailyRate: 20000,
    seating: 7,
    transmission: 'Automatic',
    isWithDriver: true,
    fuelIncluded: false,
    image: IMAGES.patriata,
    features: ['High Ground Clearance', 'Dual AC & Heater', 'Hill Descent Assist', 'Smooth Expressway Ride']
  },
  {
    id: 'car-corolla',
    title: 'Toyota Corolla Altis 1.6 Grande',
    category: 'Sedan',
    dailyRate: 8500,
    seating: 4,
    transmission: 'Automatic',
    isWithDriver: true,
    fuelIncluded: false,
    image: IMAGES.mallRoad,
    features: ['Comfortable Family Sedan', 'Air Conditioned / Heated', 'Courteous Driver', 'Islamabad Airport Pickup']
  },
  {
    id: 'car-hiace',
    title: 'Toyota Hiace Grand Cabin (14-Seater)',
    category: 'Van & Hiace',
    dailyRate: 16500,
    seating: 14,
    transmission: 'Manual',
    isWithDriver: true,
    fuelIncluded: false,
    image: IMAGES.resortBhurban,
    features: ['Spacious Reclining Seats', 'High Roof', 'Dedicated Roof Luggage Rack', 'Ideal for Large Family & Corporate Tours']
  },
  {
    id: 'car-alto',
    title: 'Suzuki Alto 660cc VXR',
    category: 'Compact',
    dailyRate: 4500,
    seating: 4,
    transmission: 'Manual',
    isWithDriver: false,
    fuelIncluded: false,
    image: IMAGES.mallRoad,
    features: ['Ultra Fuel Efficient', 'Easy Narrow Mountain Parking', 'Self Drive Option Available']
  }
];

const INITIAL_TOURS: TourPackage[] = [
  {
    id: 'tour-patriata-day',
    title: 'Patriata Chairlift & Cable Car Day Adventure',
    duration: '1 Full Day (8 Hours)',
    price: 12500,
    highlights: ['VIP Cable Car ride to highest Murree peak', 'Horse riding at Patriata Ridge', 'Stop at Chharra Pani herbal tea spot', 'Private round-trip transfer'],
    pickupPoint: 'Islamabad / Rawalpindi or Murree Mall Road',
    image: IMAGES.patriata
  },
  {
    id: 'tour-galyat-pipeline',
    title: 'Nathia Gali, Ayubia & Dunga Gali Pipeline Track',
    duration: '1 Day (10 Hours)',
    price: 15500,
    highlights: ['Scenic 4km walking trek through Ayubia pine woods', 'Miranjani mountain viewpoint stop', 'Traditional Patiala Chai & Pakoras', 'Snow chain equipped vehicle'],
    pickupPoint: 'Murree Mall Road / Lower Topa',
    image: IMAGES.hero
  },
  {
    id: 'tour-bhurban-heritage',
    title: 'Murree Heritage, Mall Road & Bhurban Scenic Tour',
    duration: '6 Hours',
    price: 9500,
    highlights: ['Colonial Holy Trinity Church visit', 'Kashmir Point sunset panorama', 'PC Bhurban garden terrace walk', 'Local Mall Road pine nut shopping'],
    pickupPoint: 'Murree GPO Mall Road',
    image: IMAGES.mallRoad
  }
];

const INITIAL_PLACES: TouristSpot[] = [
  {
    id: 'place-mall-road',
    name: 'Mall Road Murree',
    altitude: '2,291 m (7,516 ft)',
    distance: 'Town Center',
    bestTime: 'Evening strolls (5 PM - 11 PM), Winter snow',
    entryFee: 'Free (Pedestrianized)',
    image: IMAGES.mallRoad,
    description: 'The vibrant heart and historical artery of Murree, lined with colonial stone buildings, handicraft shops, traditional wool shawls, Kashmiri dry fruits, sizzling Karahi restaurants, and aromatic street chai.',
    activities: ['Shopping for pashminas and wood carvings', 'Dining at traditional cafes', 'Evening photography under heritage lamp posts', 'Street food tasting (Chana Chaat, Hot Corn)'],
    tips: 'Strictly pedestrian only. Park at Sunny Bank or General Bus Stand and take the local green shuttle.'
  },
  {
    id: 'place-patriata',
    name: 'Patriata (New Murree Cable Car)',
    altitude: '2,240 m (7,350 ft)',
    distance: '15 km from Mall Road',
    bestTime: 'Morning hours (9 AM - 2 PM) to avoid queues',
    entryFee: 'Chairlift + Cable Car: PKR 950 / adult',
    image: IMAGES.patriata,
    description: 'Famous for its world-class dual transit system: first a chairlift skimming above pine trees, followed by a panoramic enclosed cable car rising to the Patriata peak with vistas extending to Kashmir.',
    activities: ['Cable car & chairlift joyrides', 'Pine ridge horse trekking', 'Snow sledging (winter)', 'High-altitude nature picnic'],
    tips: 'Check weather beforehand; operations pause during severe high-wind or thunderstorm advisories.'
  },
  {
    id: 'place-kashmir-point',
    name: 'Kashmir Point & Governor House',
    altitude: '2,320 m (7,611 ft)',
    distance: '1.5 km from Mall Road',
    bestTime: 'Sunrise and Golden Hour Sunset',
    entryFee: 'Free',
    image: IMAGES.hero,
    description: 'The highest elevation viewpoint in Murree town. On clear days, travelers can see the snow-clad peaks of the Pir Panjal range in Kashmir with telescopes mounted on the stone balustrades.',
    activities: ['Panoramic telescope viewing', 'Murree Safari Train ride for kids', 'Quiet pine forest morning jogs', 'Forest sunset photography'],
    tips: 'Much quieter and calmer than Mall Road. A gentle 20-minute uphill walk from GPO.'
  },
  {
    id: 'place-pindi-point',
    name: 'Pindi Point & Scenic Chairlift',
    altitude: '2,150 m (7,053 ft)',
    distance: '2 km from Mall Road',
    bestTime: 'Nighttime & Sunset',
    entryFee: 'Viewpoint Free, Chairlift PKR 400',
    image: IMAGES.resortBhurban,
    description: 'Perched on the southern edge facing the plains. By day you can view the winding Rawalpindi-Murree highway, and by night the twinkling lights of Rawalpindi and Islamabad sparkle below.',
    activities: ['Night city-lights panorama', '1.5 km open chairlift into the pine valley', 'Hot coffee & corn on the cob'],
    tips: 'Wrap up warmly; southern valley winds pick up sharply after dusk.'
  },
  {
    id: 'place-bhurban',
    name: 'Bhurban & Golf Valley',
    altitude: '1,830 m (6,000 ft)',
    distance: '11 km from Mall Road',
    bestTime: 'Spring blooms and Autumn foliage',
    entryFee: 'Resort grounds access free for guests/diners',
    image: IMAGES.resortBhurban,
    description: 'A serene luxury enclave surrounded by terraced floral gardens, 9-hole mountain golf terrain, and opulent mountain architecture away from tourist congestion.',
    activities: ['Mountain golf putting', 'Fine dining on alpine terraces', 'Gentle flora nature trails'],
    tips: 'Accessed smoothly via the Murree-Kashmir highway link.'
  },
  {
    id: 'place-ayubia',
    name: 'Ayubia National Park & Pipeline Track',
    altitude: '2,400 m (7,874 ft)',
    distance: '26 km from Murree',
    bestTime: 'May to October, and Winter Snow Treks',
    entryFee: 'National Park: PKR 100',
    image: IMAGES.hero,
    description: 'Rich biodiversity reserve featuring leopards, flying squirrels, and centuries-old Himalayan cedars. The historic Dunga Gali to Ayubia Pipeline Track is a flat, easy 4 km path along gravity-fed water pipes.',
    activities: ['Birdwatching & wildlife tracking', 'Historic pipeline walking trek', 'Ayubia chairlift ride', 'Camping & botanical exploration'],
    tips: 'Wear sturdy walking boots. In winter, microspikes or trekking poles are recommended.'
  }
];

const INITIAL_NEWS: NewsAlert[] = [
  {
    id: 'news-1',
    title: 'Murree Expressway (M-75) Fully Operational with 24/7 Traffic Police Deployment',
    category: 'Traffic Alert',
    severity: 'Info',
    summary: 'Dual carriageway clear from Islamabad to Lower Topa. 18 dedicated mobile squads positioned for smooth flow.',
    content: 'City Traffic Police Murree has confirmed that all entry lanes via M-75 Expressway and Old Rawalpindi Road are operating normally. Travelers are reminded to ensure their vehicle brakes, heaters, and wipers are properly serviced before ascending.',
    source: 'Chief Traffic Officer Murree',
    date: 'Today, 08:30 AM',
    isPinned: true
  },
  {
    id: 'news-2',
    title: 'Galyat Road Advisory: Snow Chains Mandatory Above Barian & Changla Gali',
    category: 'Snow Warning',
    severity: 'High',
    summary: 'Sub-zero nighttime temperatures creating black ice patches. Only 4x4 or chained tires permitted past Barian.',
    content: 'Due to frost formation on shaded hairpin bends between Barian and Changla Gali, local administration has set up a mandatory checkpoint. Rescue 1122 and Highway department salt-sprinkling trucks are active on the route.',
    source: 'District Disaster Management Authority (DDMA)',
    date: 'Yesterday, 10:15 PM',
    isPinned: true
  },
  {
    id: 'news-3',
    title: 'Mall Road Murree Multi-Story Parking Complex Status: 320 Bays Available',
    category: 'Tourism Event',
    severity: 'Info',
    summary: 'New digital parking signage installed at Sunny Bank advising drivers on real-time Mall Road garage occupancy.',
    content: 'To prevent gridlock along Post Office Road, tourists are requested to use the designated municipal parking plazas at Sunny Bank, General Bus Stand, and Kashmir Point shuttle link.',
    source: 'Murree Development Authority',
    date: 'Oct 28, 2026',
    isPinned: false
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-001',
    bookingNumber: 'MUR-2026-8941',
    type: 'HOTEL',
    itemTitle: 'Pearl Continental Resort Bhurban - Deluxe Pine View King',
    hotelId: 'hotel-pc-bhurban',
    roomType: 'Deluxe Pine View King',
    customerName: 'Muhammad Arslan',
    customerPhone: '+92 300 1234567',
    customerEmail: 'arslan.travel@gmail.com',
    checkInDate: '2026-11-05',
    checkOutDate: '2026-11-08',
    guests: 2,
    totalAmount: 115500,
    status: 'CONFIRMED',
    paymentMethod: 'Pay on Arrival',
    notes: 'Arriving by private car around 3 PM. Request high floor room.',
    createdAt: '2026-10-27T14:20:00Z'
  },
  {
    id: 'book-002',
    bookingNumber: 'MUR-2026-7215',
    type: 'CAR',
    itemTitle: 'Toyota Land Cruiser Prado TX (4x4) with Chauffeur',
    carId: 'car-prado',
    customerName: 'Zainab Fatima',
    customerPhone: '+92 321 9876543',
    customerEmail: 'zainab.f@outlook.com',
    checkInDate: '2026-11-10',
    checkOutDate: '2026-11-12',
    guests: 5,
    totalAmount: 36000,
    status: 'CONFIRMED',
    paymentMethod: 'JazzCash',
    notes: 'Pickup from Islamabad Airport Terminal 1 at 10:00 AM.',
    createdAt: '2026-10-28T09:15:00Z'
  }
];

// Database Storage Manager
class MurreeDatabase {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(`murree_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`murree_${key}`, JSON.stringify(value));
    } catch {
      // storage unavailable
    }
  }

  getRoads(): RoadSection[] {
    return this.get<RoadSection[]>('roads', INITIAL_ROADS);
  }

  updateRoad(id: string, updates: Partial<RoadSection>): void {
    const list = this.getRoads().map(r => r.id === id ? { ...r, ...updates, lastUpdated: 'Just now' } : r);
    this.set('roads', list);
  }

  getHotels(): Hotel[] {
    return this.get<Hotel[]>('hotels', INITIAL_HOTELS);
  }

  getHotelById(id: string): Hotel | undefined {
    return this.getHotels().find(h => h.id === id);
  }

  addHotel(hotel: Hotel): void {
    const list = [hotel, ...this.getHotels()];
    this.set('hotels', list);
  }

  getCars(): CarRental[] {
    return this.get<CarRental[]>('cars', INITIAL_CARS);
  }

  getTours(): TourPackage[] {
    return this.get<TourPackage[]>('tours', INITIAL_TOURS);
  }

  getPlaces(): TouristSpot[] {
    return this.get<TouristSpot[]>('places', INITIAL_PLACES);
  }

  getNews(): NewsAlert[] {
    return this.get<NewsAlert[]>('news', INITIAL_NEWS);
  }

  addNews(alert: NewsAlert): void {
    const list = [alert, ...this.getNews()];
    this.set('news', list);
  }

  getBookings(): Booking[] {
    return this.get<Booking[]>('bookings', INITIAL_BOOKINGS);
  }

  createBooking(booking: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt'>): Booking {
    const id = `book-${Date.now()}`;
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `MUR-${new Date().getFullYear()}-${randCode}`;
    const newBooking: Booking = {
      ...booking,
      id,
      bookingNumber,
      createdAt: new Date().toISOString()
    };
    const list = [newBooking, ...this.getBookings()];
    this.set('bookings', list);
    return newBooking;
  }

  cancelBooking(id: string): void {
    const list = this.getBookings().map(b => b.id === id ? { ...b, status: 'CANCELLED' as const } : b);
    this.set('bookings', list);
  }

  resetToDefault(): void {
    localStorage.removeItem('murree_roads');
    localStorage.removeItem('murree_hotels');
    localStorage.removeItem('murree_cars');
    localStorage.removeItem('murree_news');
    localStorage.removeItem('murree_bookings');
  }
}

export const db = new MurreeDatabase();
