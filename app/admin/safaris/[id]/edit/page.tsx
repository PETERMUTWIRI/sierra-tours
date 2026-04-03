'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SafariForm from '@/app/components/admin/SafariForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface Safari {
  id: string;
  title: string;
  destinationId: string;
  duration: string;
  price: number;
  currency: string;
  excerpt: string;
  description: string;
  image: string;
  groupSize: string;
  accommodation: string;
  activities: string[];
  includes: string[];
  excludes: string[];
  highlights: string[];
  published: boolean;
  featured: boolean;
  itinerary: any[];
}

export default function EditSafari() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [safari, setSafari] = useState<Safari | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSafari();
  }, [id]);

  const fetchSafari = async () => {
    try {
      const res = await fetch(`/api/safaris/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSafari(data);
      }
    } catch (error) {
      console.error('Error fetching safari:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    // Update safari
    const res = await fetch(`/api/safaris/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update safari');
    }

    // Update itinerary
    if (data.itinerary) {
      await fetch(`/api/safaris/${id}/itinerary`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.itinerary),
      });
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!safari) {
    return <div className="text-white">Safari not found</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/safaris"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-white">Edit Safari</h1>
      </div>

      <SafariForm safari={safari} onSubmit={handleSubmit} />
    </div>
  );
}
