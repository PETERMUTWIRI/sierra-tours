'use client';

import { useEffect, useState } from 'react';
import { FaGlobeAfrica } from 'react-icons/fa';

interface Destination {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  published: boolean;
}

export default function DestinationsManagement() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Destinations</h1>
        <p className="text-slate-400">
          Manage destinations from the database
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Destination</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Tagline</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {destinations.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-400">
                  No destinations yet. Add destinations through the API or seed script.
                </td>
              </tr>
            ) : (
              destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                        <FaGlobeAfrica className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{dest.name}</p>
                        <p className="text-slate-400 text-sm">/{dest.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{dest.tagline}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      dest.published
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {dest.published ? 'Published' : 'Draft'}
                    </span>
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
