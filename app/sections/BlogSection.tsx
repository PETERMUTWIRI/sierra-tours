"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getBlogImage } from "@/lib/blogImageMapping";
import type { BlogPost } from "@/app/types";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

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

// Default blog posts data (fallback)
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Safari Destinations in Kenya",
    slug: "top-10-safari-destinations-kenya",
    excerpt:
      "Discover the best wildlife viewing spots in Kenya, from the iconic Masai Mara to the hidden gems of Samburu.",
    image: "/images/blog/franck-v-512278-unsplash.jpg",
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
    image: "/images/blog/jason-blackeye-262295-unsplash.jpg",
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
    image: "/images/blog/lee-miller-47629-unsplash.jpg",
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/blog/pexels-photo-253758.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          quality={60}
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-white/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/70 via-transparent to-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
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
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block relative">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getBlogImage({
                      id: post.id,
                      slug: post.slug,
                      title: post.title,
                      category: post.category,
                      cover: post.image,
                    })}
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
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D32F2F] text-white font-semibold rounded-full hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
