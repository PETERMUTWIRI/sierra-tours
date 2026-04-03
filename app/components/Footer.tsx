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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <Logo variant="light" size="md" showTagline={true} className="mb-4" />
            <p className="text-sm mb-4">
              Discover the magic of Africa with our expertly curated safari
              experiences. From the Serengeti to Victoria Falls, we create
              unforgettable adventures.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#11A560] transition-colors"
                aria-label="Youtube"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#11A560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#11A560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#11A560] mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Safari Road, Nairobi
                  <br />
                  Kenya, East Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#11A560] flex-shrink-0" />
                <a
                  href="tel:+254123456789"
                  className="text-sm hover:text-[#11A560] transition-colors"
                >
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#11A560] flex-shrink-0" />
                <a
                  href="mailto:info@sierratours.com"
                  className="text-sm hover:text-[#11A560] transition-colors"
                >
                  info@sierratours.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              &copy; {currentYear} Sierra Tours & Safaris. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy"
                className="text-sm hover:text-[#11A560] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-[#11A560] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-sm hover:text-[#11A560] transition-colors"
              >
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
