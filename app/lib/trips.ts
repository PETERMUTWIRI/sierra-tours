export interface TripData {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  excerpt: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  includes: string[];
  excludes: string[];
  groupSize: string;
  accommodation: string;
  activities: string[];
}

export const trips: TripData[] = [
  {
    id: "1",
    title: "7 Days Serengeti & Ngorongoro Safari",
    slug: "7-days-serengeti-ngorongoro-safari",
    destination: "tanzania",
    duration: "7 Days / 6 Nights",
    price: 2850,
    currency: "USD",
    excerpt:
      "Experience the best of Tanzania's northern circuit with game drives in Serengeti and Ngorongoro Crater.",
    description:
      "This incredible 7-day safari takes you through Tanzania's most iconic national parks. Witness the endless plains of the Serengeti, home to the Great Migration, and descend into the Ngorongoro Crater, a UNESCO World Heritage site with one of the highest wildlife densities in Africa. Perfect for first-time safari-goers and wildlife enthusiasts alike.",
    image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03.jpg",
    gallery: [
      "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image02.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    ],
    highlights: [
      "Witness the Great Migration in Serengeti (seasonal)",
      "Descend into Ngorongoro Crater for Big Five viewing",
      "Visit Tarangire National Park and its elephant herds",
      "Stay in luxury tented camps and lodges",
      "Professional English-speaking guide throughout",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description:
          "Meet your guide at Kilimanjaro Airport and transfer to your hotel in Arusha. Evening briefing about your upcoming safari adventure.",
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        description:
          "After breakfast, drive to Tarangire National Park. Famous for its large elephant herds and ancient baobab trees. Game drive and overnight at lodge.",
      },
      {
        day: 3,
        title: "Tarangire to Serengeti",
        description:
          "Travel to the world-famous Serengeti National Park. En route, visit a Masai village. Afternoon game drive in Serengeti.",
      },
      {
        day: 4,
        title: "Full Day in Serengeti",
        description:
          "Full day exploring the Serengeti. Search for the Big Five and witness the incredible wildlife that calls this park home. Optional hot air balloon safari.",
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro",
        description:
          "Morning game drive in Serengeti before driving to Ngorongoro Conservation Area. Overnight on the crater rim with stunning views.",
      },
      {
        day: 6,
        title: "Ngorongoro Crater",
        description:
          "Descend into the Ngorongoro Crater for a full day of game viewing. This natural amphitheater hosts incredible wildlife density including the endangered black rhino.",
      },
      {
        day: 7,
        title: "Return to Arusha",
        description:
          "After breakfast, drive back to Arusha. Optional visit to a local market before transfer to the airport for your departure flight.",
      },
    ],
    includes: [
      "All accommodation as per itinerary",
      "All meals during safari",
      "Professional English-speaking guide",
      "4x4 safari vehicle with pop-up roof",
      "All park entrance fees",
      "Airport transfers",
      "Drinking water during game drives",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips and gratuities",
      "Personal expenses",
      "Optional activities",
      "Alcoholic beverages",
    ],
    groupSize: "2-6 people",
    accommodation: "Luxury lodges and tented camps",
    activities: ["Game drives", "Cultural visits", "Nature walks"],
  },
  {
    id: "2",
    title: "Mount Kenya Safari Adventure",
    slug: "mount-kenya-safari-adventure",
    destination: "kenya",
    duration: "5 Days / 4 Nights",
    price: 1950,
    currency: "USD",
    excerpt:
      "Explore the majestic Mount Kenya region with wildlife viewing and breathtaking mountain scenery.",
    description:
      "Discover the beauty of Mount Kenya, Africa's second-highest peak. This safari combines wildlife viewing in the shadow of the mountain with visits to pristine forests and alpine meadows. Perfect for nature lovers and those seeking a less crowded safari experience.",
    image: "/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg",
    gallery: [
      "/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image01.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image02.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image03.jpg",
    ],
    highlights: [
      "Spectacular views of Mount Kenya",
      "Game drives in Mount Kenya National Park",
      "Visit to equator crossing point",
      "Stay in mountain lodges",
      "Rich birdlife including rare species",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Mount Kenya",
        description:
          "Depart Nairobi and drive to Mount Kenya region. Afternoon nature walk and overnight at mountain lodge.",
      },
      {
        day: 2,
        title: "Mount Kenya National Park",
        description:
          "Full day exploring Mount Kenya National Park. Game drives to spot elephant, buffalo, and various antelope species.",
      },
      {
        day: 3,
        title: "Aberdare National Park",
        description:
          "Drive to Aberdare National Park. Game viewing in this mountainous park known for its waterfalls and diverse wildlife.",
      },
      {
        day: 4,
        title: "Solio Game Reserve",
        description:
          "Visit Solio Game Reserve, renowned for its successful rhino breeding program. Excellent rhino sightings guaranteed.",
      },
      {
        day: 5,
        title: "Return to Nairobi",
        description:
          "Morning game drive before returning to Nairobi. Drop-off at your hotel or airport.",
      },
    ],
    includes: [
      "Accommodation in mountain lodges",
      "All meals",
      "Professional guide",
      "Park entrance fees",
      "Ground transport",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips",
      "Personal expenses",
    ],
    groupSize: "2-6 people",
    accommodation: "Mountain lodges",
    activities: ["Game drives", "Nature walks", "Bird watching"],
  },
  {
    id: "3",
    title: "Botswana Okavango Delta Explorer",
    slug: "botswana-okavango-delta-explorer",
    destination: "botswana",
    duration: "6 Days / 5 Nights",
    price: 3200,
    currency: "USD",
    excerpt:
      "Discover the jewel of the Kalahari with mokoro rides and game viewing in the pristine Okavango Delta.",
    description:
      "Experience the world's largest inland delta, a UNESCO World Heritage site. This exclusive safari combines water-based activities in traditional mokoro canoes with game drives in one of Africa's most pristine wilderness areas. Limited tourism ensures an intimate wildlife experience.",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    gallery: [
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1024x576.jpeg",
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1536x864.jpeg",
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-768x432.jpeg",
    ],
    highlights: [
      "Mokoro canoe safaris through delta channels",
      "Walking safaris on islands",
      "Excellent bird watching opportunities",
      "Stay in luxury tented camps",
      "Sunset boat cruises",
    ],
    itinerary: [
      {
        day: 1,
        title: "Maun to Okavango Delta",
        description:
          "Fly from Maun to your luxury tented camp in the Okavango Delta. Afternoon mokoro excursion.",
      },
      {
        day: 2,
        title: "Okavango Delta Activities",
        description:
          "Morning walking safari on an island. Afternoon mokoro ride through the delta's channels.",
      },
      {
        day: 3,
        title: "Full Day in the Delta",
        description:
          "Full day exploring the delta. Game drives, mokoro rides, and boat cruises.",
      },
      {
        day: 4,
        title: "Moremi Game Reserve",
        description:
          "Transfer to Moremi Game Reserve. Game drives in search of predators and big game.",
      },
      {
        day: 5,
        title: "Moremi Game Drives",
        description:
          "Full day of game drives in Moremi, known for its excellent predator sightings.",
      },
      {
        day: 6,
        title: "Return to Maun",
        description:
          "Final morning game drive before flying back to Maun.",
      },
    ],
    includes: [
      "Luxury tented camp accommodation",
      "All meals and drinks (excluding premium)",
      "All activities",
      "Internal flights",
      "Professional guides",
      "Park fees",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Premium beverages",
      "Tips",
    ],
    groupSize: "2-6 people",
    accommodation: "Luxury tented camps",
    activities: ["Mokoro rides", "Game drives", "Walking safaris", "Boat cruises"],
  },
  {
    id: "4",
    title: "Zambia Secret Safari Experience",
    slug: "zambia-secret-safari-experience",
    destination: "zambia",
    duration: "9 Days / 8 Nights",
    price: 4100,
    currency: "USD",
    excerpt:
      "Explore the untouched wilderness of Zambia with walking safaris and Victoria Falls visits.",
    description:
      "Zambia offers one of Africa's most authentic safari experiences. This comprehensive tour combines the world-famous Victoria Falls with South Luangwa National Park, the birthplace of the walking safari. Experience true wilderness with expert guides.",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    gallery: [
      "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-03.jpg",
      "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-04.jpg",
      "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg",
    ],
    highlights: [
      "Visit Victoria Falls - Mosi-oa-Tunya",
      "Walking safaris in South Luangwa",
      "Night drives for nocturnal wildlife",
      "Canoe safari on the Zambezi River",
      "Remote bush camps",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Livingstone",
        description:
          "Arrive at Livingstone Airport. Transfer to your hotel with views of the Zambezi River.",
      },
      {
        day: 2,
        title: "Victoria Falls",
        description:
          "Guided tour of Victoria Falls, one of the Seven Natural Wonders of the World. Afternoon sunset cruise on the Zambezi.",
      },
      {
        day: 3,
        title: "Livingstone to South Luangwa",
        description:
          "Fly to Mfuwe and transfer to your safari camp in South Luangwa National Park.",
      },
      {
        day: 4,
        title: "South Luangwa Walking Safari",
        description:
          "Morning walking safari with expert guide. Afternoon game drive and night drive.",
      },
      {
        day: 5,
        title: "Full Day in South Luangwa",
        description:
          "Full day exploring South Luangwa with morning and afternoon activities.",
      },
      {
        day: 6,
        title: "South Luangwa to Lower Zambezi",
        description:
          "Transfer to Lower Zambezi National Park. Evening game drive.",
      },
      {
        day: 7,
        title: "Lower Zambezi Canoe Safari",
        description:
          "Canoe safari on the Zambezi River. Excellent opportunities to see hippos, elephants, and crocodiles.",
      },
      {
        day: 8,
        title: "Lower Zambezi Game Drives",
        description:
          "Full day of game drives and boat cruises in Lower Zambezi.",
      },
      {
        day: 9,
        title: "Departure",
        description:
          "Final morning activity before flying back to Lusaka for your departure.",
      },
    ],
    includes: [
      "All accommodation",
      "All meals",
      "Internal flights",
      "All park fees",
      "Professional guides",
      "All activities",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips",
      "Personal expenses",
    ],
    groupSize: "2-6 people",
    accommodation: "Safari lodges and bush camps",
    activities: ["Game drives", "Walking safaris", "Canoe safaris", "Boat cruises", "Night drives"],
  },
];

export function getTrip(slug: string): TripData | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function getTripsByDestination(destination: string): TripData[] {
  return trips.filter(
    (trip) => trip.destination.toLowerCase() === destination.toLowerCase()
  );
}

export function getAllTrips(): TripData[] {
  return trips;
}
