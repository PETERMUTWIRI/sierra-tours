"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United Kingdom",
    image: "/images/testimonials/testimonials.jpg",
    rating: 5,
    text: "Our Kenya safari was absolutely incredible! The guides were knowledgeable, the lodges were luxurious, and we saw the Big Five on our second day. Sierra Tours made everything seamless.",
    trip: "7-Day Kenya Safari",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/testimonials/testimonials-266x300.jpg",
    rating: 5,
    text: "The Tanzania experience exceeded all expectations. Witnessing the Great Migration in Serengeti was a bucket list moment. Highly recommend Sierra Tours for their professionalism.",
    trip: "9-Day Tanzania Adventure",
  },
  {
    id: 3,
    name: "Emma & David Miller",
    location: "Australia",
    image: "/images/testimonials/testimonials-410x250.jpg",
    rating: 5,
    text: "Our honeymoon in Botswana was magical. The Okavango Delta is paradise on earth. Thank you Sierra Tours for creating unforgettable memories!",
    trip: "Botswana Luxury Safari",
  },
];

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

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
          quality={60}
        />
        <div className="absolute inset-0 bg-gray-900/92" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#11A560] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D32F2F] rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[#F5A623] font-semibold mb-2 block uppercase tracking-wide text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-400 text-lg">
            Real experiences from real adventurers who explored Africa with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#11A560]/50 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-[#F5A623] mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#F5A623] fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Trip Badge */}
              <div className="inline-block px-3 py-1 bg-[#11A560]/20 text-[#B3CE4D] text-sm rounded-full mb-6">
                {testimonial.trip}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#11A560]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "500+", label: "Happy Travelers" },
            { value: "50+", label: "Safari Packages" },
            { value: "15+", label: "Years Experience" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-[#F5A623] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
