'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaImage, FaSpinner, FaEye } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor';
import TagInput from './TagInput';
import SEOPreview from './SEOPreview';
import { POST_CATEGORIES, AFRICAN_COUNTRIES, slugify } from '@/app/lib/blog-constants';
import { Post, PostFormData } from '@/app/types/blog';

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export default function PostForm({ post, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    category: POST_CATEGORIES[0],
    cover: '',
    coverCaption: '',
    coverPhotographer: '',
    author: '',
    authorTitle: '',
    published: false,
    featured: false,
    isPressRelease: false,
    tags: [],
    location: '',
    country: '',
    metaTitle: '',
    metaDesc: '',
    ogImage: '',
    featuredQuote: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        subtitle: post.subtitle || '',
        content: post.content,
        excerpt: post.excerpt || '',
        category: post.category,
        cover: post.cover || '',
        coverCaption: post.coverCaption || '',
        coverPhotographer: post.coverPhotographer || '',
        author: post.author || '',
        authorTitle: post.authorTitle || '',
        published: post.published,
        featured: post.featured,
        isPressRelease: post.isPressRelease,
        tags: post.tags || [],
        location: post.location || '',
        country: post.country || '',
        metaTitle: post.metaTitle || '',
        metaDesc: post.metaDesc || '',
        ogImage: post.ogImage || '',
        featuredQuote: post.featuredQuote || '',
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover' | 'ogImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, [field]: data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = () => {
    return slugify(formData.title);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Actions */}
      <div className="flex items-center justify-between bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white"
          >
            <FaEye />
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600 text-orange-600"
            />
            Publish
          </label>
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600 text-orange-600"
            />
            Featured
          </label>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {post ? 'Update' : 'Create'}
          </button>
        </div>
      </div>

      {preview ? (
        // Preview Mode
        <div className="bg-white text-black rounded-xl p-8 max-w-4xl mx-auto">
          {formData.cover && (
            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
              <img src={formData.cover} alt={formData.title} className="w-full h-full object-cover" />
              {formData.coverCaption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
                  {formData.coverCaption}
                  {formData.coverPhotographer && ` • Photo by ${formData.coverPhotographer}`}
                </p>
              )}
            </div>
          )}
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full mb-4">
            {formData.category}
          </span>
          <h1 className="text-4xl font-bold mb-2">{formData.title || 'Untitled Post'}</h1>
          {formData.subtitle && (
            <p className="text-xl text-gray-600 mb-4">{formData.subtitle}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            {formData.author && <span>By {formData.author}</span>}
            {formData.country && <span>• {formData.country}</span>}
          </div>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formData.content }}
          />
        </div>
      ) : (
        // Edit Mode
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xl font-semibold focus:ring-2 focus:ring-orange-500"
                placeholder="Enter post title"
                required
              />
              {formData.title && (
                <p className="text-xs text-slate-500 mt-1">Slug: {generateSlug()}</p>
              )}
            </div>

            {/* Subtitle */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                placeholder="Secondary headline"
              />
            </div>

            {/* Content */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Content *</label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                minHeight="500px"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Excerpt * 
                <span className="text-slate-500 text-xs">({formData.excerpt.length}/500 chars)</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value.slice(0, 500) })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Brief summary for cards and SEO"
                required
              />
            </div>

            {/* Featured Quote */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Featured Quote</label>
              <textarea
                value={formData.featuredQuote}
                onChange={(e) => setFormData({ ...formData, featuredQuote: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                rows={2}
                placeholder="Pull quote for highlighting"
              />
            </div>

            {/* SEO Preview */}
            <SEOPreview
              title={formData.title}
              metaTitle={formData.metaTitle}
              metaDesc={formData.metaDesc}
              slug={generateSlug()}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                required
              >
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>
              
              {formData.cover ? (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cover: '' })}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                  <FaImage className="w-12 h-12 text-slate-600" />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                disabled={uploading}
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-600 file:text-white"
              />
              {uploading && <p className="mt-2 text-sm text-slate-400">Uploading...</p>}

              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={formData.coverCaption}
                  onChange={(e) => setFormData({ ...formData, coverCaption: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  placeholder="Image caption"
                />
                <input
                  type="text"
                  value={formData.coverPhotographer}
                  onChange={(e) => setFormData({ ...formData, coverPhotographer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  placeholder="Photographer credit"
                />
              </div>
            </div>

            {/* Author */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Author</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  placeholder="Author name"
                />
                <input
                  type="text"
                  value={formData.authorTitle}
                  onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  placeholder="Author title/position"
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
              <div className="space-y-3">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Select country</option>
                  {AFRICAN_COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  placeholder="Specific location"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <TagInput
                tags={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
              />
            </div>

            {/* SEO Fields */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">SEO</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Meta Title ({formData.metaTitle.length}/100)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value.slice(0, 100) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Meta Description ({formData.metaDesc.length}/160)
                  </label>
                  <textarea
                    value={formData.metaDesc}
                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value.slice(0, 160) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                    rows={3}
                    placeholder="SEO description"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">OG Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'ogImage')}
                    className="block w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-orange-600 file:text-white"
                  />
                  {formData.ogImage && (
                    <img src={formData.ogImage} alt="OG" className="mt-2 h-20 rounded object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* Post Type */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Post Type</h3>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isPressRelease}
                  onChange={(e) => setFormData({ ...formData, isPressRelease: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-600 text-orange-600"
                />
                Press Release
              </label>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
