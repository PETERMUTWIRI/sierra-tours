import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  FaCalendar, FaClock, FaUser, FaMapMarkerAlt, 
  FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaEnvelope,
  FaArrowLeft, FaTag
} from 'react-icons/fa';
import { getBlogImage } from '@/lib/blogImageMapping';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

async function getRelatedPosts(currentId: number, category: string) {
  return prisma.post.findMany({
    where: {
      id: { not: currentId },
      category,
      published: true,
      deletedAt: null,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) return {};

  return {
    title: post.metaTitle || `${post.title} | Sierra Tours Blog`,
    description: post.metaDesc || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.metaDesc || post.excerpt || '',
      images: post.ogImage || getBlogImage(post) ? [{ url: post.ogImage || getBlogImage(post) }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published || post.deletedAt) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category);

  const shareUrl = `https://sierratours.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // Get mapped image for this post
  const heroImage = getBlogImage(post);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#D32F2F] transition-colors"
          >
            <FaArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src={heroImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/40 to-transparent"></div>
        {post.coverCaption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="container mx-auto">
              <p className="text-white/80 text-sm">
                {post.coverCaption}
                {post.coverPhotographer && (
                  <span className="text-white/60"> • Photo by {post.coverPhotographer}</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Article Header */}
      <header className="py-8 md:py-12 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#11A560] text-white text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 bg-[#D32F2F]/10 text-[#D32F2F] text-sm font-medium rounded-full border border-[#D32F2F]/20">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-slate-600 mb-6">{post.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#11A560] flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{post.author}</p>
                  {post.authorTitle && <p className="text-xs">{post.authorTitle}</p>}
                </div>
              </div>
            )}
            
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <FaCalendar size={14} />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
            
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <FaClock size={14} />
                <span>{post.readingTime} min read</span>
                {post.wordCount && <span className="text-slate-400">({post.wordCount} words)</span>}
              </div>
            )}
            
            {(post.country || post.location) && (
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt size={14} />
                <span>
                  {post.location}
                  {post.location && post.country && ', '}
                  {post.country}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Featured Quote */}
          {post.featuredQuote && (
            <blockquote className="border-l-4 border-[#D32F2F] pl-6 py-2 mb-8 bg-[#D32F2F]/5 rounded-r-lg">
              <p className="text-xl md:text-2xl font-medium text-slate-800 italic">
                &ldquo;{post.featuredQuote}&rdquo;
              </p>
            </blockquote>
          )}

          {/* Main Content */}
          <div 
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-[#11A560] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-[#D32F2F] prose-blockquote:bg-[#D32F2F]/5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
              prose-strong:text-slate-900
              prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 mb-3">
                <FaTag className="text-[#D32F2F]" />
                <span className="text-sm font-medium text-slate-600">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-[#11A560] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm font-medium text-slate-600 mb-3">Share this article</p>
            <div className="flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Share on Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}
                className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Share via Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 border-t">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#11A560] rounded-full"></span>
              More Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <article key={related.id} className="group">
                  <Link href={`/blog/${related.slug}`} className="block">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-sm">
                      <Image
                        src={getBlogImage(related)}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <span className="text-xs font-medium text-[#11A560] uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 line-clamp-2">{related.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
