"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";

interface TripSearchProps {
  className?: string;
}

export default function TripSearch({ className }: TripSearchProps) {
  return (
    <section className={`bg-gray-100 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Find Your Perfect Safari
            </h2>
            <p className="text-gray-600">
              Search from our collection of handpicked African safari experiences
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Destination */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white">
                  <option value="">All Destinations</option>
                  <option value="kenya">Kenya</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="botswana">Botswana</option>
                  <option value="zambia">Zambia</option>
                  <option value="uganda">Uganda</option>
                  <option value="south-africa">South Africa</option>
                </select>
              </div>
            </div>

            {/* Activity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                <option value="">All Activities</option>
                <option value="game-drive">Game Drive</option>
                <option value="walking-safari">Walking Safari</option>
                <option value="balloon-safari">Balloon Safari</option>
                <option value="beach">Beach Holiday</option>
                <option value="gorilla-trekking">Gorilla Trekking</option>
                <option value="cultural">Cultural Tour</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white">
                  <option value="">Any Duration</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8-14">8-14 Days</option>
                  <option value="15+">15+ Days</option>
                </select>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travelers
              </label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">3-5 People</option>
                  <option value="6-10">6-10 People</option>
                  <option value="10+">10+ People</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Find Trips
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
