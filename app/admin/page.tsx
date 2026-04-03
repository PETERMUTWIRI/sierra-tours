import { prisma } from '@/lib/db';
import Link from 'next/link';
import { FaNewspaper, FaPlane, FaMapMarkerAlt, FaEye } from 'react-icons/fa';

async function getStats() {
  const [blogCount, safariCount, destinationCount] = await Promise.all([
    prisma.post.count(),
    prisma.safari.count(),
    prisma.destination.count(),
  ]);

  return { blogCount, safariCount, destinationCount };
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

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();
  const recentSafaris = await getRecentSafaris();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-600/20 flex items-center justify-center">
              <FaNewspaper className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Blog Posts</p>
              <p className="text-3xl font-bold text-white">{stats.blogCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <FaPlane className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Safaris</p>
              <p className="text-3xl font-bold text-white">{stats.safariCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center">
              <FaMapMarkerAlt className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Destinations</p>
              <p className="text-3xl font-bold text-white">{stats.destinationCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <FaEye className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Views</p>
              <p className="text-3xl font-bold text-white">-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPosts.length === 0 ? (
              <p className="p-6 text-slate-400 text-center">No blog posts yet</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50">
                  <div>
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-slate-400 text-sm">{post.category} • {post.published ? 'Published' : 'Draft'}</p>
                  </div>
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-slate-400 hover:text-white">
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Safaris */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Safaris</h2>
            <Link href="/admin/safaris" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentSafaris.length === 0 ? (
              <p className="p-6 text-slate-400 text-center">No safaris yet</p>
            ) : (
              recentSafaris.map((safari) => (
                <div key={safari.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50">
                  <div>
                    <p className="text-white font-medium">{safari.title}</p>
                    <p className="text-slate-400 text-sm">{safari.destination?.name} • {safari.published ? 'Published' : 'Draft'}</p>
                  </div>
                  <Link href={`/admin/safaris/${safari.id}/edit`} className="text-slate-400 hover:text-white">
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
