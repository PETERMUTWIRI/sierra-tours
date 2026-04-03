'use client';

import { useRouter } from 'next/navigation';
import SafariForm from '@/app/components/admin/SafariForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NewSafari() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const res = await fetch('/api/safaris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create safari');
    }

    // Save itinerary separately
    const safari = await res.json();
    if (data.itinerary?.length > 0) {
      await fetch(`/api/safaris/${safari.id}/itinerary`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.itinerary),
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/safaris"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-white">New Safari</h1>
      </div>

      <SafariForm onSubmit={handleSubmit} />
    </div>
  );
}
