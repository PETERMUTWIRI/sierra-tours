"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, Edit2, Trash2, Search, Package, 
  Heart, Ship, Gift, Star, Palmtree, Trees, Calendar 
} from "lucide-react";

interface PackageType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: "THEMED" | "LOCAL" | "SAFARI";
  icon: string | null;
  order: number;
  published: boolean;
  _count: {
    safaris: number;
  };
}

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Ship,
  Gift,
  Star,
  Palmtree,
  Trees,
  Calendar,
  Package,
};

export default function PackageTypesAdmin() {
  const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPackageTypes();
  }, []);

  const fetchPackageTypes = async () => {
    try {
      const response = await fetch("/api/package-types");
      if (response.ok) {
        const data = await response.json();
        setPackageTypes(data);
      }
    } catch (error) {
      console.error("Error fetching package types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package type? All safaris within it will also be deleted.")) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/package-types/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPackageTypes(packageTypes.filter((pt) => pt.id !== id));
      } else {
        alert("Failed to delete package type");
      }
    } catch (error) {
      console.error("Error deleting package type:", error);
      alert("Failed to delete package type");
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredTypes = packageTypes.filter(
    (pt) =>
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themedTypes = filteredTypes.filter((pt) => pt.category === "THEMED");
  const safariTypes = filteredTypes.filter((pt) => pt.category === "SAFARI");
  const localTypes = filteredTypes.filter((pt) => pt.category === "LOCAL");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11A560]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Package Types</h1>
            <p className="text-gray-600 mt-1">Manage themed holidays, safari experiences, and local packages</p>
          </div>
          <Link
            href="/admin/packages/types/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors"
          >
            <Plus size={20} />
            Add Package Type
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search package types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
            />
          </div>
        </div>

        {/* Themed Holidays Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#D32F2F] rounded-full"></span>
            Themed Holidays
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themedTypes.map((type) => {
              const IconComponent = type.icon ? iconMap[type.icon] || Package : Package;
              return (
                <div
                  key={type.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#11A560]/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#11A560]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          type.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {type.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] text-lg mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">/{type.slug}</p>
                  {type.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{type.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {type._count.safaris} safari{type._count.safaris !== 1 ? "s" : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/packages/types/${type.id}/edit`}
                        className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(type.id)}
                        disabled={deleteLoading === type.id}
                        className="p-2 text-gray-600 hover:text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {themedTypes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No themed holiday packages yet</p>
              <Link
                href="/admin/packages/types/new"
                className="text-[#11A560] hover:underline mt-2 inline-block"
              >
                Create your first themed package
              </Link>
            </div>
          )}
        </div>

        {/* Local Packages Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#11A560] rounded-full"></span>
            Local Packages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localTypes.map((type) => {
              const IconComponent = type.icon ? iconMap[type.icon] || Package : Package;
              return (
                <div
                  key={type.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#11A560]/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#11A560]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          type.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {type.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] text-lg mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">/{type.slug}</p>
                  {type.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{type.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {type._count.safaris} safari{type._count.safaris !== 1 ? "s" : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/packages/types/${type.id}/edit`}
                        className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(type.id)}
                        disabled={deleteLoading === type.id}
                        className="p-2 text-gray-600 hover:text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {localTypes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No local packages yet</p>
              <Link
                href="/admin/packages/types/new"
                className="text-[#11A560] hover:underline mt-2 inline-block"
              >
                Create your first local package
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
