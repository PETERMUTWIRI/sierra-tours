import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// WordPress extracted safari data
const wpSafaris = [
  {
    title: "7-DAY KENYA SAFARI",
    slug: "7-day-kenya-safari",
    excerpt: "Explore Kenya's finest wildlife destinations on this 7-day adventure through Masai Mara, Lake Nakuru, Lake Naivasha, and Amboseli.",
    description: `Experience the best of Kenya on this 7-day safari adventure. From the world-famous Masai Mara with its abundant wildlife to the flamingo-filled Lake Nakuru, the serene Lake Naivasha, and the elephant paradise of Amboseli with stunning views of Mount Kilimanjaro.

This carefully crafted itinerary takes you through Kenya's most iconic national parks and reserves, offering unparalleled opportunities to witness the Big Five and countless other species in their natural habitat.`,
    image: "/safaris/7-day-kenya-safari.jpg",
    gallery: [],
    destinationId: "kenya",
    duration: "7 Days / 6 Nights",
    price: 1155,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "2-12 people",
    accommodation: "Comfortable lodges and camps",
    activities: ["Game Drives", "Wildlife Viewing", "Bird Watching", "Photography"],
    highlights: ["Big Five Viewing", "Mount Kilimanjaro Views", "Masai Mara Game Reserve", "Amboseli Elephants"],
    includes: ["All accommodation", "All meals", "Professional guide", "4x4 transport", "Park fees", "Airport transfers"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Nairobi - Masai Mara", description: "Pick-up from hotel/airport and drive (~6 hrs) to Masai Mara with stopovers. Lunch en route or at camp. Afternoon game drive upon arrival.", meals: ["Lunch", "Dinner"], accommodation: "Miti Mingi Eco Camp" },
      { day: 2, title: "Masai Mara - Full Day Game Drive", description: "Full-day game drive after early breakfast with packed lunch. View Big Five, wildebeest, hippos, etc. Optional visit to a Maasai village ($10-$20).", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Miti Mingi Eco Camp" },
      { day: 3, title: "Masai Mara - Lake Nakuru", description: "Depart after breakfast (~5-6 hrs drive). Arrive in time for lunch. Afternoon game drive around Lake Nakuru to see flamingos and rhinos.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "City Max Hotel or similar" },
      { day: 4, title: "Lake Nakuru - Lake Naivasha", description: "Early morning game drive in Lake Nakuru. Depart for Lake Naivasha (~2 hrs). Arrive for lunch. Afternoon boat ride and visit Crescent Island.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Taphe Guest House or similar" },
      { day: 5, title: "Lake Naivasha - Amboseli National Park", description: "Early breakfast then drive to Amboseli (~5-6 hrs). Lunch en route. Late afternoon game drive with Mount Kilimanjaro views.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "AA Lodge Amboseli or similar" },
      { day: 6, title: "Amboseli - Full Day Game Drive", description: "Full day exploring Amboseli. Morning and afternoon game drives. Excellent elephant viewing and photography opportunities.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "AA Lodge Amboseli or similar" },
      { day: 7, title: "Amboseli - Nairobi", description: "Early morning game drive. After breakfast, drive back to Nairobi (~4-5 hrs). Drop-off at hotel or airport.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "10 Days / 9 Nights Kenya Safari",
    slug: "10-days-9-nights-kenya-safari",
    excerpt: "An extended Kenyan safari experience covering all major parks and reserves with extra time for wildlife photography.",
    description: "Experience the ultimate Kenyan safari adventure spanning 10 days and 9 nights. This comprehensive tour covers Kenya's most spectacular wildlife destinations with ample time for game viewing and photography.",
    image: "/safaris/10-days-9-nights-kenya-safari.jpg",
    gallery: [],
    destinationId: "kenya",
    duration: "10 Days / 9 Nights",
    price: 2850,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-10 people",
    accommodation: "Mid-range lodges and camps",
    activities: ["Game Drives", "Wildlife Photography", "Bird Watching", "Nature Walks"],
    highlights: ["Extended Game Viewing", "Multiple National Parks", "Cultural Interactions", "Scenic Landscapes"],
    includes: ["All accommodation", "All meals", "Professional guide", "4x4 transport", "Park fees"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arrival in Nairobi", description: "Meet and greet at Jomo Kenyatta International Airport. Transfer to your hotel for overnight.", meals: ["Dinner"], accommodation: "Nairobi Hotel" },
      { day: 2, title: "Nairobi - Aberdares", description: "Drive to Aberdare National Park. Game viewing en route. Overnight at tree lodge.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Aberdare Lodge" },
      { day: 3, title: "Aberdares - Samburu", description: "Morning drive to Samburu National Reserve. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Samburu Camp" },
      { day: 4, title: "Samburu Full Day", description: "Full day exploring Samburu with morning and afternoon game drives. Unique species found only here.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Samburu Camp" },
      { day: 5, title: "Samburu - Ol Pejeta", description: "Drive to Ol Pejeta Conservancy. Visit the chimpanzee sanctuary and rhino conservation center.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Ol Pejeta Camp" },
      { day: 6, title: "Ol Pejeta - Lake Nakuru", description: "Morning game drive. Drive to Lake Nakuru National Park. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Nakuru Lodge" },
      { day: 7, title: "Lake Nakuru - Masai Mara", description: "Early morning game drive. Drive to Masai Mara. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 8, title: "Masai Mara Full Day", description: "Full day in Masai Mara with game drives. Optional hot air balloon safari.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 9, title: "Masai Mara Full Day", description: "Another full day exploring the Mara. Visit a Maasai village in the evening.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 10, title: "Masai Mara - Nairobi", description: "Final morning game drive. Drive back to Nairobi. Airport drop-off.", meals: ["Breakfast", "Lunch"], accommodation: "N/A" }
    ]
  },
  {
    title: "15 Days Kenya Culture, Safari & Beach Experience",
    slug: "15-days-kenya-culture-safari-beach-experience",
    excerpt: "The ultimate Kenyan experience combining wildlife safaris, cultural immersion, and relaxation on the beautiful Kenyan coast.",
    description: "Experience the very best of Kenya with this comprehensive 15-day tour. Begin with world-class wildlife safaris in Kenya's premier national parks, immerse yourself in authentic Maasai culture, and unwind on the pristine white sandy beaches of the Kenyan coast.",
    image: "/safaris/15-days-kenya-culture-safari-beach-experience.jpg",
    gallery: [],
    destinationId: "kenya",
    duration: "15 Days / 14 Nights",
    price: 3850,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "2-12 people",
    accommodation: "Mix of lodges, camps, and beach resort",
    activities: ["Game Drives", "Cultural Visits", "Beach Activities", "Snorkeling", "City Tours"],
    highlights: ["Complete Kenya Experience", "Big Five Safari", "Maasai Culture", "Beach Relaxation", "Dhow Cruises"],
    includes: ["All accommodation", "All meals on safari", "Breakfast at beach", "Professional guide", "Park fees", "Transfers"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees", "Beach activities"],
    itinerary: [
      { day: 1, title: "Arrival Nairobi", description: "Arrive at Jomo Kenyatta International Airport. Meet and greet. Transfer to hotel.", meals: ["Dinner"], accommodation: "Nairobi Hotel" },
      { day: 2, title: "Nairobi - Amboseli", description: "Drive to Amboseli National Park. Afternoon game drive with Kilimanjaro views.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Amboseli Lodge" },
      { day: 3, title: "Amboseli Full Day", description: "Full day game viewing in Amboseli. Famous for elephant herds.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Amboseli Lodge" },
      { day: 4, title: "Amboseli - Tsavo West", description: "Drive to Tsavo West. Visit Mzima Springs. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tsavo Lodge" },
      { day: 5, title: "Tsavo West - Tsavo East", description: "Morning game drive. Drive to Tsavo East. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tsavo East Camp" },
      { day: 6, title: "Tsavo East Full Day", description: "Explore Tsavo East, famous for red elephants and maneless lions.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tsavo East Camp" },
      { day: 7, title: "Tsavo - Nairobi", description: "Morning game drive. Drive back to Nairobi. Overnight in Nairobi.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Nairobi Hotel" },
      { day: 8, title: "Nairobi - Lake Nakuru", description: "Drive to Lake Nakuru. Afternoon game drive. Flamingos and rhinos.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Nakuru Lodge" },
      { day: 9, title: "Lake Nakuru - Masai Mara", description: "Drive to Masai Mara. En route game drive. Evening game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 10, title: "Masai Mara Full Day", description: "Full day exploring the Mara. Optional balloon safari at sunrise.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 11, title: "Masai Mara Cultural Day", description: "Morning game drive. Visit an authentic Maasai village. Learn about their culture.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Mara Camp" },
      { day: 12, title: "Masai Mara - Nairobi - Mombasa", description: "Fly from Mara to Nairobi, then connect to Mombasa. Transfer to beach hotel.", meals: ["Breakfast", "Dinner"], accommodation: "Beach Resort" },
      { day: 13, title: "Beach Relaxation", description: "Full day at leisure on the beautiful Diani Beach. Optional water sports.", meals: ["Breakfast", "Dinner"], accommodation: "Beach Resort" },
      { day: 14, title: "Beach & Optional Excursions", description: "Optional dhow cruise, snorkeling, or visit to historic Mombasa town.", meals: ["Breakfast", "Dinner"], accommodation: "Beach Resort" },
      { day: 15, title: "Departure", description: "Transfer to Moi International Airport for your departure flight.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "Malaysia 3 Nights 4 Days",
    slug: "malaysia-3-nights-4-days",
    excerpt: "Explore the vibrant city of Kuala Lumpur and experience the natural beauty of Malaysia.",
    description: "Discover Malaysia's diverse culture, modern cities, and natural wonders on this compact 4-day tour. Experience Kuala Lumpur's iconic landmarks and enjoy authentic Malaysian hospitality.",
    image: "/safaris/malaysia-3-nights-4-days.jpg",
    gallery: [],
    destinationId: "malaysia",
    duration: "4 Days / 3 Nights",
    price: 950,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "2-15 people",
    accommodation: "4-star hotels",
    activities: ["City Tours", "Cultural Visits", "Shopping", "Food Tours"],
    highlights: ["Petronas Towers", "Batu Caves", "Cultural Diversity", "Malaysian Cuisine"],
    includes: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "City tours", "English speaking guide"],
    excludes: ["International flights", "Lunch and dinner", "Personal expenses", "Tips", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival Kuala Lumpur", description: "Arrive at Kuala Lumpur International Airport. Transfer to hotel. Evening at leisure.", meals: ["None"], accommodation: "Kuala Lumpur Hotel" },
      { day: 2, title: "Kuala Lumpur City Tour", description: "Full day city tour including Petronas Towers, Batu Caves, Merdeka Square, and Chinatown.", meals: ["Breakfast"], accommodation: "Kuala Lumpur Hotel" },
      { day: 3, title: "Cultural & Nature Experience", description: "Visit the National Mosque, Islamic Arts Museum, and KL Bird Park. Evening food tour.", meals: ["Breakfast"], accommodation: "Kuala Lumpur Hotel" },
      { day: 4, title: "Departure", description: "Free time for shopping. Transfer to airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "4 NIGHTS 5 DAYS CAPE TOWN SOUTH AFRICA",
    slug: "4-nights-5-days-cape-town-south-africa",
    excerpt: "Discover the beauty of Cape Town with its stunning beaches, Table Mountain, and vibrant culture.",
    description: "Explore one of the world's most beautiful cities. Cape Town offers stunning natural beauty, rich history, world-class cuisine, and unforgettable experiences including Table Mountain and the Cape Peninsula.",
    image: "/safaris/4-nights-5-days-cape-town-south-africa.jpg",
    gallery: [],
    destinationId: "south-africa",
    duration: "5 Days / 4 Nights",
    price: 1250,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-12 people",
    accommodation: "Boutique hotel in city center",
    activities: ["City Tours", "Table Mountain", "Cape Peninsula", "Wine Tasting"],
    highlights: ["Table Mountain", "Cape of Good Hope", "Penguin Colony", "Stellenbosch Winelands"],
    includes: ["Hotel accommodation", "Breakfast daily", "Airport transfers", "Guided tours", "Park fees"],
    excludes: ["International flights", "Lunch and dinner", "Personal expenses", "Tips", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival Cape Town", description: "Arrive at Cape Town International Airport. Transfer to hotel. Evening at leisure.", meals: ["None"], accommodation: "Cape Town Hotel" },
      { day: 2, title: "Cape Peninsula Tour", description: "Full day tour to Cape Point, Cape of Good Hope, and Boulders Beach penguin colony.", meals: ["Breakfast"], accommodation: "Cape Town Hotel" },
      { day: 3, title: "Table Mountain & City Tour", description: "Cable car up Table Mountain. City tour including Company Gardens, Bo-Kaap, and V&A Waterfront.", meals: ["Breakfast"], accommodation: "Cape Town Hotel" },
      { day: 4, title: "Winelands Tour", description: "Day trip to Stellenbosch and Franschhoek wine regions. Wine tastings included.", meals: ["Breakfast"], accommodation: "Cape Town Hotel" },
      { day: 5, title: "Departure", description: "Free time. Transfer to airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "MORONDAVA THROUGH MADAGASCAR'S NATURAL WONDERS",
    slug: "morondava-through-madagascar-s-natural-wonders",
    excerpt: "Explore the unique wildlife and surreal landscapes of Madagascar including the famous Avenue of the Baobabs.",
    description: "Discover the world's oldest island, home to unique wildlife found nowhere else on Earth. From the iconic baobab trees to lemurs and chameleons, Madagascar offers a truly unique safari experience.",
    image: "/safaris/morondava-through-madagascar-s-natural-wonders.jpg",
    gallery: [],
    destinationId: "madagascar",
    duration: "7 Days / 6 Nights",
    price: 2450,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-8 people",
    accommodation: "Eco-lodges and hotels",
    activities: ["Wildlife Viewing", "Nature Walks", "Photography", "Cultural Visits"],
    highlights: ["Avenue of the Baobabs", "Tsingy de Bemaraha", "Unique Wildlife", "Local Culture"],
    includes: ["Accommodation", "Meals as per itinerary", "English speaking guide", "Park fees", "Domestic flights"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arrival Antananarivo", description: "Arrive in Tana. Transfer to hotel. Briefing about the tour.", meals: ["Dinner"], accommodation: "Tana Hotel" },
      { day: 2, title: "Fly to Morondava", description: "Morning flight to Morondava. Visit the iconic Avenue of the Baobabs at sunset.", meals: ["Breakfast", "Dinner"], accommodation: "Morondava Lodge" },
      { day: 3, title: "Tsingy de Bemaraha", description: "Drive to Tsingy de Bemaraha. UNESCO World Heritage site with unique limestone formations.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tsingy Lodge" },
      { day: 4, title: "Tsingy Exploration", description: "Full day exploring the Tsingy. Walking tours through the needle-like limestone formations.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tsingy Lodge" },
      { day: 5, title: "Return to Morondava", description: "Drive back to Morondava. Visit Kirindy Forest Reserve to see fossa and lemurs.", meals: ["Breakfast", "Dinner"], accommodation: "Morondava Lodge" },
      { day: 6, title: "Morondava - Antananarivo", description: "Morning at leisure. Fly back to Tana. City tour and souvenir shopping.", meals: ["Breakfast", "Dinner"], accommodation: "Tana Hotel" },
      { day: 7, title: "Departure", description: "Transfer to airport for your international departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "Rwanda 5 Days",
    slug: "rwanda-5-days",
    excerpt: "Experience Rwanda's mountain gorillas and golden monkeys in the stunning Volcanoes National Park.",
    description: "Embark on a life-changing journey to meet endangered mountain gorillas in their natural habitat. Rwanda offers one of the most profound wildlife experiences on Earth, combined with the warmth of its people and stunning landscapes.",
    image: "/safaris/rwanda-5-days.jpg",
    gallery: [],
    destinationId: "rwanda",
    duration: "5 Days / 4 Nights",
    price: 4500,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "Maximum 8 people",
    accommodation: "Luxury lodge near Volcanoes National Park",
    activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Cultural Visits", "Kigali City Tour"],
    highlights: ["Mountain Gorilla Trekking", "Golden Monkeys", "Kigali Genocide Memorial", "Volcanoes National Park"],
    includes: ["Luxury accommodation", "All meals", "Gorilla permits", "Golden monkey permits", "Professional guide", "Airport transfers"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arrival Kigali", description: "Arrive at Kigali International Airport. Transfer to hotel. Optional city tour.", meals: ["Dinner"], accommodation: "Kigali Marriott Hotel" },
      { day: 2, title: "Kigali - Volcanoes National Park", description: "Morning Kigali city tour including Genocide Memorial. Drive to Volcanoes National Park.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "The Bishops House Rwanda, Musanze" },
      { day: 3, title: "Gorilla Trekking Day", description: "Early morning briefing. Trek into the rainforest to meet mountain gorillas. An unforgettable hour with these gentle giants.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "The Bishops House Rwanda, Musanze" },
      { day: 4, title: "Golden Monkeys & Cultural Visit", description: "Morning golden monkey tracking. Afternoon visit to Iby'Iwacu Cultural Village.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "The Bishops House Rwanda, Musanze" },
      { day: 5, title: "Return to Kigali - Departure", description: "Drive back to Kigali. Transfer to airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "3 Nights Sharm El Sheikh + 3 Nights Cairo",
    slug: "3-nights-sharm-el-sheikh-3-nights-cairo",
    excerpt: "Combine the crystal-clear waters of the Red Sea with the ancient wonders of Egypt's capital.",
    description: "Experience the best of Egypt - relax on the stunning beaches of Sharm El Sheikh with world-class snorkeling and diving, then explore the ancient pyramids, Sphinx, and treasures of Cairo.",
    image: "/safaris/3-nights-sharm-el-sheikh-3-nights-cairo.jpg",
    gallery: [],
    destinationId: "egypt",
    duration: "7 Days / 6 Nights",
    price: 1350,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-15 people",
    accommodation: "4-star beach resort and city hotel",
    activities: ["Beach Relaxation", "Snorkeling", "Pyramid Tours", "Museum Visits"],
    highlights: ["Red Sea Beaches", "Pyramids of Giza", "Egyptian Museum", "Old Cairo"],
    includes: ["Hotel accommodation", "Daily breakfast", "Domestic flight", "Pyramid tour", "Airport transfers"],
    excludes: ["International flights", "Lunch and dinner", "Entry visas", "Travel insurance", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival Sharm El Sheikh", description: "Arrive at Sharm El Sheikh Airport. Transfer to beach resort. Rest and relaxation.", meals: ["Dinner"], accommodation: "Sharm Resort" },
      { day: 2, title: "Red Sea Relaxation", description: "Full day at leisure. Optional snorkeling or diving excursions.", meals: ["Breakfast", "Dinner"], accommodation: "Sharm Resort" },
      { day: 3, title: "Ras Mohammed National Park", description: "Boat trip to Ras Mohammed for snorkeling in pristine waters.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Sharm Resort" },
      { day: 4, title: "Sharm - Cairo", description: "Transfer to airport. Fly to Cairo. Transfer to hotel.", meals: ["Breakfast"], accommodation: "Cairo Hotel" },
      { day: 5, title: "Pyramids & Sphinx", description: "Full day tour of Giza Pyramids, Sphinx, and Saqqara. Evening Nile dinner cruise.", meals: ["Breakfast", "Dinner"], accommodation: "Cairo Hotel" },
      { day: 6, title: "Cairo City Tour", description: "Egyptian Museum, Citadel, Khan el-Khalili bazaar. Traditional Egyptian dinner.", meals: ["Breakfast", "Dinner"], accommodation: "Cairo Hotel" },
      { day: 7, title: "Departure", description: "Transfer to Cairo International Airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "3 Nights North Coast + 3 Nights Cairo",
    slug: "3-nights-north-coast-3-nights-cairo",
    excerpt: "Enjoy Egypt's Mediterranean coast before exploring the ancient wonders of Cairo.",
    description: "Relax on Egypt's beautiful North Coast beaches before discovering the treasures of ancient Egypt in Cairo. A perfect blend of relaxation and cultural exploration.",
    image: "/safaris/3-nights-north-coast-3-nights-cairo.jpg",
    gallery: [],
    destinationId: "egypt",
    duration: "7 Days / 6 Nights",
    price: 1100,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-15 people",
    accommodation: "Beach resort and Cairo hotel",
    activities: ["Beach Relaxation", "Swimming", "Pyramid Tours", "City Tours"],
    highlights: ["Mediterranean Beaches", "Pyramids of Giza", "Egyptian Museum", "Local Cuisine"],
    includes: ["Hotel accommodation", "Daily breakfast", "Pyramid tour", "Transfers"],
    excludes: ["International flights", "Lunch and dinner", "Entry visas", "Travel insurance", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival North Coast", description: "Arrive at Borg El Arab Airport. Transfer to beach resort.", meals: ["Dinner"], accommodation: "North Coast Resort" },
      { day: 2, title: "Beach Day", description: "Full day relaxing on the Mediterranean coast. Swimming and water activities.", meals: ["Breakfast", "Dinner"], accommodation: "North Coast Resort" },
      { day: 3, title: "El Alamein Tour", description: "Visit World War II memorials and museum at El Alamein.", meals: ["Breakfast", "Dinner"], accommodation: "North Coast Resort" },
      { day: 4, title: "North Coast - Cairo", description: "Drive to Cairo. Check into hotel. Evening at leisure.", meals: ["Breakfast"], accommodation: "Cairo Hotel" },
      { day: 5, title: "Pyramids & Sphinx", description: "Full day at Giza Pyramids, Sphinx, and Memphis. Camel ride optional.", meals: ["Breakfast"], accommodation: "Cairo Hotel" },
      { day: 6, title: "Museums & Markets", description: "Egyptian Museum, Coptic Cairo, and Khan el-Khalili bazaar.", meals: ["Breakfast"], accommodation: "Cairo Hotel" },
      { day: 7, title: "Departure", description: "Transfer to airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "4 DAYS - THE ULTIMATE OF NORTHERN TANZANIA EXPERIENCES",
    slug: "4-days-the-ultimate-of-northern-tanzania-experiences",
    excerpt: "Discover Tanzania's northern circuit with Tarangire, Ngorongoro Crater, and Serengeti.",
    description: "Experience Tanzania's most iconic wildlife destinations in just 4 days. From the elephant paradise of Tarangire to the incredible wildlife density of Ngorongoro Crater, this safari offers incredible value.",
    image: "/safaris/4-days-the-ultimate-of-northern-tanzania-experiences.jpg",
    gallery: [],
    destinationId: "tanzania",
    duration: "4 Days / 3 Nights",
    price: 1650,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-12 people",
    accommodation: "Tented camps and lodges",
    activities: ["Game Drives", "Wildlife Viewing", "Crater Tour", "Photography"],
    highlights: ["Ngorongoro Crater", "Tarangire Elephants", "Big Five", "Stunning Landscapes"],
    includes: ["Accommodation", "All meals", "Park fees", "4x4 vehicle", "Professional guide"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arusha - Tarangire", description: "Drive to Tarangire National Park. Famous for elephants and baobab trees. Afternoon game drive.", meals: ["Lunch", "Dinner"], accommodation: "Tarangire Camp" },
      { day: 2, title: "Tarangire - Ngorongoro", description: "Morning game drive. Drive to Ngorongoro Conservation Area. Spectacular crater rim views.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Ngorongoro Lodge" },
      { day: 3, title: "Ngorongoro Crater", description: "Full day crater tour. Highest wildlife density in Africa. Chance to see Big Five.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Ngorongoro Lodge" },
      { day: 4, title: "Ngorongoro - Arusha", description: "Morning at leisure. Drive back to Arusha. Airport drop-off.", meals: ["Breakfast", "Lunch"], accommodation: "N/A" }
    ]
  },
  {
    title: "Mount Kenya Climbing 5 days and safari 1 nights 2025",
    slug: "mount-kenya-climbing-5-days-and-safari-1-nights-2025",
    excerpt: "Climb Africa's second highest peak and enjoy a wildlife safari in the surrounding area.",
    description: "Challenge yourself with a climb up Mount Kenya, Africa's second highest peak. Experience stunning alpine scenery, unique flora, and diverse wildlife. Finish with a relaxing safari night.",
    image: "/safaris/mount-kenya-climbing-5-days-and-safari-1-nights-2025.jpg",
    gallery: [],
    destinationId: "kenya",
    duration: "6 Days / 5 Nights",
    price: 1779,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "2-10 people",
    accommodation: "Mountain huts and safari camp",
    activities: ["Mountain Climbing", "Hiking", "Wildlife Viewing", "Photography"],
    highlights: ["Mount Kenya Summit", "Point Lenana", "Alpine Scenery", "Wildlife Safari"],
    includes: ["Mountain guide", "Porters", "Accommodation", "Meals on trek", "Park fees", "Equipment"],
    excludes: ["International flights", "Travel insurance", "Personal climbing gear", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Nairobi - Nanyuki", description: "Pick-up from Nairobi. Drive to Nanyuki (3 hours). Afternoon acclimatization walk.", meals: ["Lunch", "Dinner"], accommodation: "Nanyuki Hotel" },
      { day: 2, title: "Nanyuki - Old Moses Camp", description: "Drive to Sirimon Gate. Hike to Old Moses Camp (3,300m). 3-4 hours hiking.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Old Moses Camp" },
      { day: 3, title: "Old Moses - Shipton's Camp", description: "Hike to Shipton's Camp (4,200m) via Mackinder's Valley. 6-7 hours hiking.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Shipton's Camp" },
      { day: 4, title: "Summit Day - Point Lenana", description: "Early morning summit attempt (4,985m) for sunrise. Descend to Old Moses Camp.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Old Moses Camp" },
      { day: 5, title: "Descend & Safari", description: "Hike down to Sirimon Gate. Drive to Sweetwaters Reserve. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Sweetwaters Camp" },
      { day: 6, title: "Sweetwaters - Nairobi", description: "Morning game drive. Drive back to Nairobi. Airport drop-off.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "7DAYS/06NIGHT -TARANGIRE-NGORONGORO- SERENGETI",
    slug: "7days-06night-tarangire-ngorongoro-serengeti",
    excerpt: "The ultimate Tanzania safari covering all three iconic northern circuit parks.",
    description: "Experience the best of Tanzania's northern safari circuit. From Tarangire's elephants to the wildlife-rich Ngorongoro Crater and the endless plains of the Serengeti, this safari delivers unforgettable wildlife encounters.",
    image: "/safaris/7days-06night-tarangire-ngorongoro-serengeti.jpg",
    gallery: [],
    destinationId: "tanzania",
    duration: "7 Days / 6 Nights",
    price: 1974,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "2-12 people",
    accommodation: "Tented camps and lodges",
    activities: ["Game Drives", "Wildlife Viewing", "Cultural Visits", "Photography"],
    highlights: ["Serengeti Migration", "Ngorongoro Crater", "Big Five", "Maasai Culture"],
    includes: ["4wd Land cruiser with pop up viewing roof", "Driver guides and Local guides salary", "Unlimited Mileage", "All park fees", "Cycling tour- Mto wa Mbu village", "Cooking class", "Accommodation charges", "All meals", "Mineral water"],
    excludes: ["International flight charges", "Visas", "Tips to driver/s or helping staff", "Items of personal nature", "Telephone bills"],
    itinerary: [
      { day: 1, title: "Arrival - Kilimanjaro International airport", description: "Pick-up from Kilimanjaro Airport. Transfer to Arusha hotel for overnight.", meals: ["Dinner"], accommodation: "Arusha Hotel" },
      { day: 2, title: "Arusha - Tarangire National Park", description: "Breakfast then leave Arusha. Drive to Tarangire for afternoon game drive. Elephant herds and baobabs.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Tarangire Camp" },
      { day: 3, title: "Tarangire - Mto wa Mbu - Ngorongoro", description: "Morning cycling tour in Mto wa Mbu village. Afternoon drive to Ngorongoro. Stunning crater rim views.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Ngorongoro Lodge" },
      { day: 4, title: "Ngorongoro Crater", description: "Full day crater tour. Descend 600m into this wildlife paradise. Excellent Big Five viewing.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Ngorongoro Lodge" },
      { day: 5, title: "Ngorongoro - Serengeti", description: "Drive to Serengeti via Olduvai Gorge. Afternoon game drive in the endless plains.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Serengeti Camp" },
      { day: 6, title: "Serengeti Full Day", description: "Full day exploring Serengeti. Morning and afternoon game drives. Search for the Big Five.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Serengeti Camp" },
      { day: 7, title: "Serengeti - Arusha - Departure", description: "Final morning game drive. Fly back to Arusha (or drive). Transfer to airport.", meals: ["Breakfast", "Lunch"], accommodation: "N/A" }
    ]
  },
  {
    title: "7-Day Gaborone Adventure & Culture Itinerary",
    slug: "7-day-gaborone-adventure-culture-itinerary",
    excerpt: "Discover the vibrant capital of Botswana with its rich culture, wildlife, and modern attractions.",
    description: "Explore Gaborone and surrounding areas on this comprehensive 7-day tour. Experience Botswana's unique culture, visit nearby game reserves, and enjoy the hospitality of this peaceful African nation.",
    image: "/safaris/7-day-gaborone-adventure-culture-itinerary.jpg",
    gallery: [],
    destinationId: "botswana",
    duration: "7 Days / 6 Nights",
    price: 801,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-12 people",
    accommodation: "Hotels and lodges",
    activities: ["City Tours", "Cultural Visits", "Game Viewing", "Museum Visits"],
    highlights: ["Gaborone City", "Mokolodi Nature Reserve", "National Museum", "Local Culture"],
    includes: ["Accommodation", "Breakfast daily", "Airport transfers", "Guided tours", "Park fees"],
    excludes: ["International flights", "Lunch and dinner", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arrival Gaborone", description: "Arrive at Sir Seretse Khama International Airport. Transfer to hotel. Welcome dinner.", meals: ["Dinner"], accommodation: "Gaborone Hotel" },
      { day: 2, title: "Gaborone City Tour", description: "Explore the capital including National Museum, Parliament, and Three Dikgosi Monument.", meals: ["Breakfast"], accommodation: "Gaborone Hotel" },
      { day: 3, title: "Mokolodi Nature Reserve", description: "Full day at Mokolodi. Game drives, rhino tracking, and environmental education center.", meals: ["Breakfast", "Lunch"], accommodation: "Gaborone Hotel" },
      { day: 4, title: "Cultural Experience", description: "Visit a local village. Traditional food, crafts, and interaction with locals.", meals: ["Breakfast", "Lunch"], accommodation: "Gaborone Hotel" },
      { day: 5, title: "Free Day & Shopping", description: "Day at leisure. Visit Riverwalk Mall or Craft Markets for souvenirs.", meals: ["Breakfast"], accommodation: "Gaborone Hotel" },
      { day: 6, title: "Mokolodi - Gaborone", description: "Morning at Mokolodi. Farewell dinner with traditional entertainment.", meals: ["Breakfast", "Dinner"], accommodation: "Gaborone Hotel" },
      { day: 7, title: "Departure", description: "Transfer to airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "9 NIGHTS - THE SECRET OF ZAMBIA SAFARI",
    slug: "9-nights-the-secret-of-zambia-safari",
    excerpt: "An exclusive luxury safari exploring Zambia's hidden gems including South Luangwa and Lower Zambezi.",
    description: "Experience Zambia's pristine wilderness areas on this exclusive 9-night luxury safari. Walk in the footsteps of pioneers in South Luangwa and enjoy game viewing along the mighty Zambezi River.",
    image: "/safaris/9-nights-the-secret-of-zambia-safari.jpg",
    gallery: [],
    destinationId: "zambia",
    duration: "10 Days / 9 Nights",
    price: 8755,
    currency: "USD",
    published: true,
    featured: true,
    groupSize: "Maximum 8 people",
    accommodation: "Luxury lodges and bush camps",
    activities: ["Walking Safaris", "Game Drives", "Boat Cruises", "Night Drives", "Fishing"],
    highlights: ["South Luangwa Walking Safaris", "Lower Zambezi Canoe Trips", "Leopard Viewing", "Luxury Accommodation"],
    includes: ["Luxury accommodation", "All meals", "All activities", "Park fees", "Domestic flights", "Professional guides"],
    excludes: ["International flights", "Travel insurance", "Personal expenses", "Tips", "Visa fees"],
    itinerary: [
      { day: 1, title: "Arrival Lusaka - South Luangwa", description: "Arrive in Lusaka. Light aircraft flight to Mfuwe, South Luangwa. Transfer to lodge.", meals: ["Dinner"], accommodation: "Luangwa Safari Lodge" },
      { day: 2, title: "South Luangwa Walking Safari", description: "Morning walking safari - the home of the walking safari. Afternoon game drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Luangwa Safari Lodge" },
      { day: 3, title: "South Luangwa Full Day", description: "Full day exploring South Luangwa. Morning walk, afternoon drive, night drive.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Luangwa Safari Lodge" },
      { day: 4, title: "South Luangwa Bush Camp", description: "Move to a remote bush camp. Authentic walking safari experience.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Luangwa Bush Camp" },
      { day: 5, title: "Bush Camp Experience", description: "Full day from bush camp. Walking safaris and game viewing.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Luangwa Bush Camp" },
      { day: 6, title: "South Luangwa - Lower Zambezi", description: "Fly to Lower Zambezi National Park. Transfer to riverside lodge.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Zambezi Lodge" },
      { day: 7, title: "Lower Zambezi Activities", description: "Morning canoe safari on the Zambezi. Afternoon game drive. Evening boat cruise.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Zambezi Lodge" },
      { day: 8, title: "Lower Zambezi Full Day", description: "Tiger fishing, canoeing, game drives. Multiple activities available.", meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Zambezi Lodge" },
      { day: 9, title: "Lower Zambezi - Lusaka", description: "Final morning activity. Fly back to Lusaka. Overnight in Lusaka.", meals: ["Breakfast", "Dinner"], accommodation: "Lusaka Hotel" },
      { day: 10, title: "Departure", description: "Transfer to Lusaka International Airport for departure.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  },
  {
    title: "5-night adventure package in the Malindi",
    slug: "5-night-adventure-package-in-the-malindi",
    excerpt: "Relax and explore Kenya's beautiful coastal town of Malindi with its pristine beaches and marine park.",
    description: "Enjoy the perfect Kenyan coast getaway in Malindi. Relax on pristine beaches, explore the marine park, visit historic sites, and experience Swahili culture on this 5-night coastal adventure.",
    image: "/safaris/5-night-adventure-package-in-the-malindi.jpg",
    gallery: [],
    destinationId: "kenya",
    duration: "6 Days / 5 Nights",
    price: 1050,
    currency: "USD",
    published: true,
    featured: false,
    groupSize: "2-12 people",
    accommodation: "Beach resort",
    activities: ["Beach Relaxation", "Snorkeling", "Dhow Trips", "Historical Tours", "Water Sports"],
    highlights: ["Malindi Marine Park", "Vasco da Gama Pillar", "Gede Ruins", "Swahili Culture", "Watamu Beach"],
    includes: ["Beach resort accommodation", "Half board basis", "Airport transfers", "Marine park fees", "Excursions as per itinerary"],
    excludes: ["International flights", "Lunch", "Personal expenses", "Tips", "Water sports", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival Malindi", description: "Arrive at Malindi Airport. Transfer to beach resort. Welcome cocktail and dinner.", meals: ["Dinner"], accommodation: "Malindi Beach Resort" },
      { day: 2, title: "Malindi Marine Park", description: "Morning snorkeling trip in Malindi Marine Park. Colorful coral and tropical fish. Afternoon at leisure.", meals: ["Breakfast", "Dinner"], accommodation: "Malindi Beach Resort" },
      { day: 3, title: "Historical Malindi", description: "Visit Vasco da Gama Pillar, Portuguese Chapel, and Malindi Museum. Afternoon dhow cruise.", meals: ["Breakfast", "Dinner"], accommodation: "Malindi Beach Resort" },
      { day: 4, title: "Gede Ruins & Watamu", description: "Visit ancient Gede Ruins. Afternoon at Watamu Beach - one of the world's best beaches.", meals: ["Breakfast", "Dinner"], accommodation: "Malindi Beach Resort" },
      { day: 5, title: "Arabuko Sokoke Forest", description: "Morning nature walk in Arabuko Sokoke Forest. Butterfly watching and birding. Farewell dinner.", meals: ["Breakfast", "Dinner"], accommodation: "Malindi Beach Resort" },
      { day: 6, title: "Departure", description: "Free time for last minute shopping. Transfer to Malindi Airport.", meals: ["Breakfast"], accommodation: "N/A" }
    ]
  }
];

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean up existing data
  console.log('Cleaning up existing data...');
  await prisma.itineraryDay.deleteMany();
  await prisma.safari.deleteMany();
  await prisma.destination.deleteMany();
  console.log('✓ Existing data cleaned\n');

  // Create destinations
  console.log('Creating destinations...');
  const destinations = [
    { name: 'Kenya', slug: 'kenya', tagline: 'The Ultimate Safari Destination', description: 'The ultimate safari destination with abundant wildlife including the Big Five, the Great Migration, and stunning landscapes from savannahs to beaches.', image: '/destinations/kenya.jpg', heroImage: '/destinations/kenya-hero.jpg', highlights: ['Big Five', 'Masai Mara', 'Mount Kenya', 'Indian Ocean Beaches'], bestTimeToVisit: 'June to October', languages: ['English', 'Swahili'], currency: 'KES' },
    { name: 'Tanzania', slug: 'tanzania', tagline: 'Land of the Serengeti', description: 'Home to Serengeti and Ngorongoro Crater, Tanzania offers world-class wildlife viewing and the highest peak in Africa.', image: '/destinations/tanzania.jpg', heroImage: '/destinations/tanzania-hero.jpg', highlights: ['Serengeti Migration', 'Ngorongoro Crater', 'Mount Kilimanjaro', 'Zanzibar'], bestTimeToVisit: 'June to October', languages: ['English', 'Swahili'], currency: 'TZS' },
    { name: 'Uganda', slug: 'uganda', tagline: 'The Pearl of Africa', description: 'Gorilla trekking and unique wildlife experiences in pristine rainforests and savannahs.', image: '/destinations/uganda.jpg', heroImage: '/destinations/uganda-hero.jpg', highlights: ['Mountain Gorillas', 'Bwindi Forest', 'Queen Elizabeth NP'], bestTimeToVisit: 'June to September', languages: ['English', 'Swahili'], currency: 'UGX' },
    { name: 'Rwanda', slug: 'rwanda', tagline: 'Land of a Thousand Hills', description: 'Mountain gorillas and pristine wilderness in a country of remarkable recovery and beauty.', image: '/destinations/rwanda.jpg', heroImage: '/destinations/rwanda-hero.jpg', highlights: ['Mountain Gorillas', 'Volcanoes NP', 'Kigali'], bestTimeToVisit: 'June to September', languages: ['English', 'French', 'Kinyarwanda'], currency: 'RWF' },
    { name: 'South Africa', slug: 'south-africa', tagline: 'A World in One Country', description: 'Diverse landscapes and Big Five safari combined with world-class cities and wine regions.', image: '/destinations/south-africa.jpg', heroImage: '/destinations/south-africa-hero.jpg', highlights: ['Kruger NP', 'Cape Town', 'Garden Route', 'Winelands'], bestTimeToVisit: 'May to September', languages: ['English', 'Afrikaans'], currency: 'ZAR' },
    { name: 'Botswana', slug: 'botswana', tagline: 'Pure Africa', description: 'Exclusive safari experiences in the Okavango Delta and vast wilderness areas.', image: '/destinations/botswana.jpg', heroImage: '/destinations/botswana-hero.jpg', highlights: ['Okavango Delta', 'Chobe NP', 'Makgadikgadi Pans'], bestTimeToVisit: 'May to October', languages: ['English', 'Setswana'], currency: 'BWP' },
    { name: 'Zambia', slug: 'zambia', tagline: 'The Real Africa', description: 'Walking safaris and Victoria Falls in the birthplace of the walking safari.', image: '/destinations/zambia.jpg', heroImage: '/destinations/zambia-hero.jpg', highlights: ['Victoria Falls', 'South Luangwa', 'Lower Zambezi'], bestTimeToVisit: 'May to October', languages: ['English'], currency: 'ZMW' },
    { name: 'Zimbabwe', slug: 'zimbabwe', tagline: 'Discover the Wonder', description: 'Victoria Falls and wildlife parks in a country with rich history and culture.', image: '/destinations/zimbabwe.jpg', heroImage: '/destinations/zimbabwe-hero.jpg', highlights: ['Victoria Falls', 'Hwange NP', 'Mana Pools'], bestTimeToVisit: 'May to October', languages: ['English', 'Shona'], currency: 'USD' },
    { name: 'Namibia', slug: 'namibia', tagline: 'Endless Horizons', description: 'Desert landscapes and unique wildlife in one of the worlds most sparsely populated countries.', image: '/destinations/namibia.jpg', heroImage: '/destinations/namibia-hero.jpg', highlights: ['Sossusvlei', 'Etosha NP', 'Skeleton Coast'], bestTimeToVisit: 'May to October', languages: ['English', 'Afrikaans'], currency: 'NAD' },
    { name: 'Egypt', slug: 'egypt', tagline: 'Where It All Begins', description: 'Ancient wonders and Red Sea beaches in the cradle of civilization.', image: '/destinations/egypt.jpg', heroImage: '/destinations/egypt-hero.jpg', highlights: ['Pyramids', 'Nile River', 'Red Sea', 'Luxor'], bestTimeToVisit: 'October to April', languages: ['Arabic', 'English'], currency: 'EGP' },
    { name: 'Madagascar', slug: 'madagascar', tagline: 'The Eighth Continent', description: 'Unique wildlife and surreal landscapes found nowhere else on Earth.', image: '/destinations/madagascar.jpg', heroImage: '/destinations/madagascar-hero.jpg', highlights: ['Lemurs', 'Baobabs', 'Tsingy', 'Beaches'], bestTimeToVisit: 'April to November', languages: ['Malagasy', 'French'], currency: 'MGA' },
    { name: 'Malaysia', slug: 'malaysia', tagline: 'Truly Asia', description: 'Diverse culture and natural beauty from modern cities to ancient rainforests.', image: '/destinations/malaysia.jpg', heroImage: '/destinations/malaysia-hero.jpg', highlights: ['Kuala Lumpur', 'Borneo', 'Rainforests', 'Islands'], bestTimeToVisit: 'March to October', languages: ['Malay', 'English', 'Chinese'], currency: 'MYR' },
  ];

  for (const dest of destinations) {
    await prisma.destination.create({ data: dest });
  }
  console.log(`✓ Created ${destinations.length} destinations\n`);

  // Create safaris from WordPress data
  console.log('Creating safaris from WordPress data...');
  
  for (const safari of wpSafaris) {
    const { itinerary, ...safariData } = safari;
    
    // Look up destination by slug
    const dest = await prisma.destination.findUnique({
      where: { slug: safari.destinationId }
    });
    
    if (!dest) {
      console.log(`  ⚠ Destination ${safari.destinationId} not found, skipping ${safari.title}`);
      continue;
    }

    const created = await prisma.safari.create({
      data: {
        title: safari.title,
        slug: safari.slug,
        destinationId: dest.id,
        duration: safari.duration,
        price: safari.price,
        currency: safari.currency,
        excerpt: safari.excerpt,
        description: safari.description,
        image: safari.image,
        groupSize: safari.groupSize,
        accommodation: safari.accommodation,
        activities: safari.activities || [],
        highlights: safari.highlights || [],
        includes: safari.includes || [],
        excludes: safari.excludes || [],
        published: safari.published,
        featured: safari.featured,
        itinerary: {
          create: (itinerary || []).map((day: any) => ({
            day: day.day,
            title: day.title,
            description: `${day.description}\n\nMeals: ${day.meals?.join(', ') || 'TBD'}\nAccommodation: ${day.accommodation || 'TBD'}`
          }))
        }
      }
    });
    
    console.log(`  ✓ Created: ${safari.title} ($${safari.price})`);
  }

  console.log(`\n✅ Seed completed successfully!`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Destinations: ${await prisma.destination.count()}`);
  console.log(`   - Safaris: ${await prisma.safari.count()}`);
  console.log(`   - Itinerary days: ${await prisma.itineraryDay.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
