"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { cn } from "@/app/lib/utils";
import Logo from "./Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Safaris", href: "/safaris" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top Bar with Social & Search */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
          </div>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:text-orange-400 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-50"
          >
            <div className="container mx-auto px-4">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for trips, destinations..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant="default" size="md" showTagline={true} />

            {/* Phone Number */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm text-gray-500">Call us, we are open 24/7</span>
              <a
                href="tel:+254123456789"
                className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2"
              >
                <Phone size={18} />
                +254 123 456 789
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-orange-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Home Link */}
            <Link
              href="/"
              className="hidden md:flex items-center justify-center w-12 h-12 bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-6 py-4 text-white hover:bg-orange-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-3 text-white font-medium"
            >
              {isMobileMenuOpen ? (
                <>
                  <X size={20} /> CLOSE
                </>
              ) : (
                <>
                  <Menu size={20} /> MENU
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-orange-600 overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:bg-orange-700 transition-colors border-t border-orange-500"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
