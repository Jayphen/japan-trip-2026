export interface Activity {
  name: string;
  description?: string;
  time?: string;
  imageUrl?: string;
  tip?: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  hotel: string;
  hotelUrl?: string;
  mainActivity: string;
  logistics?: string;
  trainInfo?: string;
  // Enhanced fields
  region: string;
  heroImage?: string;
  heroImageAlt?: string;
  activities?: Activity[];
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
    region: "Tokyo - Asakusa",
    heroImage: "https://images.pexels.com/photos/14703207/pexels-photo-14703207.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Kaminarimon Gate at Senso-ji Temple, Asakusa",
    activities: [
      {
        name: "Narita to Asakusa",
        description: "Take the Skyliner from Narita Airport to Ueno, then transfer to Asakusa",
        tip: "Pick up pre-purchased Skyliner tickets at the airport counter"
      },
      {
        name: "Check into Hotel",
        description: "Tosei Hotel Cocone Asakusa Kuramae - close to Senso-ji Temple",
      },
      {
        name: "Evening Walk to Senso-ji",
        description: "Visit the iconic Kaminarimon Gate and Nakamise Shopping Street",
        tip: "The temple is beautifully lit at night with fewer crowds"
      }
    ]
  },
  "2026-01-30": {
    date: "2026-01-30",
    dayNumber: 2,
    hotel: "Tosei Hotel Cocone Asakusa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Tosei+Hotel+Cocone+Asakusa",
    mainActivity: "Tokyo Explore",
    region: "Tokyo - Asakusa",
    heroImage: "https://images.pexels.com/photos/14703207/pexels-photo-14703207.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Kaminarimon Gate at Senso-ji Temple, Asakusa",
    activities: [
      {
        name: "Senso-ji Temple",
        description: "Explore Tokyo's oldest temple in daylight - don't miss the five-story pagoda",
        tip: "Visit early morning (before 9am) to avoid the crowds"
      },
      {
        name: "Nakamise Shopping Street",
        description: "Browse traditional souvenirs, snacks, and crafts along the 250m shopping street"
      },
      {
        name: "Sumida River Walk",
        description: "Stroll along the Sumida River with views of Tokyo Skytree"
      }
    ]
  },
  "2026-01-31": {
    date: "2026-01-31",
    dayNumber: 3,
    hotel: "Tosei Hotel Cocone Asakusa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Tosei+Hotel+Cocone+Asakusa",
    mainActivity: "Tokyo Explore",
    region: "Tokyo - Asakusa",
    heroImage: "https://images.pexels.com/photos/14703207/pexels-photo-14703207.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Kaminarimon Gate at Senso-ji Temple, Asakusa",
    activities: [
      {
        name: "Day Trip Options",
        description: "Explore nearby areas: Ueno Park, Akihabara, or Tokyo Skytree"
      },
      {
        name: "Last Night in Asakusa",
        description: "Enjoy the traditional atmosphere before moving to Minato tomorrow"
      }
    ]
  },
  "2026-02-01": {
    date: "2026-02-01",
    dayNumber: 4,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week Begins",
    logistics: "Wife uses 72hr Subway passes + Have Fun Pass",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Move to Minato",
        description: "Check into work hotel in Minato area"
      },
      {
        name: "Wife's Solo Adventure",
        description: "Activate 72-hour Tokyo Subway Pass for unlimited metro access",
        tip: "Great for exploring Harajuku, Shibuya, Shinjuku independently"
      }
    ]
  },
  "2026-02-02": {
    date: "2026-02-02",
    dayNumber: 5,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day"
      },
      {
        name: "Evening Exploration",
        description: "Explore Roppongi or Tokyo Tower area after work"
      }
    ]
  },
  "2026-02-03": {
    date: "2026-02-03",
    dayNumber: 6,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day"
      },
      {
        name: "Dinner Plans",
        description: "Try local izakaya or ramen near the hotel"
      }
    ]
  },
  "2026-02-04": {
    date: "2026-02-04",
    dayNumber: 7,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day"
      }
    ]
  },
  "2026-02-05": {
    date: "2026-02-05",
    dayNumber: 8,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day"
      }
    ]
  },
  "2026-02-06": {
    date: "2026-02-06",
    dayNumber: 9,
    hotel: "[Work Hotel - Minato]",
    mainActivity: "Work Week - Last Day",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Minato",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    activities: [
      {
        name: "Final Work Day",
        description: "Last day of work commitments"
      },
      {
        name: "Pack for Izu Trip",
        description: "Prepare for tomorrow's adventure to Izu Peninsula",
        tip: "Pack light - luggage will be shipped to Kyoto"
      }
    ]
  },
  "2026-02-07": {
    date: "2026-02-07",
    dayNumber: 10,
    hotel: "Prince Smart Inn Atami",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Prince+Smart+Inn+Atami",
    mainActivity: "Kawazu Cherry Blossom Festival",
    logistics: "Ship luggage to Kyoto Gate Hotel in morning",
    trainInfo: "Saphir Odoriko (Tokyo → Kawazu)",
    region: "Izu Peninsula",
    heroImage: "https://images.pexels.com/photos/8507106/pexels-photo-8507106.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Kawazu cherry blossoms in full bloom along the river",
    activities: [
      {
        name: "Ship Luggage to Kyoto",
        time: "Morning",
        description: "Send main luggage via Takkyubin to The Gate Hotel Takasegawa",
        tip: "Keep essentials in a small bag for the overnight trip"
      },
      {
        name: "Saphir Odoriko Train",
        description: "Premium limited express train from Tokyo to Kawazu - enjoy scenic coastal views",
        tip: "The train has large panoramic windows and a cafe car"
      },
      {
        name: "Kawazu Cherry Blossom Festival",
        description: "Walk along the Kawazu River lined with early-blooming cherry trees",
        tip: "These cherry blossoms bloom weeks before the rest of Japan!"
      },
      {
        name: "Stay in Atami",
        description: "Coastal hot spring town - relax at Prince Smart Inn"
      }
    ]
  },
  "2026-02-08": {
    date: "2026-02-08",
    dayNumber: 11,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Travel to Kyoto",
    trainInfo: "Shinkansen Atami → Kyoto (Seat E)",
    region: "Kyoto",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    activities: [
      {
        name: "Shinkansen to Kyoto",
        description: "Bullet train from Atami to Kyoto - sit on the right side for Mt. Fuji views",
        tip: "Seat E is on the Mt. Fuji side!"
      },
      {
        name: "Check into The Gate Hotel",
        description: "Beautiful hotel along Takasegawa canal - breakfast included",
        tip: "The rooftop has amazing views of Kyoto"
      },
      {
        name: "Evening in Pontocho",
        description: "Explore the atmospheric narrow alley filled with traditional restaurants and bars",
        tip: "Look for restaurants with riverside seating (kawadoko)"
      }
    ]
  },
  "2026-02-09": {
    date: "2026-02-09",
    dayNumber: 12,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Kyoto Exploration",
    region: "Kyoto",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    activities: [
      {
        name: "Fushimi Inari Shrine",
        description: "Thousands of vermillion torii gates winding up the mountain",
        tip: "Go early morning to beat the crowds and get the best photos"
      },
      {
        name: "Gion District",
        description: "Historic geisha district with traditional wooden machiya houses",
        tip: "Best chance to spot geiko and maiko in the early evening"
      },
      {
        name: "Kiyomizu-dera Temple",
        description: "Historic temple with stunning views over Kyoto"
      }
    ]
  },
  "2026-02-10": {
    date: "2026-02-10",
    dayNumber: 13,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Arashiyama Bamboo Grove",
    region: "Kyoto - Arashiyama",
    heroImage: "https://images.pexels.com/photos/18848739/pexels-photo-18848739.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Towering bamboo stalks in Arashiyama Bamboo Grove",
    activities: [
      {
        name: "Arashiyama Bamboo Grove",
        time: "Early Morning",
        description: "Walk through the ethereal bamboo forest - truly magical experience",
        tip: "Arrive before 8am for photos without crowds"
      },
      {
        name: "Tenryu-ji Temple",
        description: "UNESCO World Heritage Zen temple with beautiful gardens"
      },
      {
        name: "Togetsukyo Bridge",
        description: "Iconic bridge spanning the Katsura River with mountain backdrop"
      },
      {
        name: "Monkey Park Iwatayama",
        description: "Hike up for wild Japanese macaques and panoramic views of Kyoto",
        tip: "The monkeys are friendly but don't make eye contact or show teeth"
      }
    ]
  },
  "2026-02-11": {
    date: "2026-02-11",
    dayNumber: 14,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Nara Day Trip",
    region: "Nara",
    heroImage: "https://images.pexels.com/photos/31156943/pexels-photo-31156943.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Friendly deer at Todai-ji Temple in Nara",
    activities: [
      {
        name: "Train to Nara",
        description: "45-minute ride from Kyoto to Japan's first permanent capital"
      },
      {
        name: "Nara Park & Deer",
        description: "Meet the famous sacred deer who roam freely - buy shika senbei to feed them!",
        tip: "Bow to the deer and they'll bow back before taking the cracker"
      },
      {
        name: "Todai-ji Temple",
        description: "Home to the world's largest bronze Buddha statue in a massive wooden hall",
        tip: "Try to fit through the pillar hole for good luck!"
      },
      {
        name: "Kasuga Taisha Shrine",
        description: "Ancient shrine famous for its thousands of bronze and stone lanterns"
      }
    ]
  },
  "2026-02-12": {
    date: "2026-02-12",
    dayNumber: 15,
    hotel: "The Knot Hiroshima",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Knot+Hiroshima",
    mainActivity: "Miyajima Island",
    logistics: "Ship luggage to Royal Park Canvas Ginza in morning",
    trainInfo: "Shinkansen Kyoto → Hiroshima",
    region: "Hiroshima",
    heroImage: "https://images.pexels.com/photos/31315377/pexels-photo-31315377.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Floating torii gate of Itsukushima Shrine at Miyajima",
    activities: [
      {
        name: "Ship Luggage to Tokyo",
        time: "Morning",
        description: "Send luggage via Takkyubin to Royal Park Canvas Ginza",
        tip: "Travel light to Hiroshima - luggage arrives in Tokyo before you do!"
      },
      {
        name: "Shinkansen to Hiroshima",
        description: "High-speed train from Kyoto to Hiroshima"
      },
      {
        name: "Miyajima Island",
        description: "Ferry to the sacred island to see the iconic floating torii gate",
        tip: "Check tide times - the torii is stunning at both high and low tide"
      },
      {
        name: "Fresh Oysters",
        description: "Hiroshima is famous for oysters - try them grilled, fried, or raw!",
        tip: "Miyajima has great oyster restaurants near the ferry terminal"
      },
      {
        name: "Itsukushima Shrine",
        description: "UNESCO World Heritage shrine that appears to float at high tide"
      }
    ]
  },
  "2026-02-13": {
    date: "2026-02-13",
    dayNumber: 16,
    hotel: "Royal Park Canvas Ginza",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Park+Canvas+Ginza+Tokyo",
    mainActivity: "Return to Tokyo",
    trainInfo: "Shinkansen Hiroshima → Tokyo",
    region: "Tokyo - Ginza",
    heroImage: "https://images.pexels.com/photos/31402541/pexels-photo-31402541.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Ginza district illuminated at night",
    activities: [
      {
        name: "Morning in Hiroshima",
        description: "Optional: Visit Peace Memorial Park and Museum before departing",
        tip: "Very moving experience - allow 2-3 hours"
      },
      {
        name: "Shinkansen to Tokyo",
        description: "Return journey to Tokyo - about 4 hours"
      },
      {
        name: "Check into Ginza",
        description: "Royal Park Canvas Ginza Corridor - your luggage will be waiting!"
      },
      {
        name: "Evening in Ginza",
        description: "Explore Tokyo's upscale shopping and dining district"
      }
    ]
  },
  "2026-02-14": {
    date: "2026-02-14",
    dayNumber: 17,
    hotel: "Royal Park Canvas Ginza",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Park+Canvas+Ginza+Tokyo",
    mainActivity: "Valentine's Day - teamLab Planets",
    region: "Tokyo - Ginza",
    heroImage: "https://images.pexels.com/photos/31402541/pexels-photo-31402541.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Ginza district illuminated at night",
    activities: [
      {
        name: "teamLab Planets",
        time: "10:00 AM",
        description: "Immersive digital art museum - walk through water and infinity mirror rooms",
        tip: "Wear shorts or clothes you can roll up - you'll wade through knee-deep water!"
      },
      {
        name: "Valentine's Day Lunch",
        description: "Romantic lunch in the Toyosu or Ginza area"
      },
      {
        name: "Fancy Dinner",
        description: "Special Valentine's Day dinner - make reservations in advance!",
        tip: "Ginza has incredible high-end sushi and French-Japanese fusion"
      }
    ]
  },
  "2026-02-15": {
    date: "2026-02-15",
    dayNumber: 18,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Relax in Onsen",
    region: "Tokyo - Akasaka",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower at night",
    activities: [
      {
        name: "Move to Akasaka",
        description: "Check into Super Hotel Premier Akasaka"
      },
      {
        name: "Hotel Onsen",
        description: "Relax in the hotel's natural hot spring bath after weeks of travel",
        tip: "Super Hotel Premier has a great rooftop onsen!"
      },
      {
        name: "Slow Day",
        description: "Rest and recharge - do some last-minute shopping if desired"
      }
    ]
  },
  "2026-02-16": {
    date: "2026-02-16",
    dayNumber: 19,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Shibuya Sky at Sunset",
    logistics: "Shibuya Sky tickets booked for sunset time",
    region: "Tokyo - Shibuya",
    heroImage: "https://images.pexels.com/photos/8002454/pexels-photo-8002454.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Shibuya Crossing from above",
    activities: [
      {
        name: "Free Morning",
        description: "Sleep in or explore Akasaka area"
      },
      {
        name: "Shibuya Exploration",
        description: "Visit Shibuya Crossing, Hachiko statue, and explore the vibrant district"
      },
      {
        name: "Shibuya Sky",
        time: "Sunset",
        description: "360-degree views from 229m high observation deck",
        tip: "Book the sunset time slot for the best experience - day AND night views!"
      },
      {
        name: "Last Night in Tokyo",
        description: "Farewell dinner and drinks in Shibuya or return to favorite spots"
      }
    ]
  },
  "2026-02-17": {
    date: "2026-02-17",
    dayNumber: 20,
    hotel: "Super Hotel Premier Akasaka",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Premier+Akasaka",
    mainActivity: "Departure Day",
    logistics: "Flight departs 22:45",
    region: "Tokyo - Departure",
    heroImage: "https://images.pexels.com/photos/19162388/pexels-photo-19162388.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Station Marunouchi Building",
    activities: [
      {
        name: "Morning Relax",
        description: "Last morning in Japan - enjoy hotel breakfast and onsen one more time"
      },
      {
        name: "Last-Minute Shopping",
        description: "Pick up any remaining souvenirs or gifts",
        tip: "Tokyo Station has excellent omiyage (souvenir) shops"
      },
      {
        name: "Taxi to Tokyo Station",
        time: "Evening",
        description: "Take taxi from Akasaka to Tokyo Station"
      },
      {
        name: "Narita Express",
        description: "N'EX train from Tokyo Station to Narita Airport"
      },
      {
        name: "Flight Home",
        time: "22:45",
        description: "Departure from Narita Airport",
        tip: "Arrive at airport 3 hours early for international flights"
      }
    ]
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
