"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Heart, Ship, Gift, Star, Palmtree, Trees, Calendar, Package } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";

interface PageProps {
  params: { id: string };
}

const iconOptions = [
  { value: "Heart", label: "Heart", Icon: Heart },
  { value: "Ship", label: "Ship", Icon: Ship },
  { value: "Gift", label: "Gift", Icon: Gift },
  { value: "Star", label: "Star", Icon: Star },
  { value: "Palmtree", label: "Palm Tree", Icon: Palmtree },
  { value: "Trees", label: "Trees", Icon: Trees },
  { value: "Calendar", label: "Calendar", Icon: Calendar },
  { value: "Package", label: "Package", Icon: Package },
];

export default function EditPackageType({ params }: PageProps) {
  const router = useRouter();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "THEMED" as "THEMED" | "LOCAL" | "SAFARI",
    icon: "Package",
    image: "",
    order: 0,
    published: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPackageType();
  }, []);

  const fetchPackageType = async () => {
    try {
      const response = await fetch(`/api/package-types/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description || "",
          category: data.category,
          icon: data.icon || "Package",
          image: data.image || "",
          order: data.order,
          published: data.published,
        });
      } else {
        alert("Failed to fetch package type");
        router.push("/admin/packages/types");
      }
    } catch (error) {
      console.error("Error fetching package type:", error);
      alert("Failed to fetch package type");
      router.push("/admin/packages/types");
    } finally {
      setFetching(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug must be lowercase alphanumeric with hyphens only";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/package-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/packages/types");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update package type");
      }
    } catch (error) {
      console.error("Error updating package type:", error);
      alert("Failed to update package type");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11A560]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/packages/types"
            className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Edit Package Type</h1>
            <p className="text-gray-600 mt-1">Update package type details</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-[#D32F2F]">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="THEMED"
                    checked={formData.category === "THEMED"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "THEMED" | "LOCAL" })}
                    className="w-4 h-4 text-[#11A560] focus:ring-[#11A560]"
                  />
                  <span>Themed Holiday</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="LOCAL"
                    checked={formData.category === "LOCAL"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "THEMED" | "LOCAL" })}
                    className="w-4 h-4 text-[#11A560] focus:ring-[#11A560]"
                  />
                  <span>Local Package</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Honeymoon Packages"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g., honeymoon"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent ${
                  errors.slug ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              <p className="text-sm text-gray-500 mt-1">Used in URL: /packages/{formData.slug}</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this package type..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="grid grid-cols-4 gap-3">
                {iconOptions.map(({ value, label, Icon }) => (
                  <label
                    key={value}
                    className={`flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.icon === value
                        ? "border-[#11A560] bg-[#11A560]/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="icon"
                      value={value}
                      checked={formData.icon === value}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="sr-only"
                    />
                    <Icon className={`w-6 h-6 ${formData.icon === value ? "text-[#11A560]" : "text-gray-500"}`} />
                    <span className={`text-xs ${formData.icon === value ? "text-[#11A560] font-medium" : "text-gray-500"}`}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <ImageUpload
                label="Cover Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
              <p className="text-sm text-gray-500 mt-1">Upload a cover image for this package type</p>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
            </div>

            {/* Published */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-[#11A560] rounded focus:ring-[#11A560]"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Published (visible on website)
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/admin/packages/types"
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
