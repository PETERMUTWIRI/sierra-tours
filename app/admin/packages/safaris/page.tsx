"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, MapPin, Clock, DollarSign } from "lucide-react";

interface PackageSafari {
  id: string;
  title: string;
  slug: string;
  duration: string;
  price: number;
  priceFrom: boolean;
  currency: string;
  location: string;
  image: string;
  published: boolean;
  featured: boolean;
  order: number;
  packageType: {
    name: string;
    slug: string;
    category: string;
  };
  _count: {
    itinerary: number;
    gallery: number;
  };
}

interface PackageType {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export default function PackageSafarisAdmin() {
  const [safaris, setSafaris] = useState<PackageSafari[]>([]);
  const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [safarisRes, typesRes] = await Promise.all([
        fetch("/api/package-safaris"),
        fetch("/api/package-types"),
      ]);

      if (safarisRes.ok && typesRes.ok) {
        const safarisData = await safarisRes.json();
        const typesData = await typesRes.json();
        setSafaris(safarisData);
        setPackageTypes(typesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this safari package?")) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/package-safaris/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSafaris(safaris.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete safari package");
      }
    } catch (error) {
      console.error("Error deleting safari:", error);
      alert("Failed to delete safari package");
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredSafaris = safaris.filter(
    (safari) =>
      (safari.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        safari.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || safari.packageType.slug === filterType)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11A560]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Package Safaris</h1>
            <p className="text-gray-600 mt-1">Manage individual safaris within package types</p>
          </div>
          <Link
            href="/admin/packages/safaris/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors"
          >
            <Plus size={20} />
            Add Safari Package
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search safaris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
            >
              <option value="">All Package Types</option>
              {packageTypes.map((type) => (
                <option key={type.id} value={type.slug}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Safaris Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSafaris.map((safari) => (
            <div
              key={safari.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      safari.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {safari.published ? "Published" : "Draft"}
                  </span>
                  {safari.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#F5A623] text-white">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      safari.packageType.category === "THEMED"
                        ? "bg-[#D32F2F]/10 text-[#D32F2F]"
                        : "bg-[#11A560]/10 text-[#11A560]"
                    }`}
                  >
                    {safari.packageType.name}
                  </span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{safari.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {safari.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {safari.location}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-semibold text-[#11A560]">
                    {safari.priceFrom && "From "}
                    {safari.currency} {safari.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/packages/safaris/${safari.id}/edit`}
                      className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(safari.id)}
                      disabled={deleteLoading === safari.id}
                      className="p-2 text-gray-600 hover:text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSafaris.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No safari packages yet</p>
            <Link
              href="/admin/packages/safaris/new"
              className="text-[#11A560] hover:underline mt-2 inline-block"
            >
              Create your first safari package
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
