"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Compass, Heart, Shield, Users, Globe, Leaf, Target, MapPin, Clock, Phone, Mail } from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Authentic Exploration",
    description:
      "We believe the best journeys go beyond the guidebook. Every itinerary is designed to immerse you in the real Africa — its wildlife, cultures, and untamed landscapes.",
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description:
      "Your safari leaves a positive footprint. We partner with local conservancies, eco-lodges, and community projects to protect wildlife and empower people.",
  },
  {
    icon: Heart,
    title: "Passionate Service",
    description:
      "From your first enquiry to your return home, our team cares deeply about every detail. We treat your adventure like it is our own.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your security is non-negotiable. Our guides are certified professionals, our vehicles are rigorously maintained, and every trip is fully insured.",
  },
];

const stats = [
  { value: "15+", label: "Years of Safari Excellence" },
  { value: "5,000+", label: "Happy Travelers" },
  { value: "12", label: "African Countries Explored" },
  { value: "98%", label: "Client Satisfaction Rate" },
];

export default function AboutContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/sierra-tours-and-travel-luxury-safaris.jpg"
            alt="African safari landscape"
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
            Nairobi&apos;s Trusted Safari Partner
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl"
          >
            We Live and Breathe African Safaris
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            Born in the heart of Nairobi, Sierra Tours & Safaris has been crafting
            extraordinary journeys across East and Southern Africa for over 15 years.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/safaris/other/sierra-tours-and-safaris-maasai-mara-safaris-image01.jpeg"
                    alt="Maasai Mara safari"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg"
                    alt="Kenya wildlife safari"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              {/* Floating Experience Card */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl px-6 py-4 border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#11A560]/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#D32F2F]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">15+</div>
                  <div className="text-sm text-gray-500">Years of Excellence</div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#D32F2F] font-semibold mb-2 block uppercase tracking-wide text-sm">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                From a Small Nairobi Office to Africa&apos;s Wildest Corners
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sierra Tours & Safaris was founded with a simple belief: that every traveler
                  deserves to experience Africa in its purest, most authentic form. What began
                  as a passionate dream in a small office in Nairobi has grown into one of
                  East Africa&apos;s most trusted tour operators.
                </p>
                <p>
                  Over the years, we have guided thousands of travelers through the golden
                  grasslands of the Masai Mara, the elephant-dotted plains of Amboseli, the
                  endless Serengeti, and the misty mountains of Rwanda where gorillas roam.
                  We have planned honeymoons under African stars, family adventures that spark
                  wonder, and corporate retreats that inspire.
                </p>
                <p>
                  Our headquarters at Maendeleo House in Nairobi keeps us rooted in the
                  community we serve. We are not a distant booking engine — we are local
                  experts who wake up every day excited to share the Africa we know and love.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg"
            alt="Mount Kenya landscape"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-[#11A560]/92" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#F5A623] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B3CE4D] rounded-full blur-3xl" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#F5A623]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To design and deliver transformative safari experiences that connect people
                with nature, support local communities, and create memories that last a
                lifetime — all while upholding the highest standards of safety and service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#F5A623]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To be the most trusted and loved African safari company in the world — known
                for authentic experiences, sustainable practices, and the kind of personal
                care that turns first-time guests into lifelong friends.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D32F2F] font-semibold mb-2 block uppercase tracking-wide text-sm">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              These principles guide every decision we make and every journey we craft.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#11A560]/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#11A560]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#F5A623] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / What Makes Us Different */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#D32F2F] font-semibold mb-2 block uppercase tracking-wide text-sm">
                Why Sierra Tours
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                The Difference Is in the Details
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Local Expertise, Global Standards",
                    text:
                      "Our team is based in Nairobi and knows every park, lodge, and hidden gem personally. Yet we operate with the professionalism and reliability expected by international travelers.",
                  },
                  {
                    title: "Tailor-Made for You",
                    text:
                      "No two safaris are the same. Whether you are a photographer chasing the perfect shot, a family seeking child-friendly lodges, or a couple planning a romantic escape, we design around you.",
                  },
                  {
                    title: "Conservation at Heart",
                    text:
                      "We partner with camps and conservancies that invest in wildlife protection and community development. When you travel with us, you actively support the future of Africa&apos;s wild places.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-2 h-2 bg-[#11A560] rounded-full mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/general/sierra-tours-and-safaris-south-africa-safaris-image01.jpg"
                  alt="South African safari experience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-8 bg-[#11A560] text-white rounded-xl shadow-xl px-6 py-4 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">Local Team</span>
                </div>
                <p className="text-sm text-white/90">
                  Born and raised in Kenya, our guides share stories only locals know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/safaris/zambia/sierra-tours-and-safaris-zambia-safaris-image01.jpeg"
            alt="Zambia safari"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Write Your African Story?
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Whether you have a clear plan or just a dream, our team is here to turn it into
            an unforgettable safari experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/254725162916?text=Hello%20Sierra%20Tours%20%26%20Safaris,%20I%20would%20like%20to%20enquire%20about%20your%20safari%20packages.%20Please%20provide%20me%20with%20more%20information.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D32F2F] text-white font-semibold rounded-lg hover:bg-[#B71C1C] transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Enquire on WhatsApp
            </a>
            <a
              href="tel:+254725162916"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F5A623]" />
              <span>Maendeleo House, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F5A623]" />
              <span>Mon - Sat: 8:00 AM - 6:00 PM EAT</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
