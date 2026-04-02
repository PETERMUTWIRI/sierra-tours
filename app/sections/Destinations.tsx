"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: "kenya",
    name: "Kenya",
    description: "Experience the iconic Masai Mara and witness the Great Migration.",
    image: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg",
    tripCount: 15,
    href: "/destinations/kenya",
  },
  {
    id: "tanzania",
    name: "Tanzania",
    description: "Explore Serengeti, Ngorongoro Crater, and Mount Kilimanjaro.",
    image: "/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg",
    tripCount: 12,
    href: "/destinations/tanzania",
  },
  {
    id: "botswana",
    name: "Botswana",
    description: "Discover the pristine Okavango Delta and Chobe National Park.",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg",
    tripCount: 8,
    href: "/destinations/botswana",
  },
  {
    id: "zambia",
    name: "Zambia",
    description: "Walking safaris and the majestic Victoria Falls await.",
    image: "/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg",
    tripCount: 6,
    href: "/destinations/zambia",
  },
  {
    id: "rwanda",
    name: "Rwanda",
    description: "Gorilla trekking in the misty mountains of Volcanoes National Park.",
    image: "/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg",
    tripCount: 5,
    href: "/destinations/rwanda",
  },
  {
    id: "egypt",
    name: "Egypt",
    description: "Ancient wonders and Nile cruises through history.",
    image: "/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg",
    tripCount: 4,
    href: "/destinations/egypt",
  },
];

export default function Destinations() {
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

  return (
    <section className="py-16 md:py-24 bg-white">
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
            Explore Destinations
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the best safari destinations across Africa, each offering unique wildlife experiences.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:from-black/90" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <MapPin size={18} />
                    <span className="text-sm font-medium">
                      {destination.tripCount} Safaris
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {destination.description}
                  </p>
                  <Link
                    href={destination.href}
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-orange-400 transition-colors"
                  >
                    Explore
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
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
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Destinations
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
