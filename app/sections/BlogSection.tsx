"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/app/types";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

// Default blog posts data (fallback)
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Safari Destinations in Kenya",
    slug: "top-10-safari-destinations-kenya",
    excerpt:
      "Discover the best wildlife viewing spots in Kenya, from the iconic Masai Mara to the hidden gems of Samburu.",
    image: "/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01-rbamx9reyz8y64l8g8d7yqeb9e95i3mkhgvfivup3c.jpg",
    date: "2024-03-15",
    author: "John Safari",
    category: "Kenya",
  },
  {
    id: "2",
    title: "The Great Migration: A Complete Guide",
    slug: "great-migration-complete-guide",
    excerpt:
      "Everything you need to know about witnessing the world's greatest wildlife spectacle in Tanzania and Kenya.",
    image: "/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03-ra1pcbh1j4lg3dxna0os6fw62mygbuxdtr0cssxrj4.jpg",
    date: "2024-03-10",
    author: "Sarah Explorer",
    category: "Tanzania",
  },
  {
    id: "3",
    title: "Luxury Safari Lodges in Botswana",
    slug: "luxury-safari-lodges-botswana",
    excerpt:
      "Experience the ultimate in safari luxury at these exclusive lodges in the Okavango Delta and Chobe.",
    image: "/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg",
    date: "2024-03-05",
    author: "Michael Wilderness",
    category: "Botswana",
  },
];

export default function BlogSection({
  title = "Latest Articles",
  subtitle = "Get inspired for your next African adventure with our travel guides and tips.",
  posts = defaultPosts,
}: BlogSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block relative">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#11A560] text-white text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#11A560] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#11A560] font-medium hover:text-[#0E8A50] transition-colors"
                >
                  Read More
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#11A560] text-white font-medium rounded-lg hover:bg-[#0E8A50] transition-colors"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
