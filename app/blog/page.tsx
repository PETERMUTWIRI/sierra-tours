import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaClock, FaUser, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

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

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([getPosts(), getFeaturedPost()]);
  const regularPosts = featured 
    ? posts.filter(p => p.id !== featured.id)
    : posts;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover safari guides, travel tips, and adventure stories from across Africa
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#11A560] rounded-full"></span>
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Featured Story</span>
            </div>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden">
                  {featured.cover ? (
                    <img
                      src={featured.cover}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400">No image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#11A560] text-white text-sm font-medium rounded-full">
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
                  <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#0E8A50] transition-colors">
                    {featured.title}
                  </h2>
                  {featured.subtitle && (
                    <p className="text-lg text-slate-600 mb-4">{featured.subtitle}</p>
                  )}
                  <p className="text-slate-600 mb-6 line-clamp-3">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#0E8A50] font-medium group-hover:gap-3 transition-all">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
          
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
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
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0E8A50] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                      {post.country && (
                        <div className="flex items-center gap-1 mt-3 text-xs text-slate-500">
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
