'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, 
  FaMapMarkerAlt, FaStar, FaFilter, FaSearch,
  FaCalendarAlt, FaDollarSign, FaUsers, FaLayerGroup
} from 'react-icons/fa';

interface Safari {
  id: string;
  title: string;
  slug: string;
  destination: { name: string };
  duration: string;
  price: number;
  currency: string;
  published: boolean;
  featured: boolean;
  _count?: { itinerary: number };
}

export default function SafariManagement() {
  const [safaris, setSafaris] = useState<Safari[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSafaris();
  }, []);

  const fetchSafaris = async () => {
    try {
      const res = await fetch('/api/safaris');
      const data = await res.json();
      setSafaris(data);
    } catch (error) {
      console.error('Error fetching safaris:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this safari? This action cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/safaris/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSafaris(safaris.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting safari:', error);
    }
  };

  const togglePublish = async (safari: Safari) => {
    try {
      const res = await fetch(`/api/safaris/${safari.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !safari.published }),
      });
      if (res.ok) {
        setSafaris(safaris.map(s => s.id === safari.id ? { ...s, published: !s.published } : s));
      }
    } catch (error) {
      console.error('Error updating safari:', error);
    }
  };

  const toggleFeatured = async (safari: Safari) => {
    try {
      const res = await fetch(`/api/safaris/${safari.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !safari.featured }),
      });
      if (res.ok) {
        setSafaris(safaris.map(s => s.id === safari.id ? { ...s, featured: !s.featured } : s));
      }
    } catch (error) {
      console.error('Error updating safari:', error);
    }
  };

  const filteredSafaris = safaris.filter(safari => {
    // Filter by status
    if (filter === 'published' && !safari.published) return false;
    if (filter === 'draft' && safari.published) return false;
    if (filter === 'featured' && !safari.featured) return false;
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        safari.title.toLowerCase().includes(searchLower) ||
        safari.destination?.name?.toLowerCase().includes(searchLower) ||
        safari.duration.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Stats
  const stats = {
    total: safaris.length,
    published: safaris.filter(s => s.published).length,
    featured: safaris.filter(s => s.featured).length,
    draft: safaris.filter(s => !s.published).length,
    totalValue: safaris.reduce((sum, s) => sum + (s.price || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Safari Packages</h1>
          <p className="text-slate-400 mt-1">Manage your safari offerings and itineraries</p>
        </div>
        <Link
          href="/admin/safaris/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg shadow-orange-900/20"
        >
          <FaPlus />
          Create New Safari
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={FaLayerGroup} 
          label="Total Safaris" 
          value={stats.total} 
          color="blue" 
        />
        <StatCard 
          icon={FaEye} 
          label="Published" 
          value={stats.published} 
          color="green" 
          subtitle={`${stats.draft} drafts`}
        />
        <StatCard 
          icon={FaStar} 
          label="Featured" 
          value={stats.featured} 
          color="yellow" 
        />
        <StatCard 
          icon={FaDollarSign} 
          label="Avg. Price" 
          value={`$${stats.total > 0 ? Math.round(stats.totalValue / stats.total).toLocaleString() : 0}`} 
          color="orange" 
        />
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search safaris by title, destination, or duration..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'published', label: 'Published', count: stats.published },
              { id: 'featured', label: 'Featured', count: stats.featured },
              { id: 'draft', label: 'Drafts', count: stats.draft },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === f.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {f.label}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  filter === f.id ? 'bg-orange-700 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Safari Grid */}
      {filteredSafaris.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-xl border border-slate-800">
          <FaLayerGroup className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {search || filter !== 'all' ? 'No safaris match your filters' : 'No safaris yet'}
          </h3>
          <p className="text-slate-400 mb-6">
            {search || filter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first safari package to get started'}
          </p>
          {!search && filter === 'all' && (
            <Link
              href="/admin/safaris/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700"
            >
              <FaPlus />
              Create Safari
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSafaris.map((safari) => (
            <div 
              key={safari.id} 
              className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-slate-700 transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Safari Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {safari.title}
                    </h3>
                    {safari.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-600/20 text-yellow-400 text-xs font-medium rounded-full">
                        <FaStar size={10} />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-orange-500" />
                      {safari.destination?.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FaCalendarAlt className="text-blue-500" />
                      {safari.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
                      <FaDollarSign />
                      {safari.price?.toLocaleString()} {safari.currency}
                    </span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  {/* Publish Toggle */}
                  <button
                    onClick={() => togglePublish(safari)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      safari.published
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        : 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30'
                    }`}
                    title={safari.published ? 'Click to unpublish' : 'Click to publish'}
                  >
                    {safari.published ? <FaEye /> : <FaEyeSlash />}
                    {safari.published ? 'Live' : 'Draft'}
                  </button>

                  {/* Featured Toggle */}
                  <button
                    onClick={() => toggleFeatured(safari)}
                    className={`p-2 rounded-lg transition-all ${
                      safari.featured
                        ? 'bg-yellow-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-yellow-400'
                    }`}
                    title={safari.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <FaStar />
                  </button>

                  {/* Edit */}
                  <Link
                    href={`/admin/safaris/${safari.id}/edit`}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                    title="Edit safari"
                  >
                    <FaEdit />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(safari.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Delete safari"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'yellow' | 'orange';
  subtitle?: string;
}

function StatCard({ icon: Icon, label, value, color, subtitle }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 text-blue-400',
    green: 'from-green-600 to-green-700 text-green-400',
    yellow: 'from-yellow-600 to-yellow-700 text-yellow-400',
    orange: 'from-orange-600 to-orange-700 text-orange-400',
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center opacity-20`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[2]}`} />
        </div>
      </div>
    </div>
  );
}
