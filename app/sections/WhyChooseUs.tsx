"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Users, Compass, Award, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our priority. All our safaris are fully insured with experienced guides.",
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Our guides are certified professionals with deep knowledge of African wildlife and culture.",
  },
  {
    icon: Compass,
    title: "Custom Itineraries",
    description: "Tailor-made safari experiences designed around your preferences and schedule.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as one of East Africa's top safari operators for over 15 years.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance throughout your journey, from booking to return.",
  },
  {
    icon: Headphones,
    title: "Local Expertise",
    description: "Deep local connections ensure authentic experiences and exclusive access.",
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

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          quality={65}
        />
        <div className="absolute inset-0 bg-gray-50/92" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-100/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
                alt="Safari Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white rounded-xl shadow-xl p-6 max-w-xs border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#11A560]/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#D32F2F]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">15+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Creating unforgettable African safari experiences since 2009.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-[#D32F2F] font-semibold mb-2 block uppercase tracking-wide text-sm">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Your Trusted Safari Partner in Africa
              </h2>
              <p className="text-gray-600 text-lg">
                We combine local expertise with world-class service to deliver safari experiences that exceed expectations.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-[#11A560]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#11A560]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
