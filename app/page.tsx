import Banner from "@/app/sections/Banner";
import TripSearch from "@/app/sections/TripSearch";
import FeaturedTrips from "@/app/sections/FeaturedTrips";
import Destinations from "@/app/sections/Destinations";
import WhyChooseUs from "@/app/sections/WhyChooseUs";
import Testimonials from "@/app/sections/Testimonials";
import BlogSection from "@/app/sections/BlogSection";
import Newsletter from "@/app/sections/Newsletter";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Sierra Tours & Safaris | African Safari Adventures",
  description:
    "Discover the magic of Africa with our expertly curated safari experiences. From the Serengeti to Victoria Falls, we create unforgettable adventures.",
};

// Fetch featured safaris from database
async function getFeaturedSafaris() {
  return prisma.safari.findMany({
    where: { published: true },
    orderBy: [
      { featured: 'desc' },
      { price: 'asc' },
    ],
    take: 4,
    include: {
      destination: {
        select: { name: true, slug: true },
      },
    },
  });
}

// Fetch destinations from database
async function getDestinations() {
  return prisma.destination.findMany({
    orderBy: { name: 'asc' },
    take: 4,
    include: {
      _count: {
        select: { safaris: true },
      },
    },
  });
}

export default async function HomePage() {
  const [safaris, destinations] = await Promise.all([
    getFeaturedSafaris(),
    getDestinations(),
  ]);

  return (
    <main>
      {/* Hero Banner with Search */}
      <Banner
        title="Find Your Best Holiday"
        subtitle="Find great adventure holidays and activities around the planet."
        showSearch={true}
      />

      {/* Advanced Trip Search */}
      <TripSearch />

      {/* Featured Safari Trips - From Database */}
      <FeaturedTrips
        title="Popular Safaris"
        subtitle="Handpicked safari experiences for unforgettable African adventures."
        safaris={safaris}
      />

      {/* Explore Destinations - From Database */}
      <Destinations destinations={destinations} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Latest Blog Articles */}
      <BlogSection
        title="Latest Articles"
        subtitle="Get inspired for your next African adventure with our travel guides and tips."
      />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
