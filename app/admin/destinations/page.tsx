"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGlobeAfrica, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

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
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/destinations");
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination? All linked safaris will also be affected.")) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/destinations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDestinations(destinations.filter((d) => d.id !== id));
      } else {
        alert("Failed to delete destination");
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Destinations</h1>
          <p className="text-slate-400 mt-1">
            Countries and regions that appear in the navbar and across the site
          </p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#11A560] hover:bg-[#0E8A50] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#11A560]/20"
        >
          <FaPlus className="w-4 h-4" />
          New Destination
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Destination</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Tagline</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {destinations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No destinations yet.
                  <Link
                    href="/admin/destinations/new"
                    className="text-[#11A560] hover:underline ml-1"
                  >
                    Create your first destination
                  </Link>
                </td>
              </tr>
            ) : (
              destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-800/50 transition-colors">
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
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        dest.published
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {dest.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/destinations/${dest.id}/edit`}
                        className="p-2 text-slate-400 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(dest.id)}
                        disabled={deleteLoading === dest.id}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <FaGlobeAfrica className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-200">
          <p className="font-medium mb-1">Where destinations appear</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-300/80">
            <li>Navbar mega menu (auto-populated)</li>
            <li>/destinations public listing page</li>
            <li>/destinations/[slug] detail page</li>
            <li>Safari filter chips on /safaris</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
