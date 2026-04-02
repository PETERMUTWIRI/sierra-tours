import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Globe, Banknote, ArrowRight, Check } from "lucide-react";
import { getDestination, getAllDestinations } from "@/app/lib/destinations";

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.id,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  
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

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={destination.heroImage}
          alt={`${destination.name} Safari`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-3xl">
              <span className="text-orange-400 font-medium mb-2 block">
                Safari Destination
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {destination.tagline}
              </p>
              <Link
                href={`/safaris?destination=${destination.id}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                View {destination.name} Safaris
                <ArrowRight size={20} />
              </Link>
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
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {destination.description}
              </p>

              {/* Highlights */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Popular Parks */}
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Popular Parks & Reserves
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.popularParks.map((park) => (
                  <div
                    key={park.name}
                    className="bg-gray-50 rounded-xl overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={park.image}
                        alt={park.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Quick Facts
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Best Time to Visit
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.bestTimeToVisit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Languages
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.languages.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Currency
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.currency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        Popular Parks
                      </span>
                      <span className="text-sm text-gray-600">
                        {destination.popularParks.length} major reserves
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href={`/safaris?destination=${destination.id}`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View All Safaris
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {destination.name} Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`${destination.name} safari image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let our safari experts help you plan the perfect {destination.name} adventure tailored to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/safaris?destination=${destination.id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-orange-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Safaris
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
