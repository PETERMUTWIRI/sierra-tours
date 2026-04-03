'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaStar, FaNewspaper } from 'react-icons/fa';
import { PostListItem } from '@/app/types/blog';
import { POST_STATUS_BADGES } from '@/app/lib/blog-constants';

export default function BlogManagement() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?admin=true');
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (post: PostListItem) => {
    try {
      const res = await fetch(`/api/blog?id=${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: post.title,
          excerpt: post.excerpt,
          content: '', // Will be filled by the actual post data
          category: post.category,
          published: !post.published 
        }),
      });
      if (res.ok) {
        setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    if (filter === 'featured') return post.featured;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-slate-400 mt-1">Manage your travel blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      {/* Stats & Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', count: posts.length, filter: 'all' as const, color: 'bg-slate-700' },
          { label: 'Published', count: posts.filter(p => p.published).length, filter: 'published' as const, color: 'bg-green-600' },
          { label: 'Drafts', count: posts.filter(p => !p.published).length, filter: 'draft' as const, color: 'bg-amber-600' },
          { label: 'Featured', count: posts.filter(p => p.featured).length, filter: 'featured' as const, color: 'bg-blue-600' },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setFilter(stat.filter)}
            className={`p-4 rounded-xl border transition-all text-left ${
              filter === stat.filter
                ? 'border-orange-500 bg-slate-800'
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-2`}></div>
            <p className="text-2xl font-bold text-white">{stat.count}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Posts Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Post</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400 hidden md:table-cell">Author</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <FaNewspaper className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No posts found</p>
                  <Link href="/admin/blog/new" className="text-orange-500 hover:text-orange-400 text-sm mt-2 inline-block">
                    Create your first post
                  </Link>
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      {post.cover ? (
                        <img 
                          src={post.cover} 
                          alt="" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                          <FaNewspaper className="w-6 h-6 text-slate-600" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{post.title}</p>
                        <p className="text-slate-400 text-sm truncate max-w-xs">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                            {post.category}
                          </span>
                          {post.readingTime && (
                            <span className="text-xs text-slate-500">
                              {post.readingTime} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-slate-300">{post.author || 'Anonymous'}</p>
                    <p className="text-slate-500 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full w-fit ${
                          post.published
                            ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                            : 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30'
                        }`}
                      >
                        {post.published ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                      {post.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400 rounded-full w-fit">
                          <FaStar size={10} />
                          Featured
                        </span>
                      )}
                      {post.isPressRelease && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-600/20 text-purple-400 rounded-full w-fit">
                          Press
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
