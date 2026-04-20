import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPackageBookingLink } from "@/lib/whatsapp";
import { ArrowLeft, Clock, MapPin, Users, Check, X, Calendar, Utensils, Bed } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ type: string; safari: string }>;
}

async function getSafari(typeSlug: string, safariSlug: string) {
  const packageType = await prisma.packageType.findUnique({
    where: { slug: typeSlug, published: true },
  });

  if (!packageType) return null;

  const safari = await prisma.packageSafari.findFirst({
    where: {
      slug: safariSlug,
      packageTypeId: packageType.id,
      published: true,
    },
    include: {
      packageType: true,
      itinerary: {
        orderBy: { day: "asc" },
      },
    },
  });

  if (!safari) return null;

  return { safari, packageType };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, safari } = await params;
  const data = await getSafari(type, safari);
  
  if (!data) {
    return { title: "Safari Not Found" };
  }

  return {
    title: `${data.safari.title} | ${data.packageType.name} | Sierra Tours`,
    description: data.safari.excerpt,
  };
}

export default async function SafariDetailPage({ params }: PageProps) {
  const { type, safari } = await params;
  const data = await getSafari(type, safari);

  if (!data) {
    notFound();
  }

  const { safari: safariData, packageType } = data;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back Link */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/packages/${packageType.slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#11A560] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to {packageType.name}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={safariData.image}
          alt={safariData.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto px-4">
            <span className="inline-block px-3 py-1 bg-[#D32F2F] text-white text-sm font-medium rounded-full mb-4">
              {packageType.name}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {safariData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {safariData.duration}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {safariData.location}
              </span>
              {safariData.groupSize && (
                <span className="flex items-center gap-2">
                  <Users size={18} />
                  {safariData.groupSize}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {safariData.description}
                </p>
              </div>

              {/* Highlights */}
              {safariData.highlights.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {safariData.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#11A560]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={14} className="text-[#11A560]" />
                        </div>
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {safariData.itinerary.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Itinerary</h2>
                  <div className="space-y-6">
                    {safariData.itinerary.map((day) => (
                      <div key={day.id} className="relative pl-8 pb-6 border-l-2 border-[#11A560]/20 last:border-0 last:pb-0">
                        <div className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 bg-[#11A560] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{day.title}</h3>
                          <p className="text-gray-600 mb-3">{day.description}</p>
                          
                          {day.accommodation && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Bed size={16} className="text-[#11A560]" />
                              <span>{day.accommodation}</span>
                            </div>
                          )}
                          
                          {day.meals.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Utensils size={16} className="text-[#11A560]" />
                              <span>Meals: {day.meals.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Includes/Excludes */}
              <div className="grid md:grid-cols-2 gap-6">
                {safariData.includes.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">What&apos;s Included</h3>
                    <ul className="space-y-3">
                      {safariData.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {safariData.excludes.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">What&apos;s Excluded</h3>
                    <ul className="space-y-3">
                      {safariData.excludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
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
              <div className="sticky top-6 space-y-6">
                {/* Price Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-500 text-sm mb-1">
                      {safariData.priceFrom ? "Starting from" : "Price"}
                    </p>
                    <p className="text-4xl font-bold text-[#11A560]">
                      {safariData.currency} {safariData.price.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">per person</p>
                  </div>
                  
                  <a
                    href={getPackageBookingLink({
                      name: safariData.title,
                      price: safariData.price,
                      currency: safariData.currency,
                      priceFrom: safariData.priceFrom,
                      duration: safariData.duration,
                      location: safariData.location,
                      groupSize: safariData.groupSize,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-4 bg-[#D32F2F] text-white font-semibold rounded-xl hover:bg-[#B71C1C] transition-colors mb-3"
                  >
                    Book Now
                  </a>
                  <a
                    href={getPackageBookingLink({
                      name: safariData.title,
                      price: safariData.price,
                      currency: safariData.currency,
                      priceFrom: safariData.priceFrom,
                      duration: safariData.duration,
                      location: safariData.location,
                      groupSize: safariData.groupSize,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-[#1A1A1A] mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-[#11A560]" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium text-[#1A1A1A]">{safariData.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-[#11A560]" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-[#1A1A1A]">{safariData.location}</p>
                      </div>
                    </div>
                    {safariData.groupSize && (
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-[#11A560]" />
                        <div>
                          <p className="text-sm text-gray-500">Group Size</p>
                          <p className="font-medium text-[#1A1A1A]">{safariData.groupSize}</p>
                        </div>
                      </div>
                    )}
                    {safariData.accommodation && (
                      <div className="flex items-center gap-3">
                        <Bed size={18} className="text-[#11A560]" />
                        <div>
                          <p className="text-sm text-gray-500">Accommodation</p>
                          <p className="font-medium text-[#1A1A1A]">{safariData.accommodation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
