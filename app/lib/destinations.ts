export interface DestinationData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  highlights: string[];
  bestTimeToVisit: string;
  languages: string[];
  currency: string;
  popularParks: {
    name: string;
    description: string;
    image: string;
  }[];
  gallery: string[];
}

export const destinations: Record<string, DestinationData> = {
  kenya: {
    id: "kenya",
    name: "Kenya",
    tagline: "The Heart of Safari",
    description:
      "Kenya is the birthplace of the safari, offering unparalleled wildlife viewing opportunities. From the iconic Masai Mara to the snow-capped Mount Kenya, this East African gem delivers authentic African adventures with world-class hospitality.",
    image: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg",
    heroImage: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg",
    highlights: [
      "Witness the Great Migration in Masai Mara",
      "See the Big Five in their natural habitat",
      "Experience authentic Maasai culture",
      "Stunning views of Mount Kenya",
      "Beautiful Indian Ocean beaches",
    ],
    bestTimeToVisit: "June to October for migration, January to March for calving season",
    languages: ["English", "Swahili"],
    currency: "Kenyan Shilling (KES)",
    popularParks: [
      {
        name: "Masai Mara National Reserve",
        description: "World-famous for the Great Migration and exceptional big cat sightings.",
        image: "/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg",
      },
      {
        name: "Amboseli National Park",
        description: "Famous for large elephant herds with Mount Kilimanjaro as backdrop.",
        image: "/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg",
      },
      {
        name: "Samburu National Reserve",
        description: "Home to unique northern species and stunning desert landscapes.",
        image: "/images/safaris/other/sierra-tours-and-safaris-samburu-safaris-image01.jpg",
      },
    ],
    gallery: [
      "/images/safaris/other/sierra-tours-and-safaris-nakuru-safaris-image01.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-naivasha-safaris-image01.jpg",
      "/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01.jpg",
    ],
  },
  tanzania: {
    id: "tanzania",
    name: "Tanzania",
    tagline: "Land of the Serengeti",
    description:
      "Tanzania offers the ultimate safari experience with the world-famous Serengeti National Park and the magnificent Ngorongoro Crater. From wildebeest migrations to volcanic craters teeming with wildlife, Tanzania is a safari paradise.",
    image: "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    heroImage: "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    highlights: [
      "The endless plains of Serengeti",
      "Ngorongoro Crater - Africa's Garden of Eden",
      "Climb Mount Kilimanjaro",
      "Zanzibar spice islands and beaches",
      "Olduvai Gorge - Cradle of Mankind",
    ],
    bestTimeToVisit: "June to October for migration, year-round for Ngorongoro",
    languages: ["English", "Swahili"],
    currency: "Tanzanian Shilling (TZS)",
    popularParks: [
      {
        name: "Serengeti National Park",
        description: "1.5 million hectare ecosystem hosting the world's largest mammal migration.",
        image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg",
      },
      {
        name: "Ngorongoro Crater",
        description: "The world's largest inactive volcanic caldera with incredible wildlife density.",
        image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03.jpg",
      },
      {
        name: "Tarangire National Park",
        description: "Famous for massive elephant herds and ancient baobab trees.",
        image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image02.jpg",
      },
    ],
    gallery: [
      "/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img01.jpg",
      "/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img02.jpg",
      "/images/safaris/other/sierra-tours-and-travel-4-DAYS-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img03.jpg",
    ],
  },
  botswana: {
    id: "botswana",
    name: "Botswana",
    tagline: "Africa's Best Kept Secret",
    description:
      "Botswana offers an exclusive safari experience with the pristine Okavango Delta, the elephant-rich Chobe National Park, and the otherworldly Makgadikgadi Pans. Low tourism density ensures intimate wildlife encounters.",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    heroImage: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    highlights: [
      "Mokoro canoe safaris in Okavango Delta",
      "Largest elephant population in Africa",
      "Luxury tented camps on private concessions",
      "Stargazing in Makgadikgadi Pans",
      "Walking safaris with San bushmen",
    ],
    bestTimeToVisit: "May to October for dry season wildlife viewing",
    languages: ["English", "Setswana"],
    currency: "Botswana Pula (BWP)",
    popularParks: [
      {
        name: "Okavango Delta",
        description: "UNESCO World Heritage site with unique water-based safari experiences.",
        image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
      },
      {
        name: "Chobe National Park",
        description: "Famous for having Africa's largest concentration of elephants.",
        image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg",
      },
      {
        name: "Makgadikgadi Pans",
        description: "Vast salt pans offering unique desert-adapted wildlife experiences.",
        image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpeg",
      },
    ],
    gallery: [
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1024x576.jpeg",
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-1536x864.jpeg",
      "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-768x432.jpeg",
    ],
  },
  zambia: {
    id: "zambia",
    name: "Zambia",
    tagline: "The Real Africa",
    description:
      "Zambia offers authentic walking safaris and the magnificent Victoria Falls. With some of Africa's best guides and untouched wilderness areas, Zambia provides a truly wild safari experience.",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    heroImage: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    highlights: [
      "Victoria Falls - The Smoke that Thunders",
      "Pioneer of walking safaris",
      "Canoe safaris on the Zambezi River",
      "Remote and uncrowded parks",
      "Night drives and walking trails",
    ],
    bestTimeToVisit: "June to October for best wildlife viewing",
    languages: ["English"],
    currency: "Zambian Kwacha (ZMW)",
    popularParks: [
      {
        name: "South Luangwa National Park",
        description: "Birthplace of the walking safari with incredible leopard sightings.",
        image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
      },
      {
        name: "Lower Zambezi National Park",
        description: "Canoe safaris and excellent fishing on the Zambezi River.",
        image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-ra58avp5fxclzyxseo3te2qo5v8mkdqo7xierk4bz4.jpg",
      },
      {
        name: "Kafue National Park",
        description: "Zambia's largest park with diverse ecosystems and rare antelope.",
        image: "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg",
      },
    ],
    gallery: [
      "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-03.jpg",
      "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-04.jpg",
      "/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpg",
    ],
  },
  rwanda: {
    id: "rwanda",
    name: "Rwanda",
    tagline: "Land of a Thousand Hills",
    description:
      "Rwanda offers one of the most profound wildlife experiences on earth - mountain gorilla trekking in the misty Volcanoes National Park. Combined with chimpanzee tracking and Big Five safaris, Rwanda is a compact but diverse destination.",
    image: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    heroImage: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    highlights: [
      "Gorilla trekking in Volcanoes National Park",
      "Chimpanzee tracking in Nyungwe Forest",
      "Big Five safaris in Akagera National Park",
      "Beautiful rolling hills and landscapes",
      "Genocide Memorial and cultural experiences",
    ],
    bestTimeToVisit: "June to September for gorilla trekking (dry season)",
    languages: ["English", "French", "Kinyarwanda"],
    currency: "Rwandan Franc (RWF)",
    popularParks: [
      {
        name: "Volcanoes National Park",
        description: "Home to endangered mountain gorillas and golden monkeys.",
        image: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
      },
      {
        name: "Akagera National Park",
        description: "Scenic savannah park with the Big Five and wetland habitats.",
        image: "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-01.jpg",
      },
      {
        name: "Nyungwe Forest",
        description: "Ancient rainforest home to chimpanzees and colobus monkeys.",
        image: "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-02.jpg",
      },
    ],
    gallery: [
      "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-03.jpg",
      "/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-04.jpg",
      "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    ],
  },
  egypt: {
    id: "egypt",
    name: "Egypt",
    tagline: "Cradle of Civilization",
    description:
      "Egypt combines ancient wonders with natural beauty. From the Pyramids of Giza to Nile cruises and Red Sea beaches, Egypt offers a unique blend of history, culture, and relaxation.",
    image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    heroImage: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    highlights: [
      "The Great Pyramids of Giza",
      "Nile River cruises",
      "Valley of the Kings in Luxor",
      "Red Sea diving and beaches",
      "Ancient temples and tombs",
    ],
    bestTimeToVisit: "October to April for cooler weather",
    languages: ["Arabic", "English"],
    currency: "Egyptian Pound (EGP)",
    popularParks: [
      {
        name: "Giza Plateau",
        description: "Home to the Great Pyramids and the Sphinx.",
        image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
      },
      {
        name: "Valley of the Kings",
        description: "Ancient burial ground of pharaohs including Tutankhamun.",
        image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-768x501.jpg",
      },
      {
        name: "Aswan & Abu Simbel",
        description: "Stunning temples and Nubian culture on the Nile.",
        image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-1024x668.jpg",
      },
    ],
    gallery: [
      "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-1536x1002.jpg",
      "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01-768x501.jpg",
      "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    ],
  },
};

export function getDestination(slug: string): DestinationData | undefined {
  return destinations[slug.toLowerCase()];
}

export function getAllDestinations(): DestinationData[] {
  return Object.values(destinations);
}
