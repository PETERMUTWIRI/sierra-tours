import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSafariImage } from "@/lib/imageMapping";
import { Clock, MapPin, ArrowRight, Filter, Star, Calendar, Users } from "lucide-react";

export const metadata = {
  title: "Safari Tours | Sierra Tours & Safaris",
  description:
    "Browse our collection of handpicked African safari tours. From Kenya to Botswana, find your perfect safari adventure.",
};

type UnifiedTour = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  price: number;
  currency: string;
  duration: string;
  groupSize: string | null;
  destinationName: string;
  destinationSlug: string;
  featured: boolean;
  kind: "core" | "package";
  packageTypeSlug?: string;
};

async function getTours(destinationFilter?: string): Promise<UnifiedTour[]> {
  const [coreSafaris, packageSafaris] = await Promise.all([
    prisma.safari.findMany({
      where: {
        published: true,
        ...(destinationFilter && {
          destination: { slug: destinationFilter },
        }),
      },
      include: { destination: true },
      orderBy: [{ featured: "desc" }, { price: "asc" }],
    }),
    prisma.packageSafari.findMany({
      where: {
        published: true,
        ...(destinationFilter && {
          destination: { slug: destinationFilter },
        }),
      },
      include: {
        destination: true,
        packageType: { select: { slug: true } },
      },
      orderBy: [{ featured: "desc" }, { price: "asc" }],
    }),
  ]);

  const coreTours: UnifiedTour[] = coreSafaris.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    image: getSafariImage(s),
    price: s.price,
    currency: s.currency,
    duration: s.duration,
    groupSize: s.groupSize,
    destinationName: s.destination.name,
    destinationSlug: s.destination.slug,
    featured: s.featured,
    kind: "core",
  }));

  const packageTours: UnifiedTour[] = packageSafaris.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    image: getSafariImage(s),
    price: s.price,
    currency: s.currency,
    duration: s.duration,
    groupSize: s.groupSize ?? null,
    destinationName: s.destination?.name ?? "Multiple Destinations",
    destinationSlug: s.destination?.slug ?? "",
    featured: s.featured,
    kind: "package",
    packageTypeSlug: s.packageType.slug,
  }));

  return [...coreTours, ...packageTours].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.price - b.price;
  });
}

async function getDestinations() {
  return prisma.destination.findMany({
    orderBy: { name: "asc" },
  });
}

interface SafarisPageProps {
  searchParams: Promise<{
    destination?: string;
  }>;
}

export default async function SafarisPage({ searchParams }: SafarisPageProps) {
  const params = await searchParams;
  const destinationFilter = params.destination;

  const [tours, destinations] = await Promise.all([
    getTours(destinationFilter),
    getDestinations(),
  ]);

  const featuredTours = tours.filter((s) => s.featured);
  const regularTours = tours.filter((s) => !s.featured);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero/sierra-tours-and-travel-luxury-safaris-scaled.jpg"
          alt="Safari Tours"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Safari Tours
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover our handpicked collection of African safari experiences.
              From the Serengeti to Victoria Falls, your adventure awaits.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#11A560]">{tours.length}+</p>
              <p className="text-gray-600 text-sm">Tour Packages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#11A560]">{destinations.length}</p>
              <p className="text-gray-600 text-sm">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#11A560]">15+</p>
              <p className="text-gray-600 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#11A560]">5000+</p>
              <p className="text-gray-600 text-sm">Happy Travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter size={20} className="text-[#11A560]" />
              <span className="font-semibold">Filter by destination:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/safaris"
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !destinationFilter
                    ? "bg-[#11A560] text-white shadow-lg shadow-[#11A560]/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Destinations
              </Link>
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/safaris?destination=${dest.slug}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    destinationFilter === dest.slug
                      ? "bg-[#11A560] text-white shadow-lg shadow-[#11A560]/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      {featuredTours.length > 0 && !destinationFilter && (
        <section className="py-16 bg-gradient-to-b from-[#E8F5EE] to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-[#11A560] fill-[#11A560]" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Safaris</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <SafariCard key={`${tour.kind}-${tour.id}`} safari={tour} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tours Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {destinationFilter
                ? `${destinations.find((d) => d.slug === destinationFilter)?.name || ""} Safaris`
                : "All Safari Packages"}
            </h2>
            <span className="text-gray-500">
              Showing {tours.length} {tours.length === 1 ? "package" : "packages"}
            </span>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-4">
                No safaris found for this destination.
              </p>
              <Link
                href="/safaris"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors"
              >
                View All Safaris
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(destinationFilter ? tours : regularTours).map((tour) => (
                <SafariCard key={`${tour.kind}-${tour.id}`} safari={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Find Your Perfect Safari?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We create custom safari itineraries tailored to your preferences,
            budget, and schedule. Let us design your dream African adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-all shadow-lg shadow-[#11A560]/25"
            >
              Request Custom Safari
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all backdrop-blur"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Safari Card Component
interface SafariCardProps {
  safari: UnifiedTour;
  featured?: boolean;
}

function SafariCard({ safari, featured }: SafariCardProps) {
  const href =
    safari.kind === "core"
      ? `/trips/${safari.slug}`
      : `/packages/${safari.packageTypeSlug}/${safari.slug}`;

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
        featured ? "ring-2 ring-[#11A560] ring-offset-2" : ""
      }`}
    >
      {/* Image */}
      <Link href={href} className="block relative">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={safari.image}
            alt={safari.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur text-gray-800 text-sm font-semibold rounded-full shadow-sm">
              {safari.destinationName}
            </span>
            {safari.kind === "package" && (
              <span className="px-3 py-1.5 bg-[#F5A623] text-white text-sm font-semibold rounded-full shadow-sm">
                Package
              </span>
            )}
            {featured && (
              <span className="px-3 py-1.5 bg-[#11A560] text-white text-sm font-semibold rounded-full shadow-sm flex items-center gap-1">
                <Star size={14} className="fill-white" />
                Featured
              </span>
            )}
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-xl shadow-lg">
            <span className="text-xs text-gray-500 block">From</span>
            <span className="text-xl font-bold text-[#11A560]">
              {safari.currency} {safari.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#11A560]" />
            {safari.duration}
          </span>
          {safari.groupSize && (
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-[#11A560]" />
              {safari.groupSize}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#11A560] transition-colors line-clamp-2">
          <Link href={href}>{safari.title}</Link>
        </h2>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {safari.excerpt}
        </p>

        <Link
          href={href}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#E8F5EE] text-[#11A560] font-semibold rounded-xl hover:bg-[#11A560] hover:text-white transition-all duration-300"
        >
          View Details
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
