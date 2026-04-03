'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaMapMarkerAlt } from 'react-icons/fa';

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
}

export default function SafariManagement() {
  const [safaris, setSafaris] = useState<Safari[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!confirm('Are you sure you want to delete this safari?')) return;
    
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

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Safaris</h1>
        <Link
          href="/admin/safaris/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700"
        >
          <FaPlus />
          New Safari
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Safari</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Destination</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {safaris.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                  No safaris yet. Create your first safari!
                </td>
              </tr>
            ) : (
              safaris.map((safari) => (
                <tr key={safari.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{safari.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full">
                      <FaMapMarkerAlt size={12} />
                      {safari.destination?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{safari.duration}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {safari.currency} {safari.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(safari)}
                      className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${
                        safari.published
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}
                    >
                      {safari.published ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
                      {safari.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/safaris/${safari.id}/edit`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(safari.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
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
