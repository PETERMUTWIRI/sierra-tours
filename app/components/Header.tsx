"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Menu, X, Phone, Heart, Palmtree, Gift, Star, Ship,
  Home, Trees, Calendar, Globe, Mountain, Bike, Footprints,
  Bird, Waves, Compass, MapPin, ArrowRight, ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";

// Icon mapping for dynamic package types
const iconMap: Record<string, React.ElementType> = {
  Heart,
  Ship,
  Gift,
  Star,
  Palmtree,
  Trees,
  Calendar,
  Globe,
  Mountain,
  Bike,
  Footprints,
  Bird,
  Waves,
  Compass,
  Home,
};

interface DestinationItem {
  id: string;
  name: string;
  slug: string;
}

interface PackageTypeItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  category: string;
}



// Main Nav Items
const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Destinations",
    href: "/destinations",
    hasMegaMenu: true,
    megaMenuType: "destinations",
  },
  {
    label: "Safaris",
    href: "/safaris",
    hasMegaMenu: true,
    megaMenuType: "safaris",
  },
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
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [themedHolidays, setThemedHolidays] = useState<PackageTypeItem[]>([]);
  const [safariTypes, setSafariTypes] = useState<PackageTypeItem[]>([]);
  const [localTypes, setLocalTypes] = useState<PackageTypeItem[]>([]);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    fetchDestinations();
    fetchPackageTypes();
  }, []);

  // Smart header: hide white top bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 10;

      if (currentScrollY < 50) {
        // Always show when near top
        setIsTopBarVisible(true);
      } else if (currentScrollY > lastScrollY + threshold) {
        // Scrolling down → hide
        setIsTopBarVisible(false);
      } else if (currentScrollY < lastScrollY - threshold) {
        // Scrolling up → show
        setIsTopBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/destinations");
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const fetchPackageTypes = async () => {
    try {
      const [themedRes, safariRes, localRes] = await Promise.all([
        fetch("/api/package-types?category=THEMED"),
        fetch("/api/package-types?category=SAFARI"),
        fetch("/api/package-types?category=LOCAL"),
      ]);
      if (themedRes.ok) {
        const data = await themedRes.json();
        setThemedHolidays(data);
      }
      if (safariRes.ok) {
        const data = await safariRes.json();
        setSafariTypes(data);
      }
      if (localRes.ok) {
        const data = await localRes.json();
        setLocalTypes(data);
      }
    } catch (error) {
      console.error("Error fetching package types:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header - Top bar with logo, socials, phone */}
      <div
        className={`bg-white shadow-md transition-transform duration-300 ease-out will-change-transform ${
          isTopBarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
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
                href="tel:+254725162916"
                className="hidden md:flex items-center gap-2 text-[#D32F2F] hover:text-[#11A560] transition-colors"
              >
                <Phone size={18} />
                <span className="font-semibold">+254 725 162 916</span>
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
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                    {/* Underline animation */}
                    <span className="absolute bottom-3 left-4 right-4 h-0.5 bg-[#F5A623] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>

                  {/* Destinations Mega Menu */}
                  {item.megaMenuType === "destinations" && activeMegaMenu === "destinations" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623] z-50"
                      style={{
                        backgroundImage: "url('/images/hero/sierra-tours-and-travel-luxury-safaris.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/80" />
                      <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Globe className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Explore Destinations</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {destinations.map((dest) => (
                            <Link
                              key={dest.id}
                              href={`/destinations/${dest.slug}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-[#1A1A1A] font-medium hover:text-[#D32F2F]"
                            >
                              <span className="w-1.5 h-1.5 bg-[#11A560] rounded-full" />
                              {dest.name}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Destinations
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Safaris Mega Menu */}
                  {item.megaMenuType === "safaris" && activeMegaMenu === "safaris" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623] z-50"
                      style={{
                        backgroundImage: "url('/images/general/sierra-tours-and-safaris-south-africa-safaris-image01.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/80" />
                      <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Compass className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Safari Experiences</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {safariTypes.length > 0 ? (
                            safariTypes.map((safariType) => {
                              const IconComponent = safariType.icon ? iconMap[safariType.icon] || Compass : Compass;
                              return (
                                <Link
                                  key={safariType.id}
                                  href={`/packages/${safariType.slug}`}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-[#11A560]/10 flex items-center justify-center group-hover:bg-[#11A560] transition-colors flex-shrink-0">
                                    <IconComponent className="w-5 h-5 text-[#11A560] group-hover:text-white transition-colors" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors truncate">
                                      {safariType.name}
                                    </h4>
                                    {safariType.description ? (
                                      <p className="text-xs text-gray-500 line-clamp-1">{safariType.description}</p>
                                    ) : (
                                      <p className="text-xs text-gray-500">View packages</p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })
                          ) : (
                            <div className="col-span-2 text-center py-6 text-gray-500 text-sm">
                              No safari categories available yet.
                            </div>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/safaris"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Safaris
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Themed Holidays Mega Menu */}
                  {item.megaMenuType === "themed" && activeMegaMenu === "themed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623] z-50"
                      style={{
                        backgroundImage: "url('/images/hero/sierra-tours-and-travel-valentine-safaris.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/80" />
                      <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Gift className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Themed Holidays</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {themedHolidays.length > 0 ? (
                            themedHolidays.map((holiday) => {
                              const IconComponent = holiday.icon ? iconMap[holiday.icon] || Star : Star;
                              return (
                                <Link
                                  key={holiday.id}
                                  href={`/packages/${holiday.slug}`}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-[#11A560]/10 flex items-center justify-center group-hover:bg-[#11A560] transition-colors flex-shrink-0">
                                    <IconComponent className="w-5 h-5 text-[#11A560] group-hover:text-white transition-colors" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors truncate">
                                      {holiday.name}
                                    </h4>
                                    {holiday.description ? (
                                      <p className="text-xs text-gray-500 line-clamp-1">{holiday.description}</p>
                                    ) : (
                                      <p className="text-xs text-gray-500">View packages</p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })
                          ) : (
                            <div className="col-span-2 text-center py-6 text-gray-500 text-sm">
                              No themed holiday categories available yet.
                            </div>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Themed Packages
                            <ArrowRight className="w-4 h-4" />
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
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] shadow-2xl rounded-b-xl overflow-hidden border-t-4 border-[#F5A623] z-50"
                      style={{
                        backgroundImage: "url('/images/general/Aerial-View-of-a-Tropical-Beach.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/80" />
                      <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                          <Home className="w-5 h-5 text-[#D32F2F]" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Local Packages</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {localTypes.length > 0 ? (
                            localTypes.map((localType) => {
                              const IconComponent = localType.icon ? iconMap[localType.icon] || Home : Home;
                              return (
                                <Link
                                  key={localType.id}
                                  href={`/packages/${localType.slug}`}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-[#11A560]/10 flex items-center justify-center group-hover:bg-[#11A560] transition-colors flex-shrink-0">
                                    <IconComponent className="w-5 h-5 text-[#11A560] group-hover:text-white transition-colors" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-[#1A1A1A] group-hover:text-[#D32F2F] transition-colors truncate">
                                      {localType.name}
                                    </h4>
                                    {localType.description ? (
                                      <p className="text-xs text-gray-500 line-clamp-1">{localType.description}</p>
                                    ) : (
                                      <p className="text-xs text-gray-500">View packages</p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })
                          ) : (
                            <div className="col-span-2 text-center py-6 text-gray-500 text-sm">
                              No local package categories available yet.
                            </div>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#D32F2F] transition-colors"
                          >
                            View All Local Packages
                            <ArrowRight className="w-4 h-4" />
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

                  {/* Mobile Submenu for Destinations */}
                  {item.megaMenuType === "destinations" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      {destinations.map((dest) => (
                        <Link
                          key={dest.id}
                          href={`/destinations/${dest.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                        >
                          {dest.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile Submenu for Safaris */}
                  {item.megaMenuType === "safaris" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      {safariTypes.length > 0 ? (
                        safariTypes.map((type) => (
                          <Link
                            key={type.id}
                            href={`/packages/${type.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                          >
                            {type.name}
                          </Link>
                        ))
                      ) : (
                        <p className="py-2 pl-4 text-white/60 text-sm">No safari categories yet</p>
                      )}
                    </div>
                  )}

                  {/* Mobile Submenu for Themed Holidays */}
                  {item.megaMenuType === "themed" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      {themedHolidays.length > 0 ? (
                        themedHolidays.map((holiday) => (
                          <Link
                            key={holiday.id}
                            href={`/packages/${holiday.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                          >
                            {holiday.name}
                          </Link>
                        ))
                      ) : (
                        <p className="py-2 pl-4 text-white/60 text-sm">No themed holidays yet</p>
                      )}
                    </div>
                  )}

                  {/* Mobile Submenu for Local Packages */}
                  {item.megaMenuType === "local" && (
                    <div className="bg-[#0A6B3D] px-4 py-2">
                      {localTypes.length > 0 ? (
                        localTypes.map((type) => (
                          <Link
                            key={type.id}
                            href={`/packages/${type.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 pl-4 text-white/90 hover:text-[#F5A623] transition-colors text-sm"
                          >
                            {type.name}
                          </Link>
                        ))
                      ) : (
                        <p className="py-2 pl-4 text-white/60 text-sm">No local packages yet</p>
                      )}
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
