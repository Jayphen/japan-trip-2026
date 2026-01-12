export interface DayPlan {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  hotel: string;
  hotelUrl?: string;
  mainActivity: string;
  logistics?: string;
  trainInfo?: string;
}

export const TRIP_START = "2026-01-29";
export const TRIP_END = "2026-02-17";

export const itinerary: Record<string, DayPlan> = {
  "2026-01-29": {
    date: "2026-01-29",
    dayNumber: 1,
    hotel: "Tosei Hotel Cocone Asakusa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Tosei+Hotel+Cocone+Asakusa",
    mainActivity: "Arrival Day",
    logistics: "Pick up Skyliner tickets",
  },
  "2026-01-30": {
    date: "2026-01-30",
    dayNumber: 2,
    hotel: "Tosei Hotel Cocone Asakusa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Tosei+Hotel+Cocone+Asakusa",
    mainActivity: "Tokyo Explore",
  },
  "2026-01-31": {
    date: "2026-01-31",
    dayNumber: 3,
    hotel: "Tosei Hotel Cocone Asakusa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Tosei+Hotel+Cocone+Asakusa",
    mainActivity: "Tokyo Explore",
  },
  "2026-02-01": {
    date: "2026-02-01",
    dayNumber: 4,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week Begins",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-02": {
    date: "2026-02-02",
    dayNumber: 5,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-03": {
    date: "2026-02-03",
    dayNumber: 6,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-04": {
    date: "2026-02-04",
    dayNumber: 7,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-05": {
    date: "2026-02-05",
    dayNumber: 8,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-06": {
    date: "2026-02-06",
    dayNumber: 9,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
  },
  "2026-02-07": {
    date: "2026-02-07",
    dayNumber: 10,
    hotel: "Prince Smart Inn Atami",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Prince+Smart+Inn+Atami",
    mainActivity: "Izu Trip",
    logistics: "Ship luggage to Kyoto Gate Hotel in morning",
    trainInfo: "Saphir Odoriko (Tokyo → Kawazu)",
  },
  "2026-02-08": {
    date: "2026-02-08",
    dayNumber: 11,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Travel to Kyoto",
    trainInfo: "Shinkansen Atami → Kyoto (Seat E)",
  },
  "2026-02-09": {
    date: "2026-02-09",
    dayNumber: 12,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Kyoto Exploration",
  },
  "2026-02-10": {
    date: "2026-02-10",
    dayNumber: 13,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Kyoto Exploration",
  },
  "2026-02-11": {
    date: "2026-02-11",
    dayNumber: 14,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Nara Day Trip",
  },
  "2026-02-12": {
    date: "2026-02-12",
    dayNumber: 15,
    hotel: "The Knot Hiroshima",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Knot+Hiroshima",
    mainActivity: "Travel to Hiroshima",
    logistics: "Ship luggage to Royal Park Canvas Ginza",
    trainInfo: "Shinkansen Kyoto → Hiroshima",
  },
  "2026-02-13": {
    date: "2026-02-13",
    dayNumber: 16,
    hotel: "Royal Park Canvas Ginza",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Park+Canvas+Ginza+Tokyo",
    mainActivity: "Return to Tokyo",
    trainInfo: "Shinkansen Hiroshima → Tokyo",
  },
  "2026-02-14": {
    date: "2026-02-14",
    dayNumber: 17,
    hotel: "Royal Park Canvas Ginza",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Park+Canvas+Ginza+Tokyo",
    mainActivity: "Valentine's Day - teamLab Planets at 10:00 AM",
  },
  "2026-02-15": {
    date: "2026-02-15",
    dayNumber: 18,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Move to Akasaka - Relax in Onsen",
  },
  "2026-02-16": {
    date: "2026-02-16",
    dayNumber: 19,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Free Day - Shibuya Sky at Sunset",
    logistics: "Book Shibuya Sky on Jan 16",
  },
  "2026-02-17": {
    date: "2026-02-17",
    dayNumber: 20,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Departure Day",
    logistics: "Flight departs 22:45",
  },
};

export function getDayPlan(date: Date): DayPlan | null {
  const dateStr = date.toISOString().split("T")[0];
  return itinerary[dateStr] || null;
}

export function isBeforeTrip(date: Date): boolean {
  const dateStr = date.toISOString().split("T")[0];
  return dateStr < TRIP_START;
}

export function isDuringTrip(date: Date): boolean {
  const dateStr = date.toISOString().split("T")[0];
  return dateStr >= TRIP_START && dateStr <= TRIP_END;
}

export function getDaysUntilTrip(date: Date): number {
  const tripStart = new Date(TRIP_START);
  const diffTime = tripStart.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
