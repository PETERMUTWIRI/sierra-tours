import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getDestinationCardImage, getDestinationHeroImage } from "@/lib/imageMapping";
import { MapPin, ArrowRight, Compass, Globe, Shield } from "lucide-react";

export const metadata = {
  title: "Safari Destinations | Sierra Tours & Safaris",
  description:
    "Explore Africa's best safari destinations including Kenya, Tanzania, Botswana, Zambia, Rwanda, and Egypt.",
};

async function getDestinations() {
  return prisma.destination.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { safaris: true }
      }
    }
  });
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={getDestinationHeroImage({ slug: 'default', name: 'Destinations' })}
          alt="Safari Destinations"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Safari Destinations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover Africa&apos;s most incredible wildlife destinations, 
              each offering unique and unforgettable safari experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Africa */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#11A560] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-[#0E8A50]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">12 Countries</h3>
              <p className="text-gray-600 text-sm">Across East, Southern & North Africa</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#11A560] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-[#0E8A50]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Guides</h3>
              <p className="text-gray-600 text-sm">Local knowledge & professional service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#11A560] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#0E8A50]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted Partner</h3>
              <p className="text-gray-600 text-sm">15+ years of safari excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From the Serengeti&apos;s Great Migration to the pristine Okavango Delta, 
              discover the best safari destinations in Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => {
              const imageUrl = getDestinationCardImage(destination);
              return (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <Image
                  src={imageUrl}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Safari Count Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#11A560] text-white text-sm font-semibold rounded-full">
                      <MapPin size={14} />
                      {destination._count.safaris} Safari{destination._count.safaris !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {destination.name}
                  </h2>

                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {destination.tagline || destination.description}
                  </p>

                  <div className="flex items-center gap-2 text-white font-medium group-hover:text-[#B3CE4D] transition-colors">
                    <span>Explore {destination.name}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#11A560]/50 rounded-2xl transition-colors duration-300" />
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Choosing Your Safari Destination
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">KE</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kenya</h3>
                    <p className="text-gray-600 text-sm">The birthplace of safari, home to the Masai Mara and incredible wildlife density.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">TZ</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Tanzania</h3>
                    <p className="text-gray-600 text-sm">The Serengeti, Ngorongoro Crater, and Mount Kilimanjaro await.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">BW</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Botswana</h3>
                    <p className="text-gray-600 text-sm">Exclusive wilderness experiences in the Okavango Delta.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">ZM</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Zambia</h3>
                    <p className="text-gray-600 text-sm">The birthplace of the walking safari and Victoria Falls.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">RW</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Rwanda</h3>
                    <p className="text-gray-600 text-sm">Mountain gorilla trekking in the land of a thousand hills.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11A560] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0E8A50] font-bold">EG</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Egypt</h3>
                    <p className="text-gray-600 text-sm">Ancient wonders combined with Red Sea beaches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Our safari experts know every destination intimately. Let us help you 
            find the perfect African adventure for your interests and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-all shadow-lg shadow-[#11A560]/25"
            >
              Get Expert Advice
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/safaris"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all backdrop-blur"
            >
              Browse All Safaris
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
