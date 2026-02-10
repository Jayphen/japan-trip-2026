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
        description: "Bullet train from Atami to Kyoto - sit on the right side for Mt. Fuji views (if skies are clear)",
        tip: "Bundle up! It's cold in Kyoto right now",
        coordinates: { lat: 35.1036, lng: 139.0778 }
      },
      {
        name: "Check into The Gate Hotel",
        description: "Beautiful hotel along Takasegawa canal - breakfast included",
        tip: "Perfect weather for the hotel's cozy lobby and warm drinks",
        coordinates: { lat: 35.0055, lng: 135.7705 }
      },
      {
        name: "Evening in Pontocho",
        description: "Explore the atmospheric narrow alley filled with traditional restaurants and bars",
        tip: "Perfect for cold weather - warm up with hot sake and kushiage",
        coordinates: { lat: 35.0064, lng: 135.7710 }
      }
    ]
  },
  "2026-02-09": {
    date: "2026-02-09",
    dayNumber: 12,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Kyoto East Side & Izakaya Night",
    region: "Kyoto",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Fushimi Inari Shrine",
        time: "Early Morning",
        description: "Thousands of vermillion torii gates winding up the mountain",
        tip: "Cold but magical in snow! Bundle up and take the morning train",
        coordinates: { lat: 34.9671, lng: 135.7727 }
      },
      {
        name: "Nishiki Market",
        time: "Late Morning",
        description: "Explore 'Kyoto's Kitchen' and keep lunch simple with a few shared stalls",
        tip: "Perfect indoor activity! Warm up with street food and hot tea",
        coordinates: { lat: 35.0050, lng: 135.7688 }
      },
      {
        name: "Kiyomizu-dera + Gion Walk",
        time: "Afternoon",
        description: "Do one temple block in Higashiyama, then walk downhill into Gion at golden hour",
        tip: "Keep this as one connected route to avoid too much backtracking",
        coordinates: { lat: 34.9949, lng: 135.7850 }
      },
      {
        name: "Pontocho Izakaya Dinner",
        time: "Evening",
        description: "Pick one alley and settle in: yakitori, oden, or small-plate kappo near Pontocho/Kiyamachi",
        coordinates: { lat: 35.0064, lng: 135.7710 },
        tip: "Good options: Pontocho, Kiyamachi-dori, or Sanjo side streets for compact izakaya clusters"
      }
    ]
  },
  "2026-02-10": {
    date: "2026-02-10",
    dayNumber: 13,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Arashiyama - Bamboo & Temples",
    region: "Kyoto - Arashiyama",
    heroImage: "https://images.pexels.com/photos/18848739/pexels-photo-18848739.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Towering bamboo stalks in Arashiyama Bamboo Grove",
    coordinates: { lat: 35.0094, lng: 135.6670 },
    activities: [
      {
        name: "Arashiyama Bamboo Grove",
        time: "Early Morning",
        description: "Walk through the ethereal bamboo forest - magical in snow!",
        tip: "The sound of bamboo in wind is hauntingly beautiful. Dress warmly!",
        coordinates: { lat: 35.0172, lng: 135.6715 }
      },
      {
        name: "Tenryu-ji Temple",
        description: "UNESCO World Heritage Zen temple with beautiful gardens",
        tip: "Indoor spaces and warm tea available",
        coordinates: { lat: 35.0093, lng: 135.6708 }
      },
      {
        name: "Togetsukyo Bridge + Riverside",
        description: "Iconic bridge with snowy mountain backdrop and an easy riverside stroll",
        tip: "The river views are misty and atmospheric in cold weather",
        coordinates: { lat: 35.0128, lng: 135.6778 }
      },
      {
        name: "Kyoto Izakaya Night (Light)",
        time: "Evening",
        description: "Keep tonight simple with one neighborhood izakaya near Kawaramachi or Omiya",
        tip: "After a full Arashiyama day, pick one place and linger instead of bar-hopping",
        coordinates: { lat: 35.0037, lng: 135.7675 }
      }
    ]
  },
  "2026-02-11": {
    date: "2026-02-11",
    dayNumber: 14,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Kyoto East + teamLab Biovortex",
    logistics: "Public Holiday: National Foundation Day - avoid cross-city hops and keep the day Kyoto-based.",
    region: "Kyoto",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Late Morning Start: Nishiki + Teramachi",
        time: "Late Morning",
        description: "Easy start with market browsing and covered shopping streets near Kawaramachi.",
        tip: "Great weather-proof start if skies are cloudy or drizzly.",
        coordinates: { lat: 35.0050, lng: 135.7688 }
      },
      {
        name: "Higashiyama Walk: Kiyomizu-dera to Yasaka Pagoda",
        time: "Afternoon",
        description: "Do one connected route through Sannenzaka/Ninenzaka, then drift into Gion.",
        tip: "This keeps things scenic without too much transit overhead.",
        coordinates: { lat: 34.9949, lng: 135.7850 }
      },
      {
        name: "teamLab Biovortex Kyoto",
        time: "18:00",
        description: "Immersive digital art experience near Kyoto Station (arrive 20-30 minutes early).",
        tip: "Book/confirm timed entry and allow at least 90 minutes inside.",
        coordinates: { lat: 34.9835, lng: 135.7580 }
      },
      {
        name: "Post-teamLab Dinner",
        time: "Evening",
        description: "Dinner near Kyoto Station or return to Kiyamachi/Pontocho for a relaxed izakaya finish.",
        tip: "After 20:00, Kyoto Station area is easiest; central Kyoto has better vibe if energy allows.",
        coordinates: { lat: 35.0082, lng: 135.7704 }
      }
    ]
  },
  "2026-02-12": {
    date: "2026-02-12",
    dayNumber: 15,
    hotel: "The Gate Hotel Takasegawa",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=The+Gate+Hotel+Takasegawa+Kyoto",
    mainActivity: "Osaka Day Trip (from Kyoto)",
    logistics: "Ship luggage to Mitsui Garden Hotel Shiodome Italia-gai in morning",
    trainInfo: "JR Special Rapid Kyoto ↔ Osaka (about 30 minutes each way)",
    region: "Osaka (Day Trip from Kyoto)",
    heroImage: "https://images.pexels.com/photos/28298102/pexels-photo-28298102.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Pontocho Alley at night in Kyoto",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    activities: [
      {
        name: "Ship Luggage to Tokyo",
        time: "Morning",
        description: "Send luggage via Takkyubin to Mitsui Garden Hotel Shiodome Italia-gai",
        tip: "Travel light for tomorrow's train ride!"
      },
      {
        name: "Train to Osaka",
        time: "Late Morning",
        description: "Take a quick JR ride from Kyoto to Osaka for a full but manageable day trip",
        tip: "Use JR Special Rapid for speed and convenience",
        coordinates: { lat: 34.7025, lng: 135.4959 }
      },
      {
        name: "Namba + Dotonbori Walk",
        time: "Afternoon",
        description: "Explore canal-side streets, arcades, and food lanes around Namba and Dotonbori",
        tip: "Keep this flexible and snack as you go instead of locking in a heavy lunch",
        coordinates: { lat: 34.6687, lng: 135.5019 }
      },
      {
        name: "Osaka Izakaya Night",
        time: "Evening",
        description: "Do a 2-stop izakaya evening in Namba/Ura-Namba before heading back to Kyoto",
        tip: "Aim for an early first seating so the return to Kyoto stays easy",
        coordinates: { lat: 34.6668, lng: 135.5000 }
      },
      {
        name: "Return to Kyoto",
        description: "Head back to Kyoto for your final night at The Gate Hotel",
        tip: "Set a latest-train target before dinner so the day stays relaxed"
      }
    ]
  },
  "2026-02-13": {
    date: "2026-02-13",
    dayNumber: 16,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Return to Tokyo via Shinkansen",
    trainInfo: "NOZOMI 232 Kyoto → Tokyo (12:30-14:45), Car 3, Seats 13-D, 13-E",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night in Minato City",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Shinkansen to Tokyo",
        description: "NOZOMI 232 from Kyoto (12:30) to Tokyo (14:45) - Series N700, Ordinary Car 3, Seat 13-D, 13-E",
        tip: "Sit on the right side for Mt. Fuji views on a clear day!",
        coordinates: { lat: 35.0116, lng: 135.7681 }
      },
      {
        name: "Check into Shiodome",
        description: "Back to familiar Mitsui Garden Hotel Shiodome Italia-gai",
        coordinates: { lat: 35.6614, lng: 139.7570 },
        tip: "Use the TaxisGo app if luggage is heavy"
      },
      {
        name: "Shinbashi Izakaya Night",
        time: "Evening",
        description: "Short walk to Shinbashi for classic under-the-tracks izakayas and grilled skewers",
        coordinates: { lat: 35.6663, lng: 139.7584 },
        tip: "Great clusters around Shinbashi SL Square and the Yurakucho side of the tracks"
      }
    ]
  },
  "2026-02-14": {
    date: "2026-02-14",
    dayNumber: 17,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Valentine's Day",
    region: "Tokyo - Shiodome",
    heroImage: "https://images.pexels.com/photos/19980175/pexels-photo-19980175.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Tower illuminated at night",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Shibuya Sky",
        time: "Sunset",
        description: "360-degree views from 229m high observation deck - perfect for Valentine's!",
        tip: "Book the sunset time slot for the best experience - day AND night views!",
        coordinates: { lat: 35.6584, lng: 139.7022 }
      },
      {
        name: "Valentine's Day Lunch",
        description: "Romantic lunch in the Shibuya or Ginza area",
        tip: "Many restaurants have special Valentine's menus"
      },
      {
        name: "Valentine's Izakaya Dinner",
        description: "Book a cozy counter izakaya in Ebisu, Shibuya backstreets, or Yurakucho",
        coordinates: { lat: 35.6467, lng: 139.7101 },
        tip: "Reserve early slots (around 18:00) to avoid long waits on Valentine's night"
      }
    ]
  },
  "2026-02-15": {
    date: "2026-02-15",
    dayNumber: 18,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Day Trip: Kamakura + Enoshima",
    logistics: "Use JR Yokosuka Line from Tokyo/Shinbashi area; leave early for a relaxed pace.",
    trainInfo: "Tokyo/Shinbashi → Kamakura (JR Yokosuka Line, ~55-65 min) | Enoshima → Tokyo via Fujisawa",
    region: "Kamakura & Enoshima",
    heroImage: "https://images.pexels.com/photos/1614010/pexels-photo-1614010.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Great Buddha of Kamakura with blue sky",
    coordinates: { lat: 35.3193, lng: 139.5468 },
    activities: [
      {
        name: "Train to Kamakura",
        time: "Morning",
        description: "Head out after breakfast for a low-stress day trip from Tokyo.",
        tip: "Aim to arrive before 10:00 to beat midday crowds.",
        coordinates: { lat: 35.3193, lng: 139.5468 }
      },
      {
        name: "Kamakura Highlights",
        description: "Visit Kotoku-in (Great Buddha) and either Hasedera or Tsurugaoka Hachimangu.",
        tip: "Pick 2-3 stops max to keep energy for the coast later.",
        coordinates: { lat: 35.3167, lng: 139.5356 }
      },
      {
        name: "Enoshima Coast Walk",
        time: "Afternoon",
        description: "Move to Enoshima for sea views, shrine paths, and a sunset-friendly stroll.",
        tip: "On clear days, keep an eye out for Mt. Fuji views toward late afternoon.",
        coordinates: { lat: 35.2995, lng: 139.4810 }
      },
      {
        name: "Return to Tokyo + Easy Dinner",
        time: "Evening",
        description: "Head back before it gets too late; dinner near Shinbashi/Yurakucho works well.",
        tip: "After a full day trip, one cozy izakaya stop is perfect.",
        coordinates: { lat: 35.6663, lng: 139.7584 }
      },
      {
        name: "Backup (Rain/Low-Energy): Yokohama Indoor Day",
        description: "If weather turns rough, swap to Yokohama: Cup Noodles Museum, Red Brick Warehouse, and Minato Mirai malls/cafes.",
        tip: "Fast access from Tokyo with lots of covered options; easy to end early if needed.",
        coordinates: { lat: 35.4550, lng: 139.6316 }
      }
    ]
  },
  "2026-02-16": {
    date: "2026-02-16",
    dayNumber: 19,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Shibuya Exploration",
    region: "Tokyo - Shibuya",
    heroImage: "https://images.pexels.com/photos/8002454/pexels-photo-8002454.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Shibuya Crossing from above",
    coordinates: { lat: 35.6595, lng: 139.7004 },
    activities: [
      {
        name: "Free Morning",
        description: "Sleep in or explore Shiodome area"
      },
      {
        name: "Shibuya Exploration",
        description: "Visit Shibuya Crossing, Hachiko statue, and explore the vibrant district",
        coordinates: { lat: 35.6595, lng: 139.7004 },
        tip: "Check out Miyashita Park - a cool rooftop park with shopping and food below"
      },
      {
        name: "Last Night in Tokyo",
        description: "Farewell izakaya night in Shibuya with optional stop in Nonbei Yokocho",
        tip: "If Shibuya feels packed, pivot to Ebisu Yokocho for a similar vibe with slightly less crowding",
        coordinates: { lat: 35.6597, lng: 139.7016 }
      }
    ]
  },
  "2026-02-17": {
    date: "2026-02-17",
    dayNumber: 20,
    hotel: "Mitsui Garden Hotel Shiodome Italia-gai",
    hotelUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Shiodome+Italia-gai",
    mainActivity: "Departure Day",
    logistics: "Flight departs 22:45",
    region: "Tokyo - Departure",
    heroImage: "https://images.pexels.com/photos/19162388/pexels-photo-19162388.jpeg?auto=compress&cs=tinysrgb&w=1280",
    heroImageAlt: "Tokyo Station Marunouchi Building",
    coordinates: { lat: 35.6614, lng: 139.7617 },
    activities: [
      {
        name: "Morning Relax",
        description: "Last morning in Japan - enjoy hotel breakfast and a slow start",
        tip: "Grab a coffee at a local kissaten (traditional coffee shop) for a retro vibe"
      },
      {
        name: "Last-Minute Shopping",
        description: "Pick up any remaining souvenirs or gifts",
        tip: "Tokyo Station has excellent omiyage shops plus easy early-evening izakaya options in Yaesu underground"
      },
      {
        name: "Taxi to Tokyo Station",
        time: "Evening",
        description: "Take taxi from Shiodome to Tokyo Station",
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

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalYmd(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`);
}

export function getDayPlan(date: Date): DayPlan | null {
  const dateStr = toLocalDateKey(date);
  return itinerary[dateStr] || null;
}

export function isBeforeTrip(date: Date): boolean {
  const dateStr = toLocalDateKey(date);
  return dateStr < TRIP_START;
}

export function isDuringTrip(date: Date): boolean {
  const dateStr = toLocalDateKey(date);
  return dateStr >= TRIP_START && dateStr <= TRIP_END;
}

export function getDaysUntilTrip(date: Date): number {
  const tripStart = parseLocalYmd(TRIP_START);
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const diffTime = tripStart.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
