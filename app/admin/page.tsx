import { prisma } from '@/lib/db';
import Link from 'next/link';
import { 
  FaNewspaper, FaPlane, FaMapMarkerAlt, FaEye, 
  FaStar, FaDollarSign, FaUsers, FaCalendarAlt,
  FaArrowUp, FaPlus, FaEdit, FaExternalLinkAlt,
  FaGift, FaBox
} from 'react-icons/fa';

async function getStats() {
  const [
    blogCount, 
    safariCount, 
    destinationCount, 
    packageTypeCount,
    packageSafariCount,
    publishedPosts, 
    featuredPosts,
    publishedSafaris,
    featuredSafaris,
    publishedPackageSafaris,
    featuredPackageSafaris,
    itineraryDays,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.safari.count(),
    prisma.destination.count(),
    prisma.packageType.count(),
    prisma.packageSafari.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { featured: true } }),
    prisma.safari.count({ where: { published: true } }),
    prisma.safari.count({ where: { featured: true } }),
    prisma.packageSafari.count({ where: { published: true } }),
    prisma.packageSafari.count({ where: { featured: true } }),
    prisma.itineraryDay.count(),
  ]);

  // Calculate total value of all safaris
  const safariPrices = await prisma.safari.findMany({
    select: { price: true }
  });
  const totalSafariValue = safariPrices.reduce((sum, s) => sum + s.price, 0);
  const avgSafariPrice = safariCount > 0 ? Math.round(totalSafariValue / safariCount) : 0;

  return { 
    blogCount, 
    safariCount, 
    destinationCount, 
    packageTypeCount,
    packageSafariCount,
    publishedPosts, 
    featuredPosts,
    publishedSafaris,
    featuredSafaris,
    publishedPackageSafaris,
    featuredPackageSafaris,
    itineraryDays,
    avgSafariPrice,
    totalSafariValue,
  };
}

async function getRecentPosts() {
  return prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
}

async function getRecentSafaris() {
  return prisma.safari.findMany({
    take: 5,
    include: { destination: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function getFeaturedSafaris() {
  return prisma.safari.findMany({
    where: { featured: true, published: true },
    take: 3,
    include: { destination: true },
    orderBy: { price: 'desc' },
  });
}

async function getRecentPackageSafaris() {
  return prisma.packageSafari.findMany({
    take: 5,
    include: { packageType: true, destination: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();
  const recentSafaris = await getRecentSafaris();
  const featuredSafaris = await getFeaturedSafaris();
  const recentPackageSafaris = await getRecentPackageSafaris();

  const statCards = [
    { 
      label: 'Blog Posts', 
      value: stats.blogCount, 
      subtext: `${stats.publishedPosts} published`,
      icon: FaNewspaper, 
      color: 'orange',
      href: '/admin/blog',
      trend: '+12%'
    },
    { 
      label: 'Safari Packages', 
      value: stats.safariCount, 
      subtext: `${stats.featuredSafaris} featured`,
      icon: FaPlane, 
      color: 'blue',
      href: '/admin/safaris',
      trend: '+8%'
    },
    { 
      label: 'Destinations', 
      value: stats.destinationCount, 
      subtext: 'Countries & regions',
      icon: FaMapMarkerAlt, 
      color: 'green',
      href: '/admin/destinations',
    },
    { 
      label: 'Package Types', 
      value: stats.packageTypeCount, 
      subtext: `${stats.packageSafariCount} package safaris`,
      icon: FaGift, 
      color: 'amber',
      href: '/admin/packages/types',
    },
    { 
      label: 'Package Safaris', 
      value: stats.packageSafariCount, 
      subtext: `${stats.publishedPackageSafaris} published • ${stats.featuredPackageSafaris} featured`,
      icon: FaBox, 
      color: 'purple',
      href: '/admin/packages/safaris',
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; glow: string; border: string }> = {
    orange: { 
      bg: 'bg-[#11A560]/10', 
      icon: 'text-[#11A560]', 
      glow: 'shadow-[#11A560]/20',
      border: 'border-[#11A560]/20'
    },
    blue: { 
      bg: 'bg-blue-500/10', 
      icon: 'text-blue-500', 
      glow: 'shadow-blue-500/20',
      border: 'border-blue-500/20'
    },
    green: { 
      bg: 'bg-green-500/10', 
      icon: 'text-green-500', 
      glow: 'shadow-green-500/20',
      border: 'border-green-500/20'
    },
    purple: { 
      bg: 'bg-purple-500/10', 
      icon: 'text-purple-500', 
      glow: 'shadow-purple-500/20',
      border: 'border-purple-500/20'
    },
    amber: { 
      bg: 'bg-amber-500/10', 
      icon: 'text-amber-500', 
      glow: 'shadow-amber-500/20',
      border: 'border-amber-500/20'
    },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Welcome to Sierra Tours Admin. Manage your safaris, blog, and destinations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/admin/packages/safaris/new" 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/20"
          >
            <FaPlus className="w-4 h-4" />
            New Package Safari
          </Link>
          <Link 
            href="/admin/safaris/new" 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            <FaPlus className="w-4 h-4" />
            New Safari
          </Link>
          <Link 
            href="/admin/blog/new" 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E8A50] hover:bg-[#0C7845] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#0E8A50]/20"
          >
            <FaPlus className="w-4 h-4" />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const colors = colorClasses[stat.color];
          const Icon = stat.icon;
          return (
            <Link 
              key={stat.label} 
              href={stat.href}
              className="group bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-slate-900/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2 group-hover:text-[#B3CE4D] transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">{stat.subtext}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shadow-lg ${colors.glow}`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
              </div>
              {stat.trend && (
                <div className="mt-4 flex items-center gap-1 text-green-400 text-sm">
                  <FaArrowUp className="w-3 h-3" />
                  <span>{stat.trend}</span>
                  <span className="text-slate-500 ml-1">vs last month</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Featured Safaris Banner */}
      {featuredSafaris.length > 0 && (
        <div className="bg-gradient-to-r from-amber-600/10 via-[#0E8A50]/10 to-yellow-600/10 rounded-2xl p-6 border border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FaStar className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Featured Safaris</h3>
                <p className="text-slate-400 text-sm">Premium packages highlighted on your website</p>
              </div>
            </div>
            <Link 
              href="/admin/safaris" 
              className="text-sm font-medium text-[#11A560] hover:text-[#B3CE4D] transition-colors"
            >
              Manage All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredSafaris.map((safari) => (
              <div 
                key={safari.id} 
                className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm line-clamp-1">{safari.title}</h4>
                  <span className="text-xs font-medium text-green-400">
                    ${safari.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FaMapMarkerAlt className="text-[#11A560]" />
                  {safari.destination?.name}
                  <span className="text-slate-600">•</span>
                  <FaCalendarAlt className="text-blue-500" />
                  {safari.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#11A560]/10 flex items-center justify-center">
                <FaNewspaper className="w-5 h-5 text-[#11A560]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Recent Blog Posts</h2>
                <p className="text-slate-400 text-sm">Latest articles and updates</p>
              </div>
            </div>
            <Link 
              href="/admin/blog" 
              className="text-sm font-medium text-[#11A560] hover:text-[#B3CE4D] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPosts.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaNewspaper className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400">No blog posts yet</p>
                <Link 
                  href="/admin/blog/new" 
                  className="inline-flex items-center gap-2 mt-3 text-[#11A560] hover:text-[#B3CE4D] text-sm font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  Create your first post
                </Link>
              </div>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FaNewspaper className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-[#B3CE4D] transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                        {post.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        post.published 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <Link 
                    href={`/admin/blog/${post.id}/edit`} 
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Safaris */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FaPlane className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Recent Safaris</h2>
                <p className="text-slate-400 text-sm">Latest tour packages</p>
              </div>
            </div>
            <Link 
              href="/admin/safaris" 
              className="text-sm font-medium text-[#11A560] hover:text-[#B3CE4D] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentSafaris.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPlane className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400">No safaris yet</p>
                <Link 
                  href="/admin/safaris/new" 
                  className="inline-flex items-center gap-2 mt-3 text-[#11A560] hover:text-[#B3CE4D] text-sm font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  Create your first safari
                </Link>
              </div>
            ) : (
              recentSafaris.map((safari) => (
                <div key={safari.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FaPlane className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-[#B3CE4D] transition-colors">
                      {safari.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">
                        {safari.destination?.name}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{safari.duration}</span>
                      {safari.featured && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-amber-400 flex items-center gap-1">
                            <FaStar className="w-3 h-3" />
                            Featured
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link 
                    href={`/admin/safaris/${safari.id}/edit`} 
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Three Column Layout - Package Safaris */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Package Safaris */}
        <div className="xl:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <FaBox className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Recent Package Safaris</h2>
                <p className="text-slate-400 text-sm">Latest packages from themed & safari collections</p>
              </div>
            </div>
            <Link 
              href="/admin/packages/safaris" 
              className="text-sm font-medium text-[#11A560] hover:text-[#B3CE4D] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPackageSafaris.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBox className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400">No package safaris yet</p>
                <Link 
                  href="/admin/packages/safaris/new" 
                  className="inline-flex items-center gap-2 mt-3 text-[#11A560] hover:text-[#B3CE4D] text-sm font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  Create your first package safari
                </Link>
              </div>
            ) : (
              recentPackageSafaris.map((safari) => (
                <div key={safari.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FaBox className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-[#B3CE4D] transition-colors">
                      {safari.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                        {safari.packageType?.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {safari.destination?.name}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{safari.duration}</span>
                      {safari.featured && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-amber-400 flex items-center gap-1">
                            <FaStar className="w-3 h-3" />
                            Featured
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link 
                    href={`/admin/packages/safaris/${safari.id}/edit`} 
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Package Types Summary */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FaGift className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Package Types</h2>
                <p className="text-slate-400 text-sm">Categories & collections</p>
              </div>
            </div>
            <Link 
              href="/admin/packages/types" 
              className="text-sm font-medium text-[#11A560] hover:text-[#B3CE4D] transition-colors"
            >
              Manage →
            </Link>
          </div>
          <div className="p-6 space-y-4">
            <QuickActionCard
              title="Themed Holidays"
              description="Honeymoon, Valentine, Christmas, Luxury"
              icon={FaGift}
              href="/admin/packages/types"
              color="purple"
            />
            <QuickActionCard
              title="Safari Experiences"
              description="Beach, Wildlife, Mountain, Cultural, Cycling"
              icon={FaPlane}
              href="/admin/packages/types"
              color="blue"
            />
            <QuickActionCard
              title="Local Packages"
              description="Beach, Bush, Weekend Getaways"
              icon={FaMapMarkerAlt}
              href="/admin/packages/types"
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Create Package Safari"
          description="Add a new themed or safari package"
          icon={FaBox}
          href="/admin/packages/safaris/new"
          color="orange"
        />
        <QuickActionCard
          title="Create Safari Tour"
          description="Add a new safari tour with full itinerary"
          icon={FaPlane}
          href="/admin/safaris/new"
          color="blue"
        />
        <QuickActionCard
          title="Write Blog Post"
          description="Share travel stories and updates"
          icon={FaNewspaper}
          href="/admin/blog/new"
          color="green"
        />
        <QuickActionCard
          title="View Website"
          description="Preview your live website"
          icon={FaExternalLinkAlt}
          href="/"
          color="green"
          external
        />
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: 'blue' | 'orange' | 'green' | 'purple';
  external?: boolean;
}

function QuickActionCard({ title, description, icon: Icon, href, color, external }: QuickActionCardProps) {
  const colorClasses = {
    blue: 'from-blue-600/10 to-blue-700/10 hover:border-blue-500/30 group-hover:text-blue-400',
    orange: 'from-[#0E8A50]/10 to-[#0C7845]/10 hover:border-[#11A560]/30 group-hover:text-[#B3CE4D]',
    green: 'from-green-600/10 to-green-700/10 hover:border-green-500/30 group-hover:text-green-400',
    purple: 'from-purple-600/10 to-purple-700/10 hover:border-purple-500/30 group-hover:text-purple-400',
  };

  const iconColors = {
    blue: 'text-blue-500 bg-blue-500/10',
    orange: 'text-[#11A560] bg-[#11A560]/10',
    green: 'text-green-500 bg-green-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
  };

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className={`group block p-6 rounded-2xl bg-gradient-to-r ${colorClasses[color]} border border-slate-800 transition-all hover:shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconColors[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-white group-hover:text-[#B3CE4D] transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
