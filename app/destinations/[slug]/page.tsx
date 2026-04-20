import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getDestinationHeroImage, getSafariImage } from "@/lib/imageMapping";
import { MapPin, Calendar, Globe, Banknote, ArrowRight, Check, Compass } from "lucide-react";

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = await prisma.destination.findMany();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await prisma.destination.findUnique({
    where: { slug },
  });
  
  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Safaris | Sierra Tours & Safaris`,
    description: destination.description,
  };
}

async function getDestinationWithSafaris(slug: string) {
  return prisma.destination.findUnique({
    where: { slug },
    include: {
      safaris: {
        where: { published: true },
        orderBy: { price: 'asc' },
      },
      packageSafaris: {
        where: { published: true },
        orderBy: { price: 'asc' },
        include: {
          packageType: {
            select: { slug: true, name: true },
          },
        },
      },
      popularParks: true,
      gallery: true,
    },
  });
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationWithSafaris(slug);

  if (!destination) {
    notFound();
  }

  // Combine core safaris and package safaris for unified display
  const coreSafaris = destination.safaris;
  const packageSafaris = destination.packageSafaris;
  const allTours = [
    ...coreSafaris.map((s) => ({ ...s, kind: 'core' as const })),
    ...packageSafaris.map((s) => ({ ...s, kind: 'package' as const })),
  ].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.price - b.price;
  });

  // Get mapped hero image
  const heroImageUrl = getDestinationHeroImage(destination);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={heroImageUrl}
          alt={`${destination.name} Safari`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-3xl">
              <span className="text-[#B3CE4D] font-semibold mb-2 block uppercase tracking-wider">
                Safari Destination
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {destination.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/safaris?destination=${destination.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors shadow-lg shadow-[#11A560]/25"
                >
                  View {allTours.length} Tour{allTours.length !== 1 ? 's' : ''}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  Plan Custom Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Discover {destination.name}
              </h2>
              <div 
                className="text-lg text-gray-600 mb-8 leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: destination.description }}
              />

              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Popular Parks */}
              {destination.popularParks && destination.popularParks.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Popular Parks & Reserves
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {destination.popularParks.map((park) => (
                      <div
                        key={park.id}
                        className="bg-gray-50 rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                            src={park.image || '/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg'}
                            alt={park.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {park.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {park.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Available Safaris & Packages */}
              {allTours.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Available Tours in {destination.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allTours.slice(0, 4).map((tour) => {
                      const isCore = tour.kind === 'core';
                      const safariImage = isCore
                        ? getSafariImage({ ...tour, destination })
                        : tour.image;
                      const tourHref = isCore
                        ? `/trips/${tour.slug}`
                        : `/packages/${tour.packageType.slug}/${tour.slug}`;
                      const badgeLabel = isCore ? 'Classic Safari' : tour.packageType.name;
                      const badgeColor = isCore ? 'bg-[#11A560]' : 'bg-[#F5A623]';

                      return (
                        <Link
                          key={`${tour.kind}-${tour.id}`}
                          href={tourHref}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#11A560] hover:shadow-md transition-all group"
                        >
                          <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                            <Image
                              src={safariImage}
                              alt={tour.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute top-2 left-2">
                              <span className={`px-2 py-1 ${badgeColor} text-white text-xs font-semibold rounded-full shadow-sm`}>
                                {badgeLabel}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 group-hover:text-[#0E8A50] transition-colors">
                              {tour.title}
                            </h4>
                            <span className="text-[#0E8A50] font-bold">
                              {tour.currency} {tour.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {tour.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {tour.duration}
                            </span>
                            {'groupSize' in tour && tour.groupSize && (
                              <span className="flex items-center gap-1">
                                <Compass size={12} />
                                {tour.groupSize}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {allTours.length > 4 && (
                    <div className="mt-6 text-center">
                      <Link
                        href={`/safaris?destination=${destination.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8F5EE] text-[#0E8A50] font-semibold rounded-lg hover:bg-[#11A560] transition-colors"
                      >
                        View All {allTours.length} Tours
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Quick Facts
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Best Time to Visit
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.bestTimeToVisit || 'Year round'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Languages
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.languages?.join(", ") || 'English'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Currency
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.currency || 'USD'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#11A560] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Safari Packages
                      </span>
                      <span className="text-sm text-gray-600">
                        {allTours.length} available tours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <Link
                    href={`/safaris?destination=${destination.slug}`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-xl hover:bg-[#0E8A50] transition-colors shadow-lg shadow-[#11A560]/25"
                  >
                    View All Safaris
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#11A560] hover:text-[#11A560] transition-colors"
                  >
                    Customize Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {destination.gallery && destination.gallery.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {destination.name} Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {destination.gallery.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative aspect-square rounded-xl overflow-hidden group ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${destination.name} safari image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[#11A560]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let our safari experts help you plan the perfect {destination.name} adventure 
            tailored to your preferences, budget, and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/safaris?destination=${destination.slug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#11A560] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Safaris
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
