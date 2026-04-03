import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaClock, FaUser, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { getBlogImage, getBlogHeroImage } from '@/lib/blogImageMapping';

async function getPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
      deletedAt: null,
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' },
    ],
  });
}

async function getFeaturedPost() {
  return prisma.post.findFirst({
    where: {
      published: true,
      featured: true,
      deletedAt: null,
    },
    orderBy: { publishedAt: 'desc' },
  });
}

export const metadata = {
  title: 'Travel Blog | Sierra Tours & Safaris',
  description: 'Discover travel guides, safari tips, and adventure stories from Africa.',
};

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

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([getPosts(), getFeaturedPost()]);
  const regularPosts = featured 
    ? posts.filter(p => p.id !== featured.id)
    : posts;

  const heroImage = getBlogHeroImage();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-[#1A1A1A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]/70" />
          {/* Sun accent glow */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 opacity-20"
            style={{
              background: 'radial-gradient(circle at 70% 30%, #F5A623 0%, transparent 50%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-[#D32F2F]/20 text-[#F5A623] text-sm font-medium rounded-full mb-4 border border-[#D32F2F]/30">
            Travel Stories & Guides
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover safari guides, travel tips, and adventure stories from across Africa
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#D32F2F] rounded-full"></span>
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Featured Story</span>
            </div>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={getBlogImage(featured)}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#D32F2F] text-white text-sm font-medium rounded-full">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    {featured.author && (
                      <span className="flex items-center gap-1">
                        <FaUser size={12} />
                        {featured.author}
                      </span>
                    )}
                    {featured.publishedAt && (
                      <span className="flex items-center gap-1">
                        <FaCalendar size={12} />
                        {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    {featured.readingTime && (
                      <span className="flex items-center gap-1">
                        <FaClock size={12} />
                        {featured.readingTime} min read
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#D32F2F] transition-colors">
                    {featured.title}
                  </h2>
                  {featured.subtitle && (
                    <p className="text-lg text-slate-600 mb-4">{featured.subtitle}</p>
                  )}
                  <p className="text-slate-600 mb-6 line-clamp-3">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#11A560] font-medium group-hover:gap-3 transition-all">
                    Read Article <FaArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#11A560] rounded-full"></span>
            Latest Articles
          </h2>
          
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={getBlogImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[#11A560] text-xs font-medium rounded-full border border-gray-100">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <FaUser size={10} />
                            {post.author}
                          </span>
                        )}
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <FaClock size={10} />
                            {post.readingTime} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                      {post.country && (
                        <div className="flex items-center gap-1 mt-3 text-xs text-[#11A560]">
                          <FaMapMarkerAlt size={10} />
                          {post.country}
                          {post.location && ` • ${post.location}`}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
