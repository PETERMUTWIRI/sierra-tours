"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getDestinationCardImage } from "@/lib/imageMapping";

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline?: string;
  image: string;
  safaris?: { id: string }[];
  _count?: { safaris: number };
}

interface DestinationsProps {
  destinations?: Destination[];
}

export default function Destinations({ destinations = [] }: DestinationsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const displayDestinations = destinations.slice(0, 4);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          quality={70}
        />
        {/* Multi-layer overlay for content readability */}
        {/* Base white overlay */}
        <div className="absolute inset-0 bg-white/94" />
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-50/60 via-transparent to-white/50" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the best safari destinations across Africa, each offering unique wildlife experiences.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        {displayDestinations.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displayDestinations.map((destination) => {
              const imageUrl = getDestinationCardImage(destination);
              const safariCount = destination._count?.safaris || destination.safaris?.length || 0;
              
              return (
                <motion.div
                  key={destination.id}
                  variants={itemVariants}
                  className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                >
                  {/* Background Image */}
                  <Image
                    src={imageUrl}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:from-black/90" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="flex items-center gap-2 text-[#B3CE4D] mb-2">
                        <MapPin size={18} />
                        <span className="text-sm font-medium">
                          {safariCount} Safari{safariCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {destination.tagline || destination.description}
                      </p>
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="inline-flex items-center gap-2 text-white font-medium hover:text-[#B3CE4D] transition-colors"
                      >
                        Explore
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No destinations available at the moment.</p>
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
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#11A560] text-white font-medium rounded-lg hover:bg-[#0E8A50] transition-colors"
          >
            View All Destinations
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
