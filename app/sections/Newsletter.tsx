"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

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

export default function Newsletter() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background - Using brand green */}
      <div className="absolute inset-0 bg-[#11A560]" />
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(245,166,35,0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(245,166,35,0.2) 0%, transparent 40%),
                            radial-gradient(circle at 40% 20%, rgba(179,206,77,0.15) 0%, transparent 35%)`,
        }}
      />
      {/* SVG pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
              <Mail className="w-8 h-8 text-[#F5A623]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Safari Inspiration in Your Inbox
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive safari deals, travel tips, and wildlife photography from Africa&apos;s most stunning destinations.
            </p>

            {/* Form */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-lg text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Subscribe
                <Send size={18} />
              </button>
            </form>

            {/* Trust Text */}
            <p className="text-white/70 text-sm mt-4">
              Join 5,000+ safari enthusiasts. No spam, unsubscribe anytime.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
          >
            {[
              { title: "Exclusive Deals", desc: "Special offers for subscribers only" },
              { title: "Travel Tips", desc: "Expert advice for your safari planning" },
              { title: "Wildlife Updates", desc: "Migration patterns and sighting reports" },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <h4 className="text-[#F5A623] font-semibold mb-1">{benefit.title}</h4>
                <p className="text-white/80 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
