import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Clock, Users, MapPin, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Honeymoon Packages | Sierra Tours & Safaris",
  description: "Begin your forever with unforgettable romantic adventures. Luxury honeymoon safari packages in Kenya and East Africa.",
};

const honeymoonPackages = [
  {
    id: 1,
    title: "Romantic Mara Retreat",
    duration: "4 Days / 3 Nights",
    price: "From $2,850 per person",
    image: "/images/destinations/maasai-mara.jpg",
    description: "Experience the magic of the Maasai Mara with your loved one. Private game drives, luxury tented camp, and intimate bush dinners.",
    highlights: [
      "Private game drives",
      "Luxury tented accommodation",
      "Sunset champagne experience",
      "Private bush dinner",
      "Couples spa treatment",
    ],
    location: "Maasai Mara",
  },
  {
    id: 2,
    title: "Coastal Love Escape",
    duration: "5 Days / 4 Nights",
    price: "From $1,950 per person",
    image: "/images/destinations/diani-beach.jpg",
    description: "Relax on the pristine beaches of Diani. Beachfront villa, romantic dhow cruise, and candlelit dinners by the ocean.",
    highlights: [
      "Beachfront villa",
      "Romantic dhow cruise",
      "Candlelit beach dinners",
      "Couples massage",
      "Snorkeling excursion",
    ],
    location: "Diani Beach",
  },
  {
    id: 3,
    title: "Luxury Bush & Beach",
    duration: "7 Days / 6 Nights",
    price: "From $4,200 per person",
    image: "/images/destinations/amboseli-elephants.jpg",
    description: "The perfect combination - thrilling safari in Amboseli followed by beach relaxation. Best of both worlds for your honeymoon.",
    highlights: [
      "Amboseli safari",
      "Mt. Kilimanjaro views",
      "Beach resort stay",
      "Private transfers",
      "All meals included",
    ],
    location: "Amboseli & Coast",
  },
  {
    id: 4,
    title: "Private Island Romance",
    duration: "6 Days / 5 Nights",
    price: "From $3,800 per person",
    image: "/images/destinations/lamu.jpg",
    description: "Escape to the historic Lamu archipelago. Private island experience, Swahili culture, and ultimate privacy.",
    highlights: [
      "Private island stay",
      "Traditional dhow sailing",
      "Swahili cooking class",
      "Historical town tour",
      "Sunset cruises",
    ],
    location: "Lamu Archipelago",
  },
];

export default function HoneymoonPackagesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/destinations/maasai-mara-sunset.jpg"
            alt="Honeymoon Safari"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]/70" />
          <div 
            className="absolute top-0 right-0 w-96 h-96 opacity-20"
            style={{
              background: 'radial-gradient(circle at 70% 30%, #F5A623 0%, transparent 50%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-[#D32F2F]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D32F2F]/30">
            <Heart className="w-8 h-8 text-[#D32F2F]" />
          </div>
          <span className="inline-block px-4 py-1.5 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#D32F2F]/30">
            Romantic Getaways
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Honeymoon Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Begin your forever with unforgettable romantic adventures in the heart of Africa
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Your honeymoon deserves to be as unique as your love story. Our carefully curated honeymoon packages 
            combine luxury accommodations, private experiences, and romantic touches that will create memories 
            to last a lifetime. From the savannahs of the Maasai Mara to the pristine beaches of the Kenyan coast, 
            let us craft the perfect romantic escape for you.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {honeymoonPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#D32F2F] text-white text-sm font-medium rounded-full">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {pkg.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      2 People
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-[#11A560]" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/packages/honeymoon/${pkg.id}`}
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-colors"
                  >
                    View Package Details
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Why Choose Our Honeymoon Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand that your honeymoon is a once-in-a-lifetime experience. Here's what makes our packages special.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Private Experiences", desc: "Exclusive game drives and dining just for you two" },
              { title: "Luxury Accommodation", desc: "Handpicked romantic lodges and tented camps" },
              { title: "Personal Touch", desc: "Welcome gifts, room decorations, and special surprises" },
              { title: "24/7 Support", desc: "Dedicated concierge throughout your journey" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#11A560]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure Together?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact us to customize your perfect honeymoon package.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg"
            >
              Enquire Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="tel:+254123456789"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#11A560] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              Call Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
