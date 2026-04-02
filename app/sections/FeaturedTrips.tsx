"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import type { Trip } from "@/app/types";

interface FeaturedTripsProps {
  title?: string;
  subtitle?: string;
  trips?: Trip[];
}

// Default trips data
const defaultTrips: Trip[] = [
  {
    id: "1",
    title: "7 Days Serengeti & Ngorongoro Safari",
    slug: "7-days-serengeti-ngorongoro-safari",
    excerpt:
      "Experience the best of Tanzania's northern circuit with game drives in Serengeti and Ngorongoro Crater.",
    image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03-ra1pcbh1j4lg3dxna0os6fw62mygbuxdtr0cssxrj4.jpg",
    destination: "Tanzania",
    duration: "7 Days / 6 Nights",
    price: 2850,
    currency: "USD",
  },
  {
    id: "2",
    title: "Mount Kenya Safari Adventure",
    slug: "mount-kenya-safari-adventure",
    excerpt:
      "Explore the majestic Mount Kenya region with wildlife viewing and breathtaking mountain scenery.",
    image: "/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    destination: "Kenya",
    duration: "5 Days / 4 Nights",
    price: 1950,
    currency: "USD",
  },
  {
    id: "3",
    title: "Botswana Okavango Delta Explorer",
    slug: "botswana-okavango-delta-explorer",
    excerpt:
      "Discover the jewel of the Kalahari with mokoro rides and game viewing in the pristine Okavango Delta.",
    image: "/images/elementor/thumbs/sierra-tours-and-safaris-botswana-safaris-image01-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpeg",
    destination: "Botswana",
    duration: "6 Days / 5 Nights",
    price: 3200,
    currency: "USD",
  },
  {
    id: "4",
    title: "Zambia Secret Safari Experience",
    slug: "zambia-secret-safari-experience",
    excerpt:
      "Explore the untouched wilderness of Zambia with walking safaris and Victoria Falls visits.",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    destination: "Zambia",
    duration: "9 Days / 8 Nights",
    price: 4100,
    currency: "USD",
  },
];

export default function FeaturedTrips({
  title = "Popular Safaris",
  subtitle = "Handpicked safari experiences for unforgettable African adventures.",
  trips = defaultTrips,
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

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </motion.div>

        {/* Trips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trips.map((trip) => (
            <motion.article
              key={trip.id}
              variants={itemVariants}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <Link href={`/trips/${trip.slug}`} className="block relative">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Destination Badge */}
                  <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    <MapPin size={14} className="text-orange-500" />
                    {trip.destination}
                  </span>
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg">
                    <span className="text-sm">{trip.currency}</span>
                    <span className="text-lg"> {trip.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock size={16} className="text-orange-500" />
                  <span>{trip.duration}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  <Link href={`/trips/${trip.slug}`}>{trip.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {trip.excerpt}
                </p>

                {/* CTA Button */}
                <Link
                  href={`/trips/${trip.slug}`}
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 border-2 border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Safaris
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
