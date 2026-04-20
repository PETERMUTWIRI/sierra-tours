import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Clock, Users, MapPin, Check, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Valentine's Day Packages | Sierra Tours & Safaris",
  description: "Celebrate love in the heart of Africa. Special Valentine's packages with sunset champagne, candlelit dinners, and couples spa treatments.",
};

async function getValentinePackages() {
  return prisma.packageSafari.findMany({
    where: {
      packageType: {
        slug: "valentine",
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

export default async function ValentinePackagesPage() {
  const packagesData = await getValentinePackages();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/valentines.jpg"
            alt="Valentine Safari"
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
              background: 'radial-gradient(circle at 70% 30%, #D32F2F 0%, transparent 50%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-[#D32F2F]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D32F2F]/30">
            <Heart className="w-8 h-8 text-[#D32F2F]" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#D32F2F]/30">
            February Special
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Valentine's Day Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Celebrate love in the heart of Africa with our specially curated Valentine's experiences
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D32F2F]" />
            <span className="text-[#D32F2F] font-medium">Limited Time Offer</span>
            <Sparkles className="w-5 h-5 text-[#D32F2F]" />
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            This Valentine's Day, surprise your special someone with an unforgettable African adventure. 
            Our Valentine's packages include romantic touches like private dinners, couples spa treatments, 
            champagne sunsets, and luxurious accommodations. Make this Valentine's truly memorable.
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
                      <span className="px-3 py-1 bg-[#D32F2F] text-white text-sm font-medium rounded-full">
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
                        {pkg.groupSize || "Couple"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{pkg.excerpt}</p>
                    <div className="space-y-2 mb-6">
                      {pkg.highlights.slice(0, 5).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-[#D32F2F]" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/packages/${pkg.packageType.slug}/${pkg.slug}`}
                      className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                    >
                      Book This Package
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No Valentine's packages available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Romantic Extras */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Romantic Extras Included</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every Valentine's package comes with these special touches to make your celebration unforgettable.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Welcome Champagne", desc: "Chilled bottle waiting in your room" },
              { title: "Rose Petals", desc: "Romantic turndown service" },
              { title: "Couples Massage", desc: "Relaxing spa treatment for two" },
              { title: "Private Dining", desc: "Candlelit dinner under the stars" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-[#D32F2F]/5 rounded-xl border border-[#D32F2F]/10">
                <Heart className="w-8 h-8 text-[#D32F2F] mx-auto mb-3" />
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Early for Best Availability
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Valentine's packages fill up quickly. Secure your romantic getaway today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#D32F2F] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Reserve Your Spot
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
