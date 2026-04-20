import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCategoryBookingLink } from "@/lib/whatsapp";
import { getPackageTypeHeroImage } from "@/lib/imageMapping";
import {
  ArrowRight,
  Clock,
  MapPin,
  Check,
  ArrowLeft,
  Shield,
  Star,
  Users,
  Phone,
} from "lucide-react";
import {
  Heart,
  Ship,
  Gift,
  Palmtree,
  Trees,
  Calendar,
  Package,
  Globe,
  Mountain,
  Bike,
  Footprints,
  Bird,
  Waves,
  Compass,
  Crown,
  Sparkles,
  TreePine,
  Sun,
  Umbrella,
} from "lucide-react";

// Expanded icon mapping for dynamic package types
const iconMap: Record<string, React.ElementType> = {
  Heart,
  Ship,
  Gift,
  Star,
  Palmtree,
  Trees,
  Calendar,
  Package,
  Globe,
  Mountain,
  Bike,
  Footprints,
  Bird,
  Waves,
  Compass,
  Crown,
  Sparkles,
  TreePine,
  Sun,
  Umbrella,
};

// Generic selling points for any package type
const defaultSellingPoints = [
  {
    title: "Expert Planning",
    desc: "Our safari specialists craft every detail of your journey",
    icon: Compass,
  },
  {
    title: "Best Value",
    desc: "Competitive pricing with no hidden costs",
    icon: Star,
  },
  {
    title: "Trusted Guides",
    desc: "Experienced local guides who know the terrain",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    desc: "Dedicated support throughout your adventure",
    icon: Phone,
  },
];

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
    description:
      packageType.description ||
      `Explore our ${packageType.name} safari packages`,
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

  const IconComponent = packageType.icon
    ? iconMap[packageType.icon] || Package
    : Package;
  const safaris = packageType.safaris;

  // Determine grid columns based on package count
  const gridCols =
    safaris.length === 1
      ? "md:grid-cols-1 max-w-2xl mx-auto"
      : safaris.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getPackageTypeHeroImage(packageType)}
            alt={packageType.name}
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
              background:
                "radial-gradient(circle at 70% 30%, #F5A623 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <IconComponent className="w-8 h-8 text-[#F5A623]" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#D32F2F]/30">
            {packageType.category === "THEMED"
              ? "Themed Holiday"
              : packageType.category === "LOCAL"
              ? "Local Package"
              : "Safari Experience"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {packageType.name}
          </h1>
          {packageType.description && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {packageType.description}
            </p>
          )}
        </div>
      </section>

      {/* Introduction */}
      {packageType.description && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              {packageType.description}
            </p>
          </div>
        </section>
      )}

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {safaris.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No packages available yet
              </h3>
              <p className="text-gray-500 mb-6">
                Check back soon for new safari packages
              </p>
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

              <div className={`grid gap-8 ${gridCols}`}>
                {safaris.map((safari) => (
                  <div
                    key={safari.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-64 overflow-hidden">
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
                        <span className="px-3 py-1 bg-[#D32F2F] text-white text-sm font-medium rounded-full">
                          {safari.priceFrom ? "From " : ""}
                          {safari.currency} {safari.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">
                          {safari.title}
                        </h3>
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
                        {safari.groupSize && (
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {safari.groupSize}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {safari.excerpt}
                      </p>

                      {safari.highlights.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {safari.highlights.slice(0, 4).map((highlight, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <Check
                                size={14}
                                className="text-[#11A560] flex-shrink-0"
                              />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                          {safari.highlights.length > 4 && (
                            <p className="text-sm text-gray-400 pl-5">
                              +{safari.highlights.length - 4} more
                            </p>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/packages/${packageType.slug}/${safari.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                      >
                        View Package Details
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              Why Choose Our {packageType.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to make your African adventure
              unforgettable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultSellingPoints.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-[#11A560]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#11A560]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#11A560]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your {packageType.name}?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact us to customize your perfect package or enquire about
            availability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={getCategoryBookingLink(packageType.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg"
            >
              Book on WhatsApp
              <ArrowRight size={20} />
            </a>
            <a
              href="tel:+254725162916"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#11A560] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
