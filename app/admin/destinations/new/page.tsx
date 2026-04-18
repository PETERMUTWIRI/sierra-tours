"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";

export default function NewDestination() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    image: "",
    heroImage: "",
    bestTimeToVisit: "",
    currency: "USD",
    languages: "" as string,
    highlights: [] as string[],
    published: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const addHighlight = () => {
    setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === index ? value : h)),
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.tagline.trim()) newErrors.tagline = "Tagline is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    if (!formData.heroImage.trim()) newErrors.heroImage = "Hero image is required";
    if (!formData.bestTimeToVisit.trim()) newErrors.bestTimeToVisit = "Best time to visit is required";
    if (!formData.currency.trim()) newErrors.currency = "Currency is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        slug: generateSlug(formData.name),
        languages: formData.languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/destinations");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create destination");
      }
    } catch (error) {
      console.error("Error creating destination:", error);
      alert("Failed to create destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/destinations"
            className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">New Destination</h1>
            <p className="text-gray-600 mt-1">Add a new country or region</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Tanzania"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g., The Land of Serengeti"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-[#D32F2F]">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full description of the destination..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Time to Visit <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bestTimeToVisit}
                  onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                  placeholder="e.g., June to October"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.bestTimeToVisit && <p className="text-red-500 text-sm mt-1">{errors.bestTimeToVisit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="e.g., USD"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="e.g., English, Swahili, French"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple languages with commas</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Images</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ImageUpload
                  label="Card Image"
                  required
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
              <div>
                <ImageUpload
                  label="Hero Image"
                  required
                  value={formData.heroImage}
                  onChange={(url) => setFormData({ ...formData, heroImage: url })}
                />
                {errors.heroImage && <p className="text-red-500 text-sm mt-1">{errors.heroImage}</p>}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Highlights</h2>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#11A560] text-white rounded-lg hover:bg-[#0E8A50]"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Settings</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-[#11A560] rounded focus:ring-[#11A560]"
              />
              <span className="text-gray-700">Published (visible on website)</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Link
              href="/admin/destinations"
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#11A560] text-white font-semibold rounded-lg hover:bg-[#0E8A50] transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? "Creating..." : "Create Destination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
