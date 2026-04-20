import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Clock, Users, MapPin, Check, Crown } from "lucide-react";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Luxury Safari Packages | Sierra Tours & Safaris",
  description: "Experience the ultimate in safari luxury. Five-star lodges, private guides, helicopter transfers, and exclusive game viewing areas.",
};

async function getLuxuryPackages() {
  return prisma.packageSafari.findMany({
    where: {
      packageType: {
        slug: "luxury",
      },
      published: true,
    },
    orderBy: { order: "asc" },
    include: {
      packageType: {
        select: { name: true, slug: true },
      },
    },
  });
}

const luxuryFeatures = [
  {
    title: "Five-Star Accommodations",
    desc: "Stay at the most exclusive lodges and camps in Africa",
  },
  {
    title: "Private Guides",
    desc: "Expert guides dedicated to your party only",
  },
  {
    title: "Helicopter Transfers",
    desc: "Arrive in style with scenic helicopter flights",
  },
  {
    title: "Gourmet Dining",
    desc: "World-class cuisine prepared by private chefs",
  },
  {
    title: "Spa & Wellness",
    desc: "Rejuvenate with luxury spa treatments",
  },
  {
    title: "Exclusive Access",
    desc: "Private conservancies and after-hours game drives",
  },
];

export default async function LuxuryPackagesPage() {
  const packagesData = await getLuxuryPackages();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/laxery.jpg"
            alt="Luxury Safari"
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
          <div className="w-16 h-16 bg-[#F5A623]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#F5A623]/30">
            <Crown className="w-8 h-8 text-[#F5A623]" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-[#F5A623]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#F5A623]/30">
            Premium Experience
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Luxury Safari Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The ultimate safari experience for discerning travelers
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Indulge in the finest safari experiences East Africa has to offer. Our luxury packages combine 
            exclusive accommodations, personalized service, and extraordinary wildlife encounters. From 
            private conservancies to helicopter transfers, every detail is crafted to exceed your expectations.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {packagesData.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {packagesData.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={pkg.image || "/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#F5A623] text-[#1A1A1A] text-sm font-medium rounded-full">
                        {pkg.priceFrom && "From "}{pkg.currency} {pkg.price}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {pkg.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {pkg.groupSize || "Private"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{pkg.excerpt}</p>
                    <div className="space-y-2 mb-6">
                      {pkg.highlights.slice(0, 5).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-[#F5A623]" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/packages/${pkg.packageType.slug}/${pkg.slug}`}
                      className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#E09513] transition-colors"
                    >
                      View Package Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No luxury packages available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Luxury Features */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Luxury Difference</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What sets our luxury safaris apart from the rest
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {luxuryFeatures.map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Star className="w-8 h-8 text-[#F5A623] mb-4" />
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F5A623]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Experience Unparalleled Luxury
          </h2>
          <p className="text-[#1A1A1A]/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft your perfect luxury safari experience.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-semibold rounded-full hover:bg-[#333] transition-all duration-300 shadow-lg"
          >
            Request Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
