"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Destinations", href: "/destinations" },
      { label: "Safaris", href: "/safaris" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Kenya Safaris", href: "/destinations/kenya" },
      { label: "Tanzania Safaris", href: "/destinations/tanzania" },
      { label: "Botswana Safaris", href: "/destinations/botswana" },
      { label: "Zambia Safaris", href: "/destinations/zambia" },
      { label: "Uganda Safaris", href: "/destinations/uganda" },
    ],
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-gray-300">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/footer.jpg')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1A1A1A]/85" />

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <Logo variant="light" size="md" showTagline={true} className="mb-4" />
            <p className="text-base mb-4 text-gray-400 leading-relaxed">
              Discover the magic of Africa with our expertly curated safari
              experiences. From the Serengeti to Victoria Falls, we create
              unforgettable adventures.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#11A560]/20 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-all duration-300 text-[#11A560] hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#11A560]/20 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-all duration-300 text-[#11A560] hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#11A560]/20 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-all duration-300 text-[#11A560] hover:text-white"
                aria-label="Twitter"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#D32F2F]/20 rounded-full flex items-center justify-center hover:bg-[#D32F2F] transition-all duration-300 text-[#D32F2F] hover:text-white"
                aria-label="Youtube"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full"></span>
              Destinations
            </h4>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#11A560] rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D32F2F] mt-0.5 flex-shrink-0" />
                <span className="text-base text-gray-400 leading-relaxed">
                  123 Safari Road, Nairobi
                  <br />
                  Kenya, East Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#11A560] flex-shrink-0" />
                <a
                  href="tel:+254123456789"
                  className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                >
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#F5A623] flex-shrink-0" />
                <a
                  href="mailto:info@sierratours.com"
                  className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                >
                  info@sierratours.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-base text-center md:text-left text-gray-400">
                &copy; {currentYear} Sierra Tours & Safaris. All rights reserved.
              </p>
              <nav className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/privacy"
                  className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/sitemap"
                  className="text-base text-gray-400 hover:text-[#11A560] transition-colors"
                >
                  Sitemap
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
