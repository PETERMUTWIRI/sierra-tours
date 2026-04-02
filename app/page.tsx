import Banner from "@/app/sections/Banner";
import TripSearch from "@/app/sections/TripSearch";
import FeaturedTrips from "@/app/sections/FeaturedTrips";
import Destinations from "@/app/sections/Destinations";
import WhyChooseUs from "@/app/sections/WhyChooseUs";
import Testimonials from "@/app/sections/Testimonials";
import BlogSection from "@/app/sections/BlogSection";
import Newsletter from "@/app/sections/Newsletter";

export const metadata = {
  title: "Sierra Tours & Safaris | African Safari Adventures",
  description:
    "Discover the magic of Africa with our expertly curated safari experiences. From the Serengeti to Victoria Falls, we create unforgettable adventures.",
};

export default function HomePage() {
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

      {/* Featured Safari Trips */}
      <FeaturedTrips
        title="Popular Safaris"
        subtitle="Handpicked safari experiences for unforgettable African adventures."
      />

      {/* Explore Destinations */}
      <Destinations />

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
