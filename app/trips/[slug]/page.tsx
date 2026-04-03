import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSafariImage, getDestinationHeroImage } from "@/lib/imageMapping";
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
  Compass,
  Star,
  Utensils,
  Shield
} from "lucide-react";

interface TripPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const safaris = await prisma.safari.findMany({
    where: { published: true },
  });
  return safaris.map((safari) => ({
    slug: safari.slug,
  }));
}

export async function generateMetadata({ params }: TripPageProps) {
  const { slug } = await params;
  const safari = await prisma.safari.findUnique({
    where: { slug },
  });
  
  if (!safari) {
    return {
      title: "Safari Not Found",
    };
  }

  return {
    title: `${safari.title} | Sierra Tours & Safaris`,
    description: safari.excerpt,
  };
}

async function getSafariWithDetails(slug: string) {
  return prisma.safari.findUnique({
    where: { slug, published: true },
    include: {
      destination: true,
      itinerary: {
        orderBy: { day: 'asc' },
      },
      gallery: true,
    },
  });
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug } = await params;
  const safari = await getSafariWithDetails(slug);

  if (!safari) {
    notFound();
  }

  // Get mapped image
  const safariImage = getSafariImage(safari);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#11A560] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <Link href="/safaris" className="hover:text-[#11A560] transition-colors">Safaris</Link>
            <ChevronRight size={16} />
            <Link href={`/destinations/${safari.destination.slug}`} className="hover:text-[#11A560] transition-colors">
              {safari.destination.name}
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium truncate">{safari.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        <Image
          src={safariImage}
          alt={safari.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  href={`/destinations/${safari.destination.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur text-white font-medium rounded-full hover:bg-white/30 transition-colors"
                >
                  <MapPin size={16} />
                  {safari.destination.name}
                </Link>
                {safari.featured && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#11A560] text-white font-medium rounded-full">
                    <Star size={16} className="fill-white" />
                    Featured Safari
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {safari.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
                {safari.excerpt}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-[#B3CE4D]" />
                  <span className="font-medium">{safari.duration}</span>
                </div>
                {safari.groupSize && (
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-[#B3CE4D]" />
                    <span>{safari.groupSize}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-[#B3CE4D]" />
                  <span>Expert Guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Floating Card */}
        <div className="absolute bottom-0 right-0 translate-y-1/2 md:translate-y-0 md:bottom-16 md:right-8 lg:right-16">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-xs mx-4 md:mx-0">
            <div className="text-center mb-4">
              <span className="text-gray-500 text-sm">Starting from</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-[#0E8A50]">
                  {safari.currency} {safari.price.toLocaleString()}
                </span>
              </div>
              <span className="text-gray-500 text-sm">per person</span>
            </div>
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-xl hover:bg-[#0E8A50] transition-colors shadow-lg shadow-[#11A560]/25"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>
            <p className="text-center text-xs text-gray-500 mt-3">
              Based on double occupancy
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Safari Overview
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: safari.description }}
                />

                {/* Highlights */}
                {safari.highlights && safari.highlights.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Trip Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {safari.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Activities */}
                {safari.activities && safari.activities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {safari.activities.map((activity) => (
                      <span 
                        key={activity}
                        className="px-3 py-1.5 bg-[#E8F5EE] text-[#0E8A50] text-sm font-medium rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Main safari image first */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden group col-span-2 row-span-2">
                    <Image
                      src={safariImage}
                      alt={safari.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  {/* Additional gallery images */}
                  {safari.gallery && safari.gallery.slice(0, 4).map((image, index) => (
                    <div
                      key={image.id}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${safari.title} gallery ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 33vw, 15vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                  {/* If no gallery, show destination image */}
                  {(!safari.gallery || safari.gallery.length === 0) && (
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image
                        src={getDestinationHeroImage(safari.destination)}
                        alt={safari.destination.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 33vw, 15vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  )}
                </div>
              </div>

              {/* Itinerary */}
              {safari.itinerary && safari.itinerary.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Detailed Itinerary
                  </h2>
                  <div className="space-y-6">
                    {safari.itinerary.map((day) => (
                      <div
                        key={day.id}
                        className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-[#11A560] rounded-2xl flex flex-col items-center justify-center text-white">
                            <span className="text-xs font-medium uppercase">Day</span>
                            <span className="text-xl font-bold">{day.day}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-2">
                              {day.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {day.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              {day.meals && day.meals.length > 0 && (
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Utensils size={14} className="text-[#11A560]" />
                                  <span>{day.meals.join(', ')}</span>
                                </div>
                              )}
                              {day.accommodation && (
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Bed size={14} className="text-[#11A560]" />
                                  <span>{day.accommodation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {safari.includes && safari.includes.length > 0 && (
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {safari.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {safari.excludes && safari.excludes.length > 0 && (
                  <div className="bg-red-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      What&apos;s Excluded
                    </h3>
                    <ul className="space-y-3">
                      {safari.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card Desktop */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <span className="text-gray-500 text-sm">Starting from</span>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="text-4xl font-bold text-[#0E8A50]">
                        {safari.currency} {safari.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">per person</span>
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-xl hover:bg-[#0E8A50] transition-colors shadow-lg shadow-[#11A560]/25"
                    >
                      Book This Safari
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#11A560] hover:text-[#11A560] transition-colors"
                    >
                      Ask a Question
                    </Link>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    No commitment required. Get a detailed itinerary & quote.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Quick Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Duration
                        </span>
                        <span className="text-sm text-gray-600">
                          {safari.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Group Size
                        </span>
                        <span className="text-sm text-gray-600">
                          {safari.groupSize || 'Flexible'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bed className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Accommodation
                        </span>
                        <span className="text-sm text-gray-600">
                          {safari.accommodation}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">
                          Destination
                        </span>
                        <Link 
                          href={`/destinations/${safari.destination.slug}`}
                          className="text-sm text-[#0E8A50] hover:underline"
                        >
                          {safari.destination.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Why Book With Us?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Local expert guides</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Best price guarantee</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">24/7 support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Flexible booking</span>
                    </li>
                  </ul>
                </div>

                {/* Need Help */}
                <div className="bg-[#E8F5EE] rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Need Help Planning?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our safari experts can customize this trip to your preferences.
                  </p>
                  <Link
                    href="/contact"
                    className="text-[#0E8A50] font-semibold hover:text-[#0E8A50] flex items-center gap-1"
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

      {/* Related Safaris */}
      <RelatedSafaris currentSafariId={safari.id} destinationId={safari.destinationId} />
    </main>
  );
}

// Related Safaris Component
async function RelatedSafaris({ currentSafariId, destinationId }: { currentSafariId: string; destinationId: string }) {
  const relatedSafaris = await prisma.safari.findMany({
    where: {
      published: true,
      destinationId,
      id: { not: currentSafariId },
    },
    take: 3,
    include: { destination: true },
  });

  if (relatedSafaris.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          More Safaris in {relatedSafaris[0]?.destination.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedSafaris.map((safari) => {
            const relatedImage = getSafariImage(safari);
            return (
            <Link
              key={safari.id}
              href={`/trips/${safari.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={relatedImage}
                  alt={safari.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white rounded-lg">
                  <span className="font-bold text-[#0E8A50]">
                    {safari.currency} {safari.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#0E8A50] transition-colors line-clamp-2">
                  {safari.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  {safari.duration}
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
