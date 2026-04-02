import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  X, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  Bed,
  Compass
} from "lucide-react";
import { getTrip, getAllTrips } from "@/app/lib/trips";

interface TripPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const trips = getAllTrips();
  return trips.map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({ params }: TripPageProps) {
  const { slug } = await params;
  const trip = getTrip(slug);
  
  if (!trip) {
    return {
      title: "Trip Not Found",
    };
  }

  return {
    title: `${trip.title} | Sierra Tours & Safaris`,
    description: trip.excerpt,
  };
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug } = await params;
  const trip = getTrip(slug);

  if (!trip) {
    notFound();
  }

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <ChevronRight size={16} />
            <Link href="/safaris" className="hover:text-orange-500">Safaris</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900">{trip.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <Link
                href={`/destinations/${trip.destination}`}
                className="inline-flex items-center gap-2 text-orange-400 font-medium mb-4 hover:text-orange-300"
              >
                <MapPin size={18} />
                {trip.destination.charAt(0).toUpperCase() + trip.destination.slice(1)}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {trip.title}
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                {trip.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-orange-400" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-orange-400" />
                  <span>{trip.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Price Card Mobile */}
              <div className="lg:hidden bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-orange-500">
                    {trip.currency} {trip.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">per person</span>
                </div>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Book This Safari
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Safari Overview
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {trip.description}
                </p>

                {/* Highlights */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {trip.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Gallery */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gallery
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {trip.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${trip.title} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 200px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Detailed Itinerary
                </h2>
                <div className="space-y-6">
                  {trip.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-orange-600">
                          {day.day}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {day.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2">
                    {trip.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-2">
                    {trip.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card Desktop */}
                <div className="hidden lg:block bg-gray-50 rounded-xl p-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-orange-500">
                      {trip.currency} {trip.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500">per person</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Based on double occupancy
                  </p>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors mb-4"
                  >
                    Book This Safari
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    Ask a Question
                  </Link>
                </div>

                {/* Quick Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Quick Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Duration
                        </span>
                        <span className="text-sm text-gray-600">
                          {trip.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Group Size
                        </span>
                        <span className="text-sm text-gray-600">
                          {trip.groupSize}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bed className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Accommodation
                        </span>
                        <span className="text-sm text-gray-600">
                          {trip.accommodation}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Activities
                        </span>
                        <span className="text-sm text-gray-600">
                          {trip.activities.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Best Time
                        </span>
                        <span className="text-sm text-gray-600">
                          Year round
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Need Help Planning?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our safari experts are here to help you customize this trip to your preferences.
                  </p>
                  <Link
                    href="/contact"
                    className="text-orange-500 font-medium hover:text-orange-600 flex items-center gap-1"
                  >
                    Contact Us
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
