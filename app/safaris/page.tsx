import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Filter } from "lucide-react";
import { getAllTrips, getTripsByDestination } from "@/app/lib/trips";
import { getAllDestinations } from "@/app/lib/destinations";

interface SafarisPageProps {
  searchParams: Promise<{
    destination?: string;
  }>;
}

export const metadata = {
  title: "Safari Tours | Sierra Tours & Safaris",
  description:
    "Browse our collection of handpicked African safari tours. From Kenya to Botswana, find your perfect safari adventure.",
};

export default async function SafarisPage({ searchParams }: SafarisPageProps) {
  const params = await searchParams;
  const destinationFilter = params.destination;
  
  const trips = destinationFilter
    ? getTripsByDestination(destinationFilter)
    : getAllTrips();
  
  const destinations = getAllDestinations();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/images/hero/sierra-tours-and-travel-luxury-safaris-scaled.jpg"
          alt="Safari Tours"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Safari Tours
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Discover our handpicked collection of African safari experiences
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter size={20} />
              <span className="font-medium">Filter by destination:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/safaris"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !destinationFilter
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </Link>
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/safaris?destination=${dest.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    destinationFilter === dest.id
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {trips.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No safaris found for this destination. Check out our other destinations!
              </p>
              <Link
                href="/safaris"
                className="inline-flex items-center gap-2 mt-4 text-orange-500 font-medium hover:text-orange-600"
              >
                View All Safaris
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <article
                  key={trip.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  {/* Image */}
                  <Link href={`/trips/${trip.slug}`} className="block relative">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                          {trip.destination.charAt(0).toUpperCase() + trip.destination.slice(1)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg">
                        <span className="text-sm">{trip.currency}</span>
                        <span className="text-lg"> {trip.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={16} className="text-orange-500" />
                        {trip.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} className="text-orange-500" />
                        {trip.destination.charAt(0).toUpperCase() + trip.destination.slice(1)}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                      <Link href={`/trips/${trip.slug}`}>{trip.title}</Link>
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trip.excerpt}
                    </p>

                    <Link
                      href={`/trips/${trip.slug}`}
                      className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 border-2 border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can&apos;t Find Your Perfect Safari?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            We can customize any safari to match your preferences, budget, and schedule. Contact us for a personalized itinerary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Request Custom Safari
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
