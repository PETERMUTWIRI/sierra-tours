import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getAllDestinations } from "@/app/lib/destinations";

export const metadata = {
  title: "Safari Destinations | Sierra Tours & Safaris",
  description:
    "Explore Africa's best safari destinations including Kenya, Tanzania, Botswana, Zambia, Rwanda, and Egypt.",
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
          alt="Safari Destinations"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Safari Destinations
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover Africa&apos;s most incredible wildlife destinations, each offering unique safari experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="group relative h-[400px] rounded-xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    {destination.popularParks.length} Parks
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {destination.name}
                  </h2>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-orange-400 transition-colors">
                    Explore {destination.name}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Choosing Your Safari Destination
            </h2>
            <p className="text-gray-600 mb-8">
              Each African country offers a unique safari experience. Kenya and Tanzania are famous for the Great Migration, Botswana offers exclusive wilderness experiences, Zambia pioneered walking safaris, Rwanda provides gorilla trekking, and Egypt combines ancient wonders with natural beauty.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Get Expert Advice
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
