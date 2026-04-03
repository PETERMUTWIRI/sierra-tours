"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Phone, Heart, Palmtree, Gift, Star, Ship, Home, Trees, Calendar } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";

// Brand colors
const COLORS = {
  green: "#11A560",
  darkGreen: "#0E8A50",
  lime: "#B3CE4D",
  sun: "#F5A623",
  black: "#1A1A1A",
  red: "#D32F2F",
};

// Themed Holidays Data
const themedHolidays = [
  {
    title: "Honeymoon Packages",
    href: "/packages/honeymoon",
    icon: Heart,
    description: "Romantic getaways for newlyweds",
    image: "/images/destinations/diani-beach.jpg",
  },
  {
    title: "Valentine's Day",
    href: "/packages/valentine",
    icon: Heart,
    description: "Special love-themed safaris",
    image: "/images/destinations/maasai-mara-sunset.jpg",
  },
  {
    title: "Best of Cruise",
    href: "/packages/cruise",
    icon: Ship,
    description: "Luxury cruise adventures",
    image: "/images/destinations/lake-naivasha.jpg",
  },
  {
    title: "Christmas Packages",
    href: "/packages/christmas",
    icon: Gift,
    description: "Festive season safaris",
    image: "/images/destinations/amboseli-elephants.jpg",
  },
  {
    title: "Luxury Safaris",
    href: "/packages/luxury",
    icon: Star,
    description: "Premium safari experiences",
    image: "/images/destinations/serengeti-migration.jpg",
  },
];

// Local Packages Data
const localPackages = {
  beach: {
    title: "Beach Packages",
    icon: Palmtree,
    items: [
      { name: "Mombasa North Coast", href: "/packages/beach/mombasa-north-coast" },
      { name: "Diani/Ukunda", href: "/packages/beach/diani" },
      { name: "Malindi/Watamu", href: "/packages/beach/malindi-watamu" },
      { name: "Lamu", href: "/packages/beach/lamu" },
    ],
  },
  bush: {
    title: "Bush Packages",
    icon: Trees,
    items: [
      { name: "Samburu", href: "/packages/bush/samburu" },
      { name: "Maasai Mara", href: "/packages/bush/maasai-mara" },
      { name: "Amboseli", href: "/packages/bush/amboseli" },
      { name: "Tsavo", href: "/packages/bush/tsavo" },
    ],
  },
  weekend: {
    title: "Weekend Getaways",
    icon: Calendar,
    items: [
      { name: "Naivasha", href: "/packages/weekend/naivasha" },
      { name: "Nakuru", href: "/packages/weekend/nakuru" },
      { name: "Mt. Kenya", href: "/packages/weekend/mt-kenya" },
    ],
  },
};

// Main Nav Items
const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Safaris", href: "/safaris" },
  { 
    label: "Themed Holidays", 
    href: "/packages",
    hasMegaMenu: true,
    megaMenuType: "themed",
  },
  { 
    label: "Local Packages", 
    href: "/packages/local",
    hasMegaMenu: true,
    megaMenuType: "local",
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  return (
    <header className="relative z-50">
      {/* Main Header - Top bar with logo, socials, phone */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant="default" size="md" showTagline={true} />

            {/* Right Side - Socials, Phone, Search */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Social Icons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#11A560] hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#11A560] hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#11A560] hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={14} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#D32F2F] hover:text-white transition-all duration-300"
                  aria-label="Youtube"
                >
                  <FaYoutube size={14} />
                </a>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-8 bg-gray-200" />

              {/* Phone Number */}
              <a
                href="tel:+254123456789"
                className="hidden md:flex items-center gap-2 text-[#D32F2F] hover:text-[#11A560] transition-colors"
              >
                <Phone size={18} />
                <span className="font-semibold">+254 123 456 789</span>
              </a>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#11A560] hover:text-white transition-all duration-300"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-[#11A560] flex items-center justify-center text-white"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-50 border-t border-gray-100"
          >
            <div className="container mx-auto px-4">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for trips, destinations..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D32F2F] text-white font-medium rounded-lg hover:bg-[#B71C1C] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar - Green background */}
      <nav className="bg-[#11A560]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {mainNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && setActiveMegaMenu(item.megaMenuType || null)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-4 text-white font-medium hover:text-[#F5A623] transition-colors group flex items-center gap-1"
                  >
                    {item.label}
                    {item.hasMegaMenu && (
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {/* Underline animation */}
                    <span className="absolute bottom-3 left-4 right-4 h-0.5 bg-[#F5A623] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>

                  {/* Themed Holidays Mega Menu */}
                  {item.megaMenuType === "themed" && activeMegaMenu === "themed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-[600px] bg-white shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623]"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Gift className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Themed Holidays</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {themedHolidays.map((holiday) => (
                            <Link
                              key={holiday.title}
                              href={holiday.href}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-[#11A560]/10 flex items-center justify-center group-hover:bg-[#11A560] transition-colors">
                                <holiday.icon className="w-6 h-6 text-[#11A560] group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors">
                                  {holiday.title}
                                </h4>
                                <p className="text-sm text-gray-500">{holiday.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Themed Packages
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Local Packages Mega Menu */}
                  {item.megaMenuType === "local" && activeMegaMenu === "local" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-[700px] bg-white shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623]"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Home className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Local Packages</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          {/* Beach Packages */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Palmtree className="w-5 h-5 text-[#11A560]" />
                              <h4 className="font-semibold text-[#1A1A1A]">Beach Packages</h4>
                            </div>
                            <ul className="space-y-2">
                              {localPackages.beach.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-[#D32F2F] transition-colors flex items-center gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[#11A560] rounded-full"></span>
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bush Packages */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Trees className="w-5 h-5 text-[#11A560]" />
                              <h4 className="font-semibold text-[#1A1A1A]">Bush Packages</h4>
                            </div>
                            <ul className="space-y-2">
                              {localPackages.bush.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-[#D32F2F] transition-colors flex items-center gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[#11A560] rounded-full"></span>
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Weekend Getaways */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="w-5 h-5 text-[#11A560]" />
                              <h4 className="font-semibold text-[#1A1A1A]">Weekend Getaways</h4>
                            </div>
                            <ul className="space-y-2">
                              {localPackages.weekend.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-[#D32F2F] transition-colors flex items-center gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[#11A560] rounded-full"></span>
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/packages/local"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Local Packages
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>

            {/* Mobile: Social Icons Row */}
            <div className="md:hidden flex items-center gap-2 py-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0E8A50] overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              {/* Main Nav Items */}
              {mainNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => !item.hasMegaMenu && setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:bg-[#11A560] transition-colors border-t border-[#11A560]/50 font-medium"
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile Submenu for Themed Holidays */}
                  {item.megaMenuType === "themed" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      {themedHolidays.map((holiday) => (
                        <Link
                          key={holiday.title}
                          href={holiday.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                        >
                          {holiday.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Mobile Submenu for Local Packages */}
                  {item.megaMenuType === "local" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider py-2">Beach Packages</p>
                      {localPackages.beach.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider py-2 mt-2">Bush Packages</p>
                      {localPackages.bush.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-wider py-2 mt-2">Weekend Getaways</p>
                      {localPackages.weekend.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="p-4 border-t border-[#11A560]/50">
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
