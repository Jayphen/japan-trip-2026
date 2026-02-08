export interface Activity {
  name: string;
  description?: string;
  time?: string;
  imageUrl?: string;
  tip?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
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
  coordinates: Coordinates;
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
    logistics: "Pick up Skyliner tickets, Withdraw Cash (7-11 ATM), Power Adapter Check (Type A)",
    region: "Tokyo - Asakusa",
    heroImage: "https://images.pexels.com/photos/14703207/pexels-photo-14703207.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Kaminarimon Gate at Senso-ji Temple, Asakusa",
    coordinates: { lat: 35.7148, lng: 139.7967 },
    activities: [
      {
        name: "Narita to Asakusa",
        description: "Take the Skyliner from Narita Airport to Ueno, then transfer to Asakusa",
        tip: "Pick up pre-purchased Skyliner tickets at the airport counter",
        coordinates: { lat: 35.7115, lng: 139.7744 }
      },
      {
        name: "Check into Hotel",
        description: "Tosei Hotel Cocone Asakusa Kuramae - close to Senso-ji Temple",
        coordinates: { lat: 35.7163, lng: 139.7947 }
      },
      {
        name: "Evening Walk to Senso-ji",
        description: "Visit the iconic Kaminarimon Gate and Nakamise Shopping Street",
        tip: "The temple is beautifully lit at night with fewer crowds",
        coordinates: { lat: 35.7147, lng: 139.7967 }
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
    coordinates: { lat: 35.7148, lng: 139.7967 },
    activities: [
      {
        name: "Senso-ji Temple",
        description: "Explore Tokyo's oldest temple in daylight - don't miss the five-story pagoda",
        tip: "Visit early morning (before 9am) to avoid the crowds",
        coordinates: { lat: 35.7147, lng: 139.7967 }
      },
      {
        name: "Nakamise Shopping Street",
        description: "Browse traditional souvenirs, snacks, and crafts along the 250m shopping street",
        tip: "Try the freshly made ningyo-yaki cakes",
        coordinates: { lat: 35.7119, lng: 139.7964 }
      },
      {
        name: "Sumida River Walk",
        description: "Stroll along the Sumida River with views of Tokyo Skytree",
        tip: "Cross the Sumida River Walk footbridge for a shortcut to Skytree",
        coordinates: { lat: 35.7125, lng: 139.8015 }
      },
      {
        name: "Monjayaki Dinner",
        description: "Try Asakusa's local specialty - a savory pancake similar to okonomiyaki but runnier",
        tip: "There's a whole street dedicated to it near the temple",
        coordinates: { lat: 35.7140, lng: 139.7930 }
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
    coordinates: { lat: 35.7148, lng: 139.7967 },
    activities: [
      {
        name: "Day Trip Options",
        description: "Explore nearby areas: Ueno Park, Akihabara, or Tokyo Skytree",
        coordinates: { lat: 35.7140, lng: 139.7740 },
        tip: "Ueno Park is home to many museums and the zoo"
      },
      {
        name: "Last Night in Asakusa",
        description: "Enjoy the traditional atmosphere before moving to Minato tomorrow",
        tip: "Take a final night stroll to see Senso-ji lit up without crowds"
      }
    ]
  },
  "2026-02-01": {
    date: "2026-02-01",
    dayNumber: 4,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week Begins",
    logistics: "Wife uses 72hr Subway passes + Have Fun Pass",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Move to Minato",
        description: "Check into work hotel in Minato area",
        coordinates: { lat: 35.6614, lng: 139.7570 },
        tip: "Use the TaxisGo app if luggage is heavy; Shiodome can be a bit of a walk"
      },
      {
        name: "Wife's Solo Adventure",
        description: "Activate 72-hour Tokyo Subway Pass for unlimited metro access",
        tip: "Great for exploring Harajuku, Shibuya, Shinjuku independently",
        coordinates: { lat: 35.6702, lng: 139.7027 }
      }
    ]
  },
  "2026-02-02": {
    date: "2026-02-02",
    dayNumber: 5,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day",
        tip: "There are many cafes with wifi in the Shiodome area"
      },
      {
        name: "Evening Exploration",
        description: "Explore Roppongi or Tokyo Tower area after work",
        coordinates: { lat: 35.6586, lng: 139.7454 },
        tip: "Visit the Tokyo Tower main deck for a classic view, or Zojoji Temple right next door"
      }
    ]
  },
  "2026-02-03": {
    date: "2026-02-03",
    dayNumber: 6,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week & Setsubun",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day",
        tip: "Shiodome City Center has a great view from the upper floor restaurants"
      },
      {
        name: "Setsubun Festival",
        description: "Wife Solo Idea: Witness the 'Bean Throwing' ceremony at Zojoji Temple (Minato)",
        tip: "It's a huge event driving away evil spirits for spring - very close to your hotel!",
        coordinates: { lat: 35.6575, lng: 139.7484 }
      },
      {
        name: "Dinner Plans",
        description: "Try local izakaya or ramen near the hotel",
        tip: "Shinbashi (nearby) is the salaryman capital - packed with authentic, cheap izakayas under the train tracks"
      }
    ]
  },
  "2026-02-04": {
    date: "2026-02-04",
    dayNumber: 7,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day",
        tip: "Take a break at Hamarikyu Gardens nearby"
      }
    ]
  },
  "2026-02-05": {
    date: "2026-02-05",
    dayNumber: 8,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Work Day",
        description: "Work commitments during the day",
        tip: "Explore the Caretta Shiodome for dining options"
      }
    ]
  },
  "2026-02-06": {
    date: "2026-02-06",
    dayNumber: 9,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Work Week - Last Day",
    logistics: "Wife uses 72hr Subway passes",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Final Work Day",
        description: "Last day of work commitments",
        tip: "Don't forget to buy Ekiben (train bento) for the trip tomorrow"
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
    coordinates: { lat: 35.0967, lng: 139.0714 },
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
        tip: "The train has large panoramic windows and a cafe car",
        coordinates: { lat: 35.6812, lng: 139.7671 }
      },
      {
        name: "Kawazu Cherry Blossom Festival",
        description: "Walk along the Kawazu River lined with early-blooming cherry trees",
        tip: "These cherry blossoms bloom weeks before the rest of Japan!",
        coordinates: { lat: 34.7531, lng: 138.9778 }
      },
      {
        name: "Stay in Atami",
        description: "Coastal hot spring town - relax at Prince Smart Inn",
        coordinates: { lat: 35.1017, lng: 139.0761 },
        tip: "Check out the Heiwadori Shopping Street near the station for steaming onsen manju buns"
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
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Shinkansen to Kyoto",
        description: "Bullet train from Atami to Kyoto - sit on the right side for Mt. Fuji views",
        tip: "Seat E is on the Mt. Fuji side!",
        coordinates: { lat: 35.1036, lng: 139.0778 }
      },
      {
        name: "Check into The Gate Hotel",
        description: "Beautiful hotel along Takasegawa canal - breakfast included",
        tip: "The rooftop has amazing views of Kyoto",
        coordinates: { lat: 35.0055, lng: 135.7705 }
      },
      {
        name: "Evening in Pontocho",
        description: "Explore the atmospheric narrow alley filled with traditional restaurants and bars",
        tip: "Look for restaurants with riverside seating (kawadoko)",
        coordinates: { lat: 35.0064, lng: 135.7710 }
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
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Fushimi Inari Shrine",
        description: "Thousands of vermillion torii gates winding up the mountain",
        tip: "Go early morning to beat the crowds and get the best photos",
        coordinates: { lat: 34.9671, lng: 135.7727 }
      },
      {
        name: "Gion District",
        description: "Historic geisha district with traditional wooden machiya houses",
        tip: "Best chance to spot geiko and maiko in the early evening",
        coordinates: { lat: 35.0035, lng: 135.7751 }
      },
      {
        name: "Kiyomizu-dera Temple",
        description: "Historic temple with stunning views over Kyoto",
        coordinates: { lat: 34.9949, lng: 135.7850 },
        tip: "Don't miss the Otawa Waterfall where you can drink for health, love, or success"
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
    coordinates: { lat: 35.0094, lng: 135.6670 },
    activities: [
      {
        name: "Arashiyama Bamboo Grove",
        time: "Early Morning",
        description: "Walk through the ethereal bamboo forest - truly magical experience",
        tip: "Arrive before 8am for photos without crowds",
        coordinates: { lat: 35.0172, lng: 135.6715 }
      },
      {
        name: "Tenryu-ji Temple",
        description: "UNESCO World Heritage Zen temple with beautiful gardens",
        coordinates: { lat: 35.0093, lng: 135.6708 },
        tip: "The garden is a surviving example of 14th century design"
      },
      {
        name: "Togetsukyo Bridge",
        description: "Iconic bridge spanning the Katsura River with mountain backdrop",
        coordinates: { lat: 35.0128, lng: 135.6778 },
        tip: "Beautiful mountain views, especially during sunset"
      },
      {
        name: "Monkey Park Iwatayama",
        description: "Hike up for wild Japanese macaques and panoramic views of Kyoto",
        tip: "The monkeys are friendly but don't make eye contact or show teeth",
        coordinates: { lat: 35.0089, lng: 135.6747 }
      }
    ]
  },
  "2026-02-11": {
    date: "2026-02-11",
    dayNumber: 14,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Nara Day Trip",
    logistics: "Public Holiday: National Foundation Day",
    region: "Nara",
    heroImage: "https://images.pexels.com/photos/31156943/pexels-photo-31156943.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Friendly deer at Todai-ji Temple in Nara",
    coordinates: { lat: 34.6851, lng: 135.8048 },
    activities: [
      {
        name: "Train to Nara",
        description: "45-minute ride from Kyoto to Japan's first permanent capital",
        coordinates: { lat: 34.9858, lng: 135.7588 },
        tip: "Take the Kintetsu line for a faster trip that drops you closer to Nara Park than JR"
      },
      {
        name: "Nara Park & Deer",
        description: "Meet the famous sacred deer who roam freely - buy shika senbei to feed them!",
        tip: "Bow to the deer and they'll bow back before taking the cracker",
        coordinates: { lat: 34.6850, lng: 135.8429 }
      },
      {
        name: "Todai-ji Temple",
        description: "Home to the world's largest bronze Buddha statue in a massive wooden hall",
        tip: "Try to fit through the pillar hole for good luck!",
        coordinates: { lat: 34.6868, lng: 135.8372 }
      },
      {
        name: "Kasuga Taisha Shrine",
        description: "Ancient shrine famous for its thousands of bronze and stone lanterns",
        tip: "Famous for its hundreds of bronze and stone lanterns",
        coordinates: { lat: 34.6814, lng: 135.8483 }
      }
    ]
  },
  "2026-02-12": {
    date: "2026-02-12",
    dayNumber: 15,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Extra Night in Kyoto",
    logistics: "Ship luggage to Royal Park Canvas Ginza in morning",
    trainInfo: "Shinkansen Kyoto → Tokyo",
    region: "Kyoto",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Ship Luggage to Tokyo",
        time: "Morning",
        description: "Send luggage via Takkyubin to Royal Park Canvas Ginza",
        tip: "Travel light for tomorrow's train ride!"
      },
      {
        name: "Extra Day in Kyoto",
        description: "Revisit favorite spots or explore new areas in Kyoto",
        tip: "Use this day to revisit temples or neighborhoods you loved"
      },
      {
        name: "Last Night in Kyoto",
        description: "Evening stroll along Takasegawa canal at The Gate Hotel",
        tip: "Enjoy the hotel's rooftop bar with canal views"
      }
    ]
  },
  "2026-02-13": {
    date: "2026-02-13",
    dayNumber: 16,
    hotel: "Royal Park Canvas Ginza",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Park+Canvas+Ginza+Tokyo",
    mainActivity: "Return to Tokyo via Shinkansen",
    trainInfo: "Shinkansen Kyoto → Tokyo",
    region: "Tokyo - Ginza",
    heroImage: "https://images.pexels.com/photos/31402541/pexels-photo-31402541.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Ginza district illuminated at night",
    coordinates: { lat: 35.6717, lng: 139.7650 },
    activities: [
      {
        name: "Shinkansen to Tokyo",
        description: "NOZOMI 232 from Kyoto (12:30) to Tokyo (14:45) - Series N700, Ordinary Car 3, Seat 13-D, 13-E",
        tip: "Sit on the right side for Mt. Fuji views on a clear day!",
        coordinates: { lat: 35.0116, lng: 135.7681 }
      },
      {
        name: "Check into Ginza",
        description: "Royal Park Canvas Ginza Corridor - your luggage will be waiting!",
        coordinates: { lat: 35.6708, lng: 139.7600 },
        tip: "The hotel has a cool lounge/terrace space perfect for chilling with a drink"
      },
      {
        name: "Evening in Ginza",
        description: "Explore Tokyo's upscale shopping and dining district",
        tip: "Visit the Ginza Six rooftop garden for a free, beautiful view of the city skyline"
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
    coordinates: { lat: 35.6717, lng: 139.7650 },
    activities: [
      {
        name: "teamLab Planets",
        time: "10:00 AM",
        description: "Immersive digital art museum - walk through water and infinity mirror rooms",
        tip: "Wear shorts or clothes you can roll up - you'll wade through knee-deep water!",
        coordinates: { lat: 35.6498, lng: 139.7905 }
      },
      {
        name: "Valentine's Day Lunch",
        description: "Romantic lunch in the Toyosu or Ginza area",
        tip: "Tsukiji Outer Market is walkable from teamLab - get the freshest sushi of your life"
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
    coordinates: { lat: 35.6744, lng: 139.7370 },
    activities: [
      {
        name: "Move to Akasaka",
        description: "Check into Super Hotel Premier Akasaka",
        coordinates: { lat: 35.6738, lng: 139.7360 },
        tip: "Akasaka Sacas and Biz Tower offer sleek modern dining options right nearby"
      },
      {
        name: "Hotel Onsen",
        description: "Relax in the hotel's natural hot spring bath after weeks of travel",
        tip: "Super Hotel Premier has a great rooftop onsen!"
      },
      {
        name: "Slow Day",
        description: "Rest and recharge - do some last-minute shopping if desired",
        tip: "Hie Shrine in Akasaka has a beautiful tunnel of red torii gates (like Fushimi Inari but smaller)"
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
    coordinates: { lat: 35.6595, lng: 139.7004 },
    activities: [
      {
        name: "Free Morning",
        description: "Sleep in or explore Akasaka area"
      },
      {
        name: "Shibuya Exploration",
        description: "Visit Shibuya Crossing, Hachiko statue, and explore the vibrant district",
        coordinates: { lat: 35.6595, lng: 139.7004 },
        tip: "Check out Miyashita Park - a cool rooftop park with shopping and food below"
      },
      {
        name: "Shibuya Sky",
        time: "Sunset",
        description: "360-degree views from 229m high observation deck",
        tip: "Book the sunset time slot for the best experience - day AND night views!",
        coordinates: { lat: 35.6584, lng: 139.7022 }
      },
      {
        name: "Last Night in Tokyo",
        description: "Farewell dinner and drinks in Shibuya or return to favorite spots",
        tip: "Nonbei Yokocho (Drunkard's Alley) offers a nostalgic, tight-knit bar experience"
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
    coordinates: { lat: 35.6744, lng: 139.7370 },
    activities: [
      {
        name: "Morning Relax",
        description: "Last morning in Japan - enjoy hotel breakfast and onsen one more time",
        tip: "Grab a coffee at a local kissaten (traditional coffee shop) for a retro vibe"
      },
      {
        name: "Last-Minute Shopping",
        description: "Pick up any remaining souvenirs or gifts",
        tip: "Tokyo Station has excellent omiyage (souvenir) shops"
      },
      {
        name: "Taxi to Tokyo Station",
        time: "Evening",
        description: "Take taxi from Akasaka to Tokyo Station",
        tip: "Have your hotel call a taxi for you in advance"
      },
      {
        name: "Narita Express",
        description: "N'EX train from Tokyo Station to Narita Airport",
        coordinates: { lat: 35.6812, lng: 139.7671 },
        tip: "Reserve your seats in advance, even with a pass, as it's all reserved seating"
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
