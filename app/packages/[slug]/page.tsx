import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPackageTypeImage } from "@/lib/imageMapping";
import { ArrowRight, Clock, MapPin, Check, ArrowLeft } from "lucide-react";
import { Heart, Ship, Gift, Star, Palmtree, Trees, Calendar, Package } from "lucide-react";

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
};

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPackageType(slug: string) {
  return prisma.packageType.findUnique({
    where: { slug, published: true },
    include: {
      safaris: {
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
      },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const packageType = await getPackageType(slug);
  
  if (!packageType) {
    return { title: "Package Not Found" };
  }

  return {
    title: `${packageType.name} | Sierra Tours & Safaris`,
    description: packageType.description || `Explore our ${packageType.name} safari packages`,
  };
}

export async function generateStaticParams() {
  const packageTypes = await prisma.packageType.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return packageTypes.map((pt) => ({
    slug: pt.slug,
  }));
}

export default async function PackageTypePage({ params }: PageProps) {
  const { slug } = await params;
  const packageType = await getPackageType(slug);

  if (!packageType) {
    notFound();
  }

  const IconComponent = packageType.icon ? iconMap[packageType.icon] || Package : Package;
  const safaris = packageType.safaris;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getPackageTypeImage(packageType)}
            alt={packageType.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Packages
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <IconComponent className="w-7 h-7 text-[#F5A623]" />
            </div>
            <span className="px-3 py-1 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full border border-[#D32F2F]/30">
              {packageType.category === "THEMED"
                ? "Themed Holiday"
                : packageType.category === "LOCAL"
                ? "Local Package"
                : "Safari Experience"}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {packageType.name}
          </h1>
          
          {packageType.description && (
            <p className="text-xl text-gray-300 max-w-2xl">
              {packageType.description}
            </p>
          )}
        </div>
      </section>

      {/* Safaris Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {safaris.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages available yet</h3>
              <p className="text-gray-500 mb-6">Check back soon for new safari packages</p>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:underline"
              >
                View all packages <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  Available Packages ({safaris.length})
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safaris.map((safari) => (
                  <div
                    key={safari.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={safari.image}
                        alt={safari.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {safari.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#F5A623] text-[#1A1A1A] text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#1A1A1A] text-sm font-semibold rounded-full">
                          {safari.priceFrom ? "From " : ""}
                          {safari.currency} {safari.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{safari.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {safari.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {safari.location}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{safari.excerpt}</p>
                      
                      {safari.highlights.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {safari.highlights.slice(0, 3).map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check size={14} className="text-[#11A560] flex-shrink-0" />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                          {safari.highlights.length > 3 && (
                            <p className="text-sm text-gray-400 pl-5">
                              +{safari.highlights.length - 3} more
                            </p>
                          )}
                        </div>
                      )}
                      
                      <Link
                        href={`/packages/${packageType.slug}/${safari.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                      >
                        View Details
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#11A560]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want Something Custom?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We can create a personalized safari package just for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg"
          >
            Get in Touch
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
