import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { getPackageTypeImage } from "@/lib/imageMapping";
import { ArrowRight, Package } from "lucide-react";
import { Heart, Ship, Gift, Star, Palmtree, Trees, Calendar, Mountain, Bike, Footprints, Bird, Waves, Compass } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Themed Holiday Packages | Sierra Tours & Safaris",
  description: "Discover our specially curated themed holiday packages - Honeymoon, Valentine's Day, Luxury Safaris, Christmas packages and more.",
};

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Heart,
  Ship,
  Gift,
  Star,
  Palmtree,
  Trees,
  Calendar,
  Package,
  Mountain,
  Bike,
  Footprints,
  Bird,
  Waves,
  Compass,
};

async function getPackageTypes() {
  return prisma.packageType.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
    include: {
      _count: {
        select: { safaris: true },
      },
    },
  });
}

async function getFeaturedSafaris() {
  return prisma.packageSafari.findMany({
    where: { published: true, featured: true },
    take: 6,
    orderBy: { order: "asc" },
    include: {
      packageType: {
        select: { name: true, slug: true },
      },
    },
  });
}

export default async function PackagesPage() {
  const [packageTypes, featuredSafaris] = await Promise.all([
    getPackageTypes(),
    getFeaturedSafaris(),
  ]);

  const themedTypes = packageTypes.filter((pt) => pt.category === "THEMED");
  const safariTypes = packageTypes.filter((pt) => pt.category === "SAFARI");
  const localTypes = packageTypes.filter((pt) => pt.category === "LOCAL");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg"
            alt="Themed Holiday Packages"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]/70" />
          <div 
            className="absolute top-0 right-0 w-96 h-96 opacity-20"
            style={{
              background: 'radial-gradient(circle at 70% 30%, #F5A623 0%, transparent 50%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#D32F2F]/30">
            Special Collections
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Themed Holiday Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover specially curated safari experiences designed for every occasion
          </p>
        </div>
      </section>

      {/* Themed Holidays Section */}
      {themedTypes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-[#D32F2F] rounded-full"></span>
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Themed Holidays</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {themedTypes.map((type) => {
                const IconComponent = type.icon ? iconMap[type.icon] || Package : Package;
                return (
                  <Link
                    key={type.id}
                    href={`/packages/${type.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={getPackageTypeImage(type)}
                        alt={type.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#D32F2F]" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">{type.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      {type.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{type.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {type._count.safaris} package{type._count.safaris !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-2 text-[#D32F2F] font-medium group-hover:gap-3 transition-all">
                          Explore <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Safari Experiences Section */}
      {safariTypes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-[#F5A623] rounded-full"></span>
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Safari Experiences</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safariTypes.map((type) => {
                const IconComponent = type.icon ? iconMap[type.icon] || Package : Package;
                return (
                  <Link
                    key={type.id}
                    href={`/packages/${type.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getPackageTypeImage(type)}
                        alt={type.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#F5A623]" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D32F2F] transition-colors">
                        {type.name}
                      </h3>
                      {type.description && (
                        <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {type._count.safaris} package{type._count.safaris !== 1 ? "s" : ""}
                        </span>
                        <span className="text-[#F5A623] font-medium group-hover:text-[#D32F2F] transition-colors">
                          View All →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Local Packages Section */}
      {localTypes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-[#11A560] rounded-full"></span>
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Local Packages</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localTypes.map((type) => {
                const IconComponent = type.icon ? iconMap[type.icon] || Package : Package;
                return (
                  <Link
                    key={type.id}
                    href={`/packages/${type.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getPackageTypeImage(type)}
                        alt={type.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#11A560]" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D32F2F] transition-colors">
                        {type.name}
                      </h3>
                      {type.description && (
                        <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {type._count.safaris} package{type._count.safaris !== 1 ? "s" : ""}
                        </span>
                        <span className="text-[#11A560] font-medium group-hover:text-[#D32F2F] transition-colors">
                          View All →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Safaris */}
      {featuredSafaris.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#F5A623]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Popular Safari Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked experiences that our guests love the most
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSafaris.map((safari) => (
                <Link
                  key={safari.id}
                  href={`/packages/${safari.packageType.slug}/${safari.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={safari.image}
                      alt={safari.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-[#F5A623] text-[#1A1A1A] text-xs font-semibold rounded-full">
                        {safari.priceFrom ? "From " : ""}
                        {safari.currency} {safari.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-[#11A560] uppercase tracking-wider">
                      {safari.packageType.name}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mt-1 mb-2 group-hover:text-[#D32F2F] transition-colors">
                      {safari.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{safari.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span>{safari.duration}</span>
                      <span>•</span>
                      <span>{safari.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#11A560]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let us create a custom package tailored to your specific needs and preferences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request Custom Package
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
