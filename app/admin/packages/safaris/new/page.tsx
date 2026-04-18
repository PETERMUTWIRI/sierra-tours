"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from "lucide-react";
import ImageUpload from "@/app/components/admin/ImageUpload";

interface PackageType {
  id: string;
  name: string;
  category: string;
}

interface Destination {
  id: string;
  name: string;
}

interface CoreSafari {
  id: string;
  title: string;
  slug: string;
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
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation: string;
    meals: string[];
    activities: string[];
  }[];
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation: string;
  meals: string[];
  activities: string[];
}

export default function NewPackageSafari() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [coreSafaris, setCoreSafaris] = useState<CoreSafari[]>([]);
  const [selectedCoreSafariId, setSelectedCoreSafariId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    packageTypeId: "",
    destinationId: "",
    duration: "",
    price: 0,
    priceFrom: true,
    currency: "USD",
    excerpt: "",
    description: "",
    location: "",
    image: "",
    groupSize: "",
    accommodation: "",
    published: true,
    featured: false,
    order: 0,
    highlights: [] as string[],
    includes: [] as string[],
    excludes: [] as string[],
    itinerary: [] as ItineraryDay[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPackageTypes();
    fetchDestinations();
    fetchCoreSafaris();
  }, []);

  const fetchPackageTypes = async () => {
    try {
      const response = await fetch("/api/package-types");
      if (response.ok) {
        const data = await response.json();
        setPackageTypes(data.filter((pt: PackageType) => pt.category));
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, packageTypeId: data[0].id }));
        }
      }
    } catch (error) {
      console.error("Error fetching package types:", error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const fetchCoreSafaris = async () => {
    try {
      const response = await fetch("/api/safaris?published=true");
      if (response.ok) {
        const data = await response.json();
        setCoreSafaris(data);
      }
    } catch (error) {
      console.error("Error fetching core safaris:", error);
    }
  };

  const handleCoreSafariSelect = async (safariId: string) => {
    setSelectedCoreSafariId(safariId);
    if (!safariId) return;

    try {
      const response = await fetch(`/api/safaris/${safariId}`);
      if (!response.ok) return;

      const safari: CoreSafari = await response.json();
      const dest = destinations.find((d) => d.id === safari.destinationId);

      setFormData((prev) => ({
        ...prev,
        title: safari.title || "",
        slug: safari.slug || "",
        destinationId: safari.destinationId || "",
        duration: safari.duration || "",
        price: safari.price || 0,
        currency: safari.currency || "USD",
        excerpt: safari.excerpt || "",
        description: safari.description || "",
        location: dest?.name || "",
        image: safari.image?.startsWith("http") ? safari.image : "",
        groupSize: safari.groupSize || "",
        accommodation: safari.accommodation || "",
        highlights: [
          ...(safari.highlights || []),
          ...(safari.activities || []),
        ],
        includes: safari.includes || [],
        excludes: safari.excludes || [],
        itinerary: (safari.itinerary || []).map((day) => ({
          day: day.day,
          title: day.title || "",
          description: day.description || "",
          accommodation: day.accommodation || "",
          meals: day.meals || [],
          activities: day.activities || [],
        })),
      }));
    } catch (error) {
      console.error("Error loading core safari:", error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addItineraryDay = () => {
    const newDay: ItineraryDay = {
      day: formData.itinerary.length + 1,
      title: "",
      description: "",
      accommodation: "",
      meals: [],
      activities: [],
    };
    setFormData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, newDay],
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 })),
    }));
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === index ? { ...day, [field]: value } : day
      ),
    }));
  };

  const addListItem = (field: "highlights" | "includes" | "excludes") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateListItem = (field: "highlights" | "includes" | "excludes", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeListItem = (field: "highlights" | "includes" | "excludes", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.packageTypeId) newErrors.packageTypeId = "Package type is required";
    if (!formData.destinationId) newErrors.destinationId = "Destination is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/package-safaris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/packages/safaris");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create safari package");
      }
    } catch (error) {
      console.error("Error creating safari:", error);
      alert("Failed to create safari package");
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
            href="/admin/packages/safaris"
            className="p-2 text-gray-600 hover:text-[#11A560] hover:bg-[#11A560]/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">New Safari Package</h1>
            <p className="text-gray-600 mt-1">Create a new safari within a package type</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Clone from Existing Safari */}
          <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-6">
            <h2 className="text-lg font-semibold text-amber-800 mb-2">Create from Existing Safari</h2>
            <p className="text-sm text-amber-700 mb-4">
              Select a core safari to auto-fill all fields below. You can still edit everything before saving.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Safari
                </label>
                <select
                  value={selectedCoreSafariId}
                  onChange={(e) => handleCoreSafariSelect(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="">-- Start fresh (no auto-fill) --</option>
                  {coreSafaris.map((safari) => (
                    <option key={safari.id} value={safari.id}>
                      {safari.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Type <span className="text-[#D32F2F]">*</span>
                </label>
                <select
                  value={formData.packageTypeId}
                  onChange={(e) => setFormData({ ...formData, packageTypeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                >
                  <option value="">Select a package type</option>
                  {packageTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.packageTypeId && <p className="text-red-500 text-sm mt-1">{errors.packageTypeId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination <span className="text-[#D32F2F]">*</span>
                </label>
                <select
                  value={formData.destinationId}
                  onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Romantic Mara Retreat"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., romantic-mara-retreat"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 5 Days / 4 Nights"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Maasai Mara, Kenya"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                <input
                  type="text"
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  placeholder="e.g., 2-6 people"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type</label>
                <input
                  type="text"
                  value={formData.accommodation}
                  onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                  placeholder="e.g., Luxury Tented Camp"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="KES">KES</option>
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.priceFrom}
                    onChange={(e) => setFormData({ ...formData, priceFrom: e.target.checked })}
                    className="w-5 h-5 text-[#11A560] rounded focus:ring-[#11A560]"
                  />
                  <span className="text-sm font-medium text-gray-700">Show as &quot;From&quot; price</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Images</h2>
            <ImageUpload
              label="Main Image"
              required
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt (Short Description) <span className="text-[#D32F2F]">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary for listings..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description <span className="text-[#D32F2F]">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the safari..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Highlights</h2>
              <button
                type="button"
                onClick={() => addListItem("highlights")}
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
                    onChange={(e) => updateListItem("highlights", index, e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem("highlights", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">What's Included</h2>
              <button
                type="button"
                onClick={() => addListItem("includes")}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#11A560] text-white rounded-lg hover:bg-[#0E8A50]"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.includes.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem("includes", index, e.target.value)}
                    placeholder={`Include ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem("includes", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Excludes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">What's Excluded</h2>
              <button
                type="button"
                onClick={() => addListItem("excludes")}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#11A560] text-white rounded-lg hover:bg-[#0E8A50]"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.excludes.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem("excludes", index, e.target.value)}
                    placeholder={`Exclude ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem("excludes", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Itinerary</h2>
              <button
                type="button"
                onClick={addItineraryDay}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#11A560] text-white rounded-lg hover:bg-[#0E8A50]"
              >
                <Plus size={16} />
                Add Day
              </button>
            </div>
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="text-gray-400" size={20} />
                      <span className="font-semibold text-[#1A1A1A]">Day {day.day}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, "title", e.target.value)}
                      placeholder="Day title (e.g., Arrival in Nairobi)"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                    />
                    <textarea
                      value={day.description}
                      onChange={(e) => updateItineraryDay(index, "description", e.target.value)}
                      placeholder="Day description..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                    />
                    <input
                      type="text"
                      value={day.accommodation}
                      onChange={(e) => updateItineraryDay(index, "accommodation", e.target.value)}
                      placeholder="Accommodation (e.g., Mara Serena Lodge)"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11A560]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Settings</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 text-[#11A560] rounded focus:ring-[#11A560]"
                />
                <span className="text-gray-700">Published</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-[#11A560] rounded focus:ring-[#11A560]"
                />
                <span className="text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Link
              href="/admin/packages/safaris"
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
              {loading ? "Creating..." : "Create Safari Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
