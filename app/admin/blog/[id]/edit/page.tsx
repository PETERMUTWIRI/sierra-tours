'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PostForm from '@/app/components/admin/PostForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { Post, PostFormData } from '@/app/types/blog';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog?admin=true`);
      const data = await res.json();
      const found = data.posts.find((p: Post) => p.id === parseInt(id));
      if (found) {
        setPost(found);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: PostFormData) => {
    const res = await fetch(`/api/blog?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Post not found</p>
        <Link href="/admin/blog" className="text-orange-500 hover:text-orange-400 mt-2 inline-block">
          Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/blog"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Post</h1>
          <p className="text-slate-400 text-sm">Update your travel article</p>
        </div>
      </div>

      <PostForm post={post} onSubmit={handleSubmit} />
    </div>
  );
}
