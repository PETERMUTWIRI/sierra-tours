"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-20 bg-orange-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
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
                  className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
                <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                <p className="text-white/80 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
