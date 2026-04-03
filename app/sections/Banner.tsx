"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showSearch?: boolean;
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

export default function Banner({
  title = "Find Your Best Holiday",
  subtitle = "Find great adventure holidays and activities around the planet.",
  backgroundImage = "/images/hero/sierra-tours-and-travel-luxury-safaris.jpg",
  showSearch = true,
}: BannerProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Safari background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Multi-layer Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          {/* Search Form */}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-2xl"
            >
              <form className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Destination
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent bg-white"
                  >
                    <option value="">Select Destination</option>
                    <option value="kenya">Kenya</option>
                    <option value="tanzania">Tanzania</option>
                    <option value="botswana">Botswana</option>
                    <option value="zambia">Zambia</option>
                    <option value="uganda">Uganda</option>
                    <option value="south-africa">South Africa</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Trip Type
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent bg-white"
                  >
                    <option value="">Select Trip Type</option>
                    <option value="luxury">Luxury Safari</option>
                    <option value="budget">Budget Safari</option>
                    <option value="family">Family Safari</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="adventure">Adventure</option>
                    <option value="group">Group Tour</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Duration
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent bg-white"
                  >
                    <option value="">Select Duration</option>
                    <option value="1-3">1-3 Days</option>
                    <option value="4-7">4-7 Days</option>
                    <option value="8-14">8-14 Days</option>
                    <option value="15+">15+ Days</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-3 bg-[#F5A623] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
