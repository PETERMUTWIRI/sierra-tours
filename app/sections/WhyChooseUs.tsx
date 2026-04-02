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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
                alt="Safari Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Creating unforgettable African safari experiences since 2009.
              </p>
            </div>
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
              <span className="text-orange-500 font-medium mb-2 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
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
