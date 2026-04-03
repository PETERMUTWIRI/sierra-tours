'use client';

import { useRouter } from 'next/navigation';
import BlogPostForm from '@/app/components/admin/BlogPostForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NewBlogPost() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
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
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-white">New Blog Post</h1>
      </div>

      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
}
