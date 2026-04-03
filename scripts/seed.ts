import { prisma } from '../lib/db';

// Import the static data
const destinationsData = {
  kenya: {
    name: "Kenya",
    tagline: "The Heart of Safari",
    description: "Kenya is the birthplace of the safari, offering unparalleled wildlife viewing opportunities. From the iconic Masai Mara to the snow-capped Mount Kenya, this East African gem delivers authentic African adventures with world-class hospitality.",
    image: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg",
    heroImage: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg",
    highlights: ["Witness the Great Migration in Masai Mara", "See the Big Five in their natural habitat", "Experience authentic Maasai culture", "Stunning views of Mount Kenya", "Beautiful Indian Ocean beaches"],
    bestTimeToVisit: "June to October for migration, January to March for calving season",
    languages: ["English", "Swahili"],
    currency: "Kenyan Shilling (KES)",
    popularParks: [
      { name: "Masai Mara National Reserve", description: "World-famous for the Great Migration and exceptional big cat sightings.", image: "/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg" },
      { name: "Amboseli National Park", description: "Famous for large elephant herds with Mount Kilimanjaro as backdrop.", image: "/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg" },
      { name: "Samburu National Reserve", description: "Home to unique northern species and stunning desert landscapes.", image: "/images/safaris/other/sierra-tours-and-safaris-samburu-safaris-image01.jpg" },
    ],
    gallery: ["/images/safaris/other/sierra-tours-and-safaris-nakuru-safaris-image01.jpg", "/images/safaris/other/sierra-tours-and-safaris-naivasha-safaris-image01.jpg", "/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01.jpg"],
  },
  tanzania: {
    name: "Tanzania",
    tagline: "Land of the Serengeti",
    description: "Tanzania offers the ultimate safari experience with the world-famous Serengeti National Park and the magnificent Ngorongoro Crater. From wildebeest migrations to volcanic craters teeming with wildlife, Tanzania is a safari paradise.",
    image: "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    heroImage: "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    highlights: ["The endless plains of Serengeti", "Ngorongoro Crater - Africa's Garden of Eden", "Climb Mount Kilimanjaro", "Zanzibar spice islands and beaches", "Olduvai Gorge - Cradle of Mankind"],
    bestTimeToVisit: "June to October for migration, year-round for Ngorongoro",
    languages: ["English", "Swahili"],
    currency: "Tanzanian Shilling (TZS)",
    popularParks: [
      { name: "Serengeti National Park", description: "1.5 million hectare ecosystem hosting the world's largest mammal migration.", image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg" },
      { name: "Ngorongoro Crater", description: "The world's largest inactive volcanic caldera with incredible wildlife density.", image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03.jpg" },
      { name: "Tarangire National Park", description: "Famous for massive elephant herds and ancient baobab trees.", image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image02.jpg" },
    ],
    gallery: ["/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img01.jpg", "/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img02.jpg", "/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img03.jpg"],
  },
  botswana: {
    name: "Botswana",
    tagline: "Africa's Best Kept Secret",
    description: "Botswana offers an exclusive safari experience with the pristine Okavango Delta, the elephant-rich Chobe National Park, and the otherworldly Makgadikgadi Pans. Low tourism density ensures intimate wildlife encounters.",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    heroImage: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    highlights: ["Mokoro canoe safaris in Okavango Delta", "Largest elephant population in Africa", "Luxury tented camps on private concessions", "Stargazing in Makgadikgadi Pans", "Walking safaris with San bushmen"],
    bestTimeToVisit: "May to October for dry season wildlife viewing",
    languages: ["English", "Setswana"],
    currency: "Botswana Pula (BWP)",
    popularParks: [
      { name: "Okavango Delta", description: "UNESCO World Heritage site with unique water-based safari experiences.", image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg" },
      { name: "Chobe National Park", description: "Famous for having Africa's largest concentration of elephants.", image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg" },
      { name: "Makgadikgadi Pans", description: "Vast salt pans offering unique desert-adapted wildlife experiences.", image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpeg" },
    ],
    gallery: ["/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1024x576.jpeg", "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1536x864.jpeg", "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-768x432.jpeg"],
  },
  zambia: {
    name: "Zambia",
    tagline: "The Real Africa",
    description: "Zambia offers authentic walking safaris and the magnificent Victoria Falls. With some of Africa's best guides and untouched wilderness areas, Zambia provides a truly wild safari experience.",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    heroImage: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    highlights: ["Victoria Falls - The Smoke that Thunders", "Pioneer of walking safaris", "Canoe safaris on the Zambezi River", "Remote and uncrowded parks", "Night drives and walking trails"],
    bestTimeToVisit: "June to October for best wildlife viewing",
    languages: ["English"],
    currency: "Zambian Kwacha (ZMW)",
    popularParks: [
      { name: "South Luangwa National Park", description: "Birthplace of the walking safari with incredible leopard sightings.", image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg" },
      { name: "Lower Zambezi National Park", description: "Canoe safaris and excellent fishing on the Zambezi River.", image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-ra58avp5fxclzyxseo3te2qo5v8mkdqo7xierk4bz4.jpg" },
      { name: "Kafue National Park", description: "Zambia's largest park with diverse ecosystems and rare antelope.", image: "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg" },
    ],
    gallery: ["/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-03.jpg", "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-04.jpg", "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg"],
  },
  rwanda: {
    name: "Rwanda",
    tagline: "Land of a Thousand Hills",
    description: "Rwanda offers one of the most profound wildlife experiences on earth - mountain gorilla trekking in the misty Volcanoes National Park. Combined with chimpanzee tracking and Big Five safaris, Rwanda is a compact but diverse destination.",
    image: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    heroImage: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    highlights: ["Gorilla trekking in Volcanoes National Park", "Chimpanzee tracking in Nyungwe Forest", "Big Five safaris in Akagera National Park", "Beautiful rolling hills and landscapes", "Genocide Memorial and cultural experiences"],
    bestTimeToVisit: "June to September for gorilla trekking (dry season)",
    languages: ["English", "French", "Kinyarwanda"],
    currency: "Rwandan Franc (RWF)",
    popularParks: [
      { name: "Volcanoes National Park", description: "Home to endangered mountain gorillas and golden monkeys.", image: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg" },
      { name: "Akagera National Park", description: "Scenic savannah park with the Big Five and wetland habitats.", image: "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-01.jpg" },
      { name: "Nyungwe Forest", description: "Ancient rainforest home to chimpanzees and colobus monkeys.", image: "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-02.jpg" },
    ],
    gallery: ["/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-03.jpg", "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-04.jpg", "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg"],
  },
  egypt: {
    name: "Egypt",
    tagline: "Cradle of Civilization",
    description: "Egypt combines ancient wonders with natural beauty. From the Pyramids of Giza to Nile cruises and Red Sea beaches, Egypt offers a unique blend of history, culture, and relaxation.",
    image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    heroImage: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    highlights: ["The Great Pyramids of Giza", "Nile River cruises", "Valley of the Kings in Luxor", "Red Sea diving and beaches", "Ancient temples and tombs"],
    bestTimeToVisit: "October to April for cooler weather",
    languages: ["Arabic", "English"],
    currency: "Egyptian Pound (EGP)",
    popularParks: [
      { name: "Giza Plateau", description: "Home to the Great Pyramids and the Sphinx.", image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg" },
      { name: "Valley of the Kings", description: "Ancient burial ground of pharaohs including Tutankhamun.", image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-768x501.jpg" },
      { name: "Aswan & Abu Simbel", description: "Stunning temples and Nubian culture on the Nile.", image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-1024x668.jpg" },
    ],
    gallery: ["/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-1536x1002.jpg", "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-768x501.jpg", "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg"],
  },
};

const safarisData = [
  {
    title: "7 Days Serengeti & Ngorongoro Safari",
    destination: "tanzania",
    duration: "7 Days / 6 Nights",
    price: 2850,
    currency: "USD",
    excerpt: "Experience the best of Tanzania's northern circuit with game drives in Serengeti and Ngorongoro Crater.",
    description: "<p>This incredible 7-day safari takes you through Tanzania's most iconic national parks. Witness the endless plains of the Serengeti, home to the Great Migration, and descend into the Ngorongoro Crater, a UNESCO World Heritage site with one of the highest wildlife densities in Africa. Perfect for first-time safari-goers and wildlife enthusiasts alike.</p>",
    image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03.jpg",
    gallery: ["/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg", "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image02.jpg", "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg"],
    highlights: ["Witness the Great Migration in Serengeti (seasonal)", "Descend into Ngorongoro Crater for Big Five viewing", "Visit Tarangire National Park and its elephant herds", "Stay in luxury tented camps and lodges", "Professional English-speaking guide throughout"],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Meet your guide at Kilimanjaro Airport and transfer to your hotel in Arusha. Evening briefing about your upcoming safari adventure." },
      { day: 2, title: "Arusha to Tarangire National Park", description: "After breakfast, drive to Tarangire National Park. Famous for its large elephant herds and ancient baobab trees. Game drive and overnight at lodge." },
      { day: 3, title: "Tarangire to Serengeti", description: "Travel to the world-famous Serengeti National Park. En route, visit a Masai village. Afternoon game drive in Serengeti." },
      { day: 4, title: "Full Day in Serengeti", description: "Full day exploring the Serengeti. Search for the Big Five and witness the incredible wildlife that calls this park home. Optional hot air balloon safari." },
      { day: 5, title: "Serengeti to Ngorongoro", description: "Morning game drive in Serengeti before driving to Ngorongoro Conservation Area. Overnight on the crater rim with stunning views." },
      { day: 6, title: "Ngorongoro Crater", description: "Descend into the Ngorongoro Crater for a full day of game viewing. This natural amphitheater hosts incredible wildlife density including the endangered black rhino." },
      { day: 7, title: "Return to Arusha", description: "After breakfast, drive back to Arusha. Optional visit to a local market before transfer to the airport for your departure flight." },
    ],
    includes: ["All accommodation as per itinerary", "All meals during safari", "Professional English-speaking guide", "4x4 safari vehicle with pop-up roof", "All park entrance fees", "Airport transfers", "Drinking water during game drives"],
    excludes: ["International flights", "Travel insurance", "Visa fees", "Tips and gratuities", "Personal expenses", "Optional activities", "Alcoholic beverages"],
    groupSize: "2-6 people",
    accommodation: "Luxury lodges and tented camps",
    activities: ["Game drives", "Cultural visits", "Nature walks"],
    published: true,
    featured: true,
  },
  {
    title: "Mount Kenya Safari Adventure",
    destination: "kenya",
    duration: "5 Days / 4 Nights",
    price: 1950,
    currency: "USD",
    excerpt: "Explore the majestic Mount Kenya region with wildlife viewing and breathtaking mountain scenery.",
    description: "<p>Discover the beauty of Mount Kenya, Africa's second-highest peak. This safari combines wildlife viewing in the shadow of the mountain with visits to pristine forests and alpine meadows. Perfect for nature lovers and those seeking a less crowded safari experience.</p>",
    image: "/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg",
    gallery: ["/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image01.jpg", "/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image02.jpg", "/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image03.jpg"],
    highlights: ["Spectacular views of Mount Kenya", "Game drives in Mount Kenya National Park", "Visit to equator crossing point", "Stay in mountain lodges", "Rich birdlife including rare species"],
    itinerary: [
      { day: 1, title: "Nairobi to Mount Kenya", description: "Depart Nairobi and drive to Mount Kenya region. Afternoon nature walk and overnight at mountain lodge." },
      { day: 2, title: "Mount Kenya National Park", description: "Full day exploring Mount Kenya National Park. Game drives to spot elephant, buffalo, and various antelope species." },
      { day: 3, title: "Aberdare National Park", description: "Drive to Aberdare National Park. Game viewing in this mountainous park known for its waterfalls and diverse wildlife." },
      { day: 4, title: "Solio Game Reserve", description: "Visit Solio Game Reserve, renowned for its successful rhino breeding program. Excellent rhino sightings guaranteed." },
      { day: 5, title: "Return to Nairobi", description: "Morning game drive before returning to Nairobi. Drop-off at your hotel or airport." },
    ],
    includes: ["Accommodation in mountain lodges", "All meals", "Professional guide", "Park entrance fees", "Ground transport"],
    excludes: ["International flights", "Travel insurance", "Visa fees", "Tips", "Personal expenses"],
    groupSize: "2-6 people",
    accommodation: "Mountain lodges",
    activities: ["Game drives", "Nature walks", "Bird watching"],
    published: true,
    featured: false,
  },
  {
    title: "Botswana Okavango Delta Explorer",
    destination: "botswana",
    duration: "6 Days / 5 Nights",
    price: 3200,
    currency: "USD",
    excerpt: "Discover the jewel of the Kalahari with mokoro rides and game viewing in the pristine Okavango Delta.",
    description: "<p>Experience the world's largest inland delta, a UNESCO World Heritage site. This exclusive safari combines water-based activities in traditional mokoro canoes with game drives in one of Africa's most pristine wilderness areas. Limited tourism ensures an intimate wildlife experience.</p>",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    gallery: ["/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1024x576.jpeg", "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1536x864.jpeg", "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-768x432.jpeg"],
    highlights: ["Mokoro canoe safaris through delta channels", "Walking safaris on islands", "Excellent bird watching opportunities", "Stay in luxury tented camps", "Sunset boat cruises"],
    itinerary: [
      { day: 1, title: "Maun to Okavango Delta", description: "Fly from Maun to your luxury tented camp in the Okavango Delta. Afternoon mokoro excursion." },
      { day: 2, title: "Okavango Delta Activities", description: "Morning walking safari on an island. Afternoon mokoro ride through the delta's channels." },
      { day: 3, title: "Full Day in the Delta", description: "Full day exploring the delta. Game drives, mokoro rides, and boat cruises." },
      { day: 4, title: "Moremi Game Reserve", description: "Transfer to Moremi Game Reserve. Game drives in search of predators and big game." },
      { day: 5, title: "Moremi Game Drives", description: "Full day of game drives in Moremi, known for its excellent predator sightings." },
      { day: 6, title: "Return to Maun", description: "Final morning game drive before flying back to Maun." },
    ],
    includes: ["Luxury tented camp accommodation", "All meals and drinks (excluding premium)", "All activities", "Internal flights", "Professional guides", "Park fees"],
    excludes: ["International flights", "Travel insurance", "Visa fees", "Premium beverages", "Tips"],
    groupSize: "2-6 people",
    accommodation: "Luxury tented camps",
    activities: ["Mokoro rides", "Game drives", "Walking safaris", "Boat cruises"],
    published: true,
    featured: true,
  },
  {
    title: "Zambia Secret Safari Experience",
    destination: "zambia",
    duration: "9 Days / 8 Nights",
    price: 4100,
    currency: "USD",
    excerpt: "Explore the untouched wilderness of Zambia with walking safaris and Victoria Falls visits.",
    description: "<p>Zambia offers one of Africa's most authentic safari experiences. This comprehensive tour combines the world-famous Victoria Falls with South Luangwa National Park, the birthplace of the walking safari. Experience true wilderness with expert guides.</p>",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    gallery: ["/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-03.jpg", "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-04.jpg", "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg"],
    highlights: ["Visit Victoria Falls - Mosi-oa-Tunya", "Walking safaris in South Luangwa", "Night drives for nocturnal wildlife", "Canoe safari on the Zambezi River", "Remote bush camps"],
    itinerary: [
      { day: 1, title: "Arrival in Livingstone", description: "Arrive at Livingstone Airport. Transfer to your hotel with views of the Zambezi River." },
      { day: 2, title: "Victoria Falls", description: "Guided tour of Victoria Falls, one of the Seven Natural Wonders of the World. Afternoon sunset cruise on the Zambezi." },
      { day: 3, title: "Livingstone to South Luangwa", description: "Fly to Mfuwe and transfer to your safari camp in South Luangwa National Park." },
      { day: 4, title: "South Luangwa Walking Safari", description: "Morning walking safari with expert guide. Afternoon game drive and night drive." },
      { day: 5, title: "Full Day in South Luangwa", description: "Full day exploring South Luangwa with morning and afternoon activities." },
      { day: 6, title: "South Luangwa to Lower Zambezi", description: "Transfer to Lower Zambezi National Park. Evening game drive." },
      { day: 7, title: "Lower Zambezi Canoe Safari", description: "Canoe safari on the Zambezi River. Excellent opportunities to see hippos, elephants, and crocodiles." },
      { day: 8, title: "Lower Zambezi Game Drives", description: "Full day of game drives and boat cruises in Lower Zambezi." },
      { day: 9, title: "Departure", description: "Final morning activity before flying back to Lusaka for your departure." },
    ],
    includes: ["All accommodation", "All meals", "Internal flights", "All park fees", "Professional guides", "All activities"],
    excludes: ["International flights", "Travel insurance", "Visa fees", "Tips", "Personal expenses"],
    groupSize: "2-6 people",
    accommodation: "Safari lodges and bush camps",
    activities: ["Game drives", "Walking safaris", "Canoe safaris", "Boat cruises", "Night drives"],
    published: true,
    featured: true,
  },
];

async function seed() {
  console.log('🌱 Starting seed...\n');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.itineraryDay.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.popularPark.deleteMany();
  await prisma.safari.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.blogPost.deleteMany();
  console.log('✅ Cleared existing data\n');

  // Seed destinations
  console.log('Seeding destinations...');
  const destinationMap = new Map<string, string>();
  
  for (const [key, data] of Object.entries(destinationsData)) {
    const dest = await prisma.destination.create({
      data: {
        name: data.name,
        slug: key,
        tagline: data.tagline,
        description: data.description,
        image: data.image,
        heroImage: data.heroImage,
        highlights: data.highlights,
        bestTimeToVisit: data.bestTimeToVisit,
        languages: data.languages,
        currency: data.currency,
        published: true,
        popularParks: {
          create: data.popularParks,
        },
        gallery: {
          create: data.gallery.map((url, i) => ({ url, order: i })),
        },
      },
    });
    destinationMap.set(key, dest.id);
    console.log(`  ✅ Created destination: ${data.name}`);
  }
  console.log('');

  // Seed safaris
  console.log('Seeding safaris...');
  for (const safari of safarisData) {
    const destinationId = destinationMap.get(safari.destination);
    if (!destinationId) {
      console.log(`  ⚠️  Skipping safari ${safari.title} - destination not found`);
      continue;
    }

    const created = await prisma.safari.create({
      data: {
        title: safari.title,
        slug: safari.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        destinationId,
        duration: safari.duration,
        price: safari.price,
        currency: safari.currency,
        excerpt: safari.excerpt,
        description: safari.description,
        image: safari.image,
        groupSize: safari.groupSize,
        accommodation: safari.accommodation,
        activities: safari.activities,
        includes: safari.includes,
        excludes: safari.excludes,
        highlights: safari.highlights,
        published: safari.published,
        featured: safari.featured,
        itinerary: {
          create: safari.itinerary,
        },
        gallery: {
          create: safari.gallery.map((url, i) => ({ url, order: i })),
        },
      },
    });
    console.log(`  ✅ Created safari: ${safari.title}`);
  }
  console.log('');

  // Seed sample blog posts
  console.log('Seeding blog posts...');
  const blogPosts = [
    {
      title: "Top 10 Safari Destinations in Kenya",
      excerpt: "Discover the best wildlife viewing spots in Kenya, from the iconic Masai Mara to the hidden gems of Samburu.",
      content: "<p>Kenya is the birthplace of the safari, offering some of the most incredible wildlife experiences on Earth...</p>",
      image: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01-rbamx9reyz8y64l8g8d7yqeb9e95i3mkhgvfivup3c.jpg",
      author: "John Safari",
      category: "Kenya",
      published: true,
      featured: true,
    },
    {
      title: "The Great Migration: A Complete Guide",
      excerpt: "Everything you need to know about witnessing the world's greatest wildlife spectacle in Tanzania and Kenya.",
      content: "<p>The Great Migration is one of nature's most spectacular events, involving over 1.5 million wildebeest...</p>",
      image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03-ra1pcbh1j4lg3dxna0os6fw62mygbuxdtr0cssxrj4.jpg",
      author: "Sarah Explorer",
      category: "Tanzania",
      published: true,
      featured: false,
    },
    {
      title: "Luxury Safari Lodges in Botswana",
      excerpt: "Experience the ultimate in safari luxury at these exclusive lodges in the Okavango Delta and Chobe.",
      content: "<p>Botswana is renowned for its exclusive safari experiences and luxurious accommodations...</p>",
      image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg",
      author: "Michael Wilderness",
      category: "Botswana",
      published: true,
      featured: false,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        publishedAt: post.published ? new Date() : null,
      },
    });
    console.log(`  ✅ Created blog post: ${post.title}`);
  }
  console.log('');

  console.log('✅ Seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
