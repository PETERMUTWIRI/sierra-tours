"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@sierratoursandsafaris.com",
    href: "mailto:info@sierratoursandsafaris.com",
    color: "text-[#F5A623]",
    bg: "bg-[#F5A623]/10",
  },
  {
    icon: Phone,
    label: "Phone 1",
    value: "(254) 725 162 916",
    href: "tel:+254725162916",
    color: "text-[#11A560]",
    bg: "bg-[#11A560]/10",
  },
  {
    icon: Phone,
    label: "Phone 2",
    value: "(254) 748 895 496",
    href: "tel:+254748895496",
    color: "text-[#11A560]",
    bg: "bg-[#11A560]/10",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Maendeleo House, Nairobi Kenya",
    href: "https://maps.google.com/?q=Maendeleo+House+Nairobi+Kenya",
    color: "text-[#D32F2F]",
    bg: "bg-[#D32F2F]/10",
    external: true,
  },
];

export default function ContactContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/banners/banner-image.webp"
            alt="African landscape"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-[#11A560]/90 text-white text-sm font-semibold rounded-full mb-4"
          >
            Let&apos;s Plan Your Adventure
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Have a question or ready to book? Reach out and our friendly team will
            respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-10">
            {contactDetails.map((detail, idx) => (
              <motion.a
                key={detail.label + detail.value}
                href={detail.href}
                target={detail.external ? "_blank" : undefined}
                rel={detail.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div
                  className={`w-14 h-14 ${detail.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <detail.icon className={`w-6 h-6 ${detail.color}`} />
                </div>
                <div className="text-sm text-gray-500 mb-1">{detail.label}</div>
                <div className="text-[#1A1A1A] font-semibold">{detail.value}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#D32F2F] font-semibold mb-2 block uppercase tracking-wide text-sm">
                Send a Message
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Tell Us About Your Dream Safari
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and one of our safari experts will get back to you
                with a personalized itinerary and quote.
              </p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interested Destination
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent bg-white">
                      <option value="">Select a destination</option>
                      <option value="kenya">Kenya</option>
                      <option value="tanzania">Tanzania</option>
                      <option value="botswana">Botswana</option>
                      <option value="zambia">Zambia</option>
                      <option value="uganda">Uganda</option>
                      <option value="rwanda">Rwanda</option>
                      <option value="south-africa">South Africa</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your travel dates, group size, and any special requests..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-all shadow-lg hover:shadow-xl"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              {/* Image Card */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg"
                  alt="Maasai Mara safari"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Visit Our Office</h3>
                  <p className="text-white/90 text-sm">
                    We&apos;d love to meet you in person and plan your adventure over a cup of
                    Kenyan coffee.
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#11A560]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#11A560]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Business Hours</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-[#1A1A1A]">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-[#1A1A1A]">9:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-[#1A1A1A]">Closed</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  All times are in East Africa Time (EAT), UTC+3.
                </p>
              </div>

              {/* Socials */}
              <div className="bg-[#11A560] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Follow Our Journey</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get daily safari inspiration, wildlife updates, and exclusive offers.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map / Location Visual */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32335427127!2d36.68258784394519!3d-1.302861127884202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sierra Tours & Safaris Office Location"
                className="grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#11A560]/20 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D32F2F]/20 rounded-full blur-3xl -ml-20 -mb-20" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#11A560]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-[#11A560]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Prefer to Chat on WhatsApp?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Message us directly for quick questions, instant quotes, or real-time safari
                advice from our Nairobi team.
              </p>
              <a
                href="https://wa.me/254725162916"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
