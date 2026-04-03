'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/app/components/admin/PostForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { PostFormData } from '@/app/types/blog';

export default function NewPost() {
  const router = useRouter();

  const handleSubmit = async (data: PostFormData) => {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create post');
    }
  };

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
          <h1 className="text-3xl font-bold text-white">New Blog Post</h1>
          <p className="text-slate-400 text-sm">Create a new travel article</p>
        </div>
      </div>

      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
