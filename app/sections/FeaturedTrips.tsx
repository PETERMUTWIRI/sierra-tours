"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { getSafariImage } from "@/lib/imageMapping";

interface Safari {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  price: number;
  currency: string;
  duration: string;
  featured: boolean;
  destination: {
    name: string;
    slug: string;
  };
}

interface FeaturedTripsProps {
  title?: string;
  subtitle?: string;
  safaris?: Safari[];
}

// Brand colors
const COLORS = {
  green: "#11A560",
  darkGreen: "#0E8A50",
  lime: "#B3CE4D",
  sun: "#F5A623",
  black: "#1A1A1A",
  red: "#D32F2F",
  redDark: "#B71C1C",
};

export default function FeaturedTrips({
  title = "Popular Safaris",
  subtitle = "Handpicked safari experiences for unforgettable African adventures.",
  safaris = [],
}: FeaturedTripsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const displaySafaris = safaris.slice(0, 4);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/safaris/kenya/sierra-tours-and-safaris-kenya-safaris-image01.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          quality={70}
        />
        <div className="absolute inset-0 bg-gray-50/93" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/60 via-transparent to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </motion.div>

        {/* Safaris Grid */}
        {displaySafaris.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displaySafaris.map((safari) => {
              const imageUrl = getSafariImage(safari);
              
              return (
                <motion.article
                  key={safari.id}
                  variants={itemVariants}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <Link href={`/trips/${safari.slug}`} className="block relative">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={safari.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Destination Badge */}
                      <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-sm font-medium rounded-full shadow-sm">
                        <MapPin size={14} className="text-[#D32F2F]" />
                        {safari.destination.name}
                      </span>
                      {/* Featured Badge */}
                      {safari.featured && (
                        <span className="absolute top-4 right-4 px-3 py-1.5 bg-[#F5A623] text-white text-xs font-bold rounded-full shadow-sm">
                          FEATURED
                        </span>
                      )}
                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#11A560] text-white font-bold rounded-lg shadow-lg">
                        <span className="text-sm">{safari.currency}</span>
                        <span className="text-lg"> {safari.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock size={16} className="text-[#11A560]" />
                      <span>{safari.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                      <Link href={`/trips/${safari.slug}`}>{safari.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {safari.excerpt}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={`/trips/${safari.slug}`}
                      className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 border-2 border-[#11A560] text-[#11A560] font-semibold rounded-lg hover:bg-[#11A560] hover:text-white transition-all duration-300"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No safaris available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/safaris"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Safaris
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
