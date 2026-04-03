'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  FaSave, FaImage, FaSpinner, FaPlus, FaTrash, FaCalendarAlt,
  FaUtensils, FaBed, FaMapMarkerAlt, FaUsers, FaClock, FaStar,
  FaCheckCircle, FaTimesCircle, FaLightbulb, FaHiking, FaDollarSign
} from 'react-icons/fa';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface Destination {
  id: string;
  name: string;
}

interface ItineraryDay {
  id?: string;
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
}

interface Safari {
  id?: string;
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
  itinerary: ItineraryDay[];
}

interface SafariFormProps {
  safari?: Partial<Safari>;
  onSubmit: (data: Safari) => Promise<void>;
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
};

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'None'];

export default function SafariForm({ safari, onSubmit }: SafariFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'itinerary' | 'inclusions'>('details');
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    safari?.itinerary?.map((d: any) => ({
      day: d.day,
      title: d.title,
      description: d.description,
      meals: d.meals || ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: d.accommodation || ''
    })) || []
  );
  
  const [formData, setFormData] = useState<Safari>({
    title: '',
    destinationId: '',
    duration: '',
    price: 0,
    currency: 'USD',
    excerpt: '',
    description: '',
    image: '',
    groupSize: '2-12 people',
    accommodation: 'Comfortable lodges and camps',
    activities: [],
    includes: [],
    excludes: [],
    highlights: [],
    published: false,
    featured: false,
    itinerary: [],
    ...safari,
  });

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ ...formData, itinerary });
      router.push('/admin/safaris');
    } catch (error) {
      console.error('Error saving safari:', error);
      alert('Failed to save safari');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, {
      day: itinerary.length + 1,
      title: '',
      description: '',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: '',
    }]);
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary.map((day, i) => ({ ...day, day: i + 1 })));
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    setItinerary(itinerary.map((day, i) => 
      i === index ? { ...day, [field]: value } : day
    ));
  };

  const toggleMeal = (dayIndex: number, meal: string) => {
    const day = itinerary[dayIndex];
    const meals = day.meals.includes(meal)
      ? day.meals.filter(m => m !== meal)
      : [...day.meals, meal];
    updateItineraryDay(dayIndex, 'meals', meals);
  };

  const addArrayItem = (field: keyof Safari, value: string) => {
    if (!value.trim()) return;
    const current = formData[field] as string[];
    setFormData({ ...formData, [field]: [...current, value.trim()] });
  };

  const removeArrayItem = (field: keyof Safari, index: number) => {
    const current = formData[field] as string[];
    setFormData({ ...formData, [field]: current.filter((_, i) => i !== index) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-1">
        <div className="flex gap-1">
          {[
            { id: 'details', label: 'Safari Details', icon: FaMapMarkerAlt },
            { id: 'itinerary', label: 'Daily Itinerary', icon: FaCalendarAlt },
            { id: 'inclusions', label: 'Inclusions & Highlights', icon: FaCheckCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0E8A50] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#11A560]" />
                  Basic Information
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Safari Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560] focus:border-[#11A560] transition-all"
                    placeholder="e.g., 7-Day Kenya Safari Adventure"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Short Excerpt <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560] focus:border-[#11A560] transition-all"
                    rows={2}
                    placeholder="Brief summary for safari listings (150-200 characters)"
                    required
                  />
                  <p className="mt-1 text-xs text-slate-500">This appears in safari cards and search results</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Description <span className="text-red-400">*</span>
                  </label>
                  <div className="prose prose-invert max-w-none">
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(content) => setFormData({ ...formData, description: content })}
                      modules={quillModules}
                      className="bg-slate-800 border border-slate-700 rounded-lg"
                      style={{ minHeight: '300px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Logistics */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaDollarSign className="text-[#11A560]" />
                  Pricing & Logistics
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                    placeholder="e.g., 7 Days / 6 Nights"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Group Size
                  </label>
                  <input
                    type="text"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                    placeholder="e.g., 2-12 people"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Accommodation Type
                  </label>
                  <input
                    type="text"
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                    placeholder="e.g., Luxury lodges and tented camps"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Card */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white">Publishing</h3>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-600 text-[#0E8A50] focus:ring-[#11A560]"
                  />
                  <div>
                    <span className="text-white font-medium block">Published</span>
                    <span className="text-slate-400 text-sm">Visible on website</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-600 text-[#0E8A50] focus:ring-[#11A560]"
                  />
                  <div>
                    <span className="text-white font-medium block flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      Featured Safari
                    </span>
                    <span className="text-slate-400 text-sm">Highlight on homepage</span>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0E8A50] to-[#0C7845] text-white font-semibold rounded-lg hover:from-[#E8F5EE]0 hover:to-[#0E8A50] disabled:opacity-50 transition-all shadow-lg shadow-[#11A560]/20"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {safari ? 'Update Safari' : 'Create Safari'}
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white">Featured Image</h3>
              </div>
              <div className="p-6">
                {formData.image ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border border-slate-700">
                    <img src={formData.image} alt="Featured" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-800 rounded-lg flex flex-col items-center justify-center mb-4 border-2 border-dashed border-slate-700">
                    <FaImage className="w-12 h-12 text-slate-600 mb-2" />
                    <span className="text-slate-500 text-sm">No image selected</span>
                  </div>
                )}

                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0E8A50] file:text-white hover:file:bg-[#0C7845] file:cursor-pointer file:transition-colors"
                  />
                </label>
                {uploading && <p className="mt-2 text-sm text-slate-400 flex items-center gap-2"><FaSpinner className="animate-spin" /> Uploading...</p>}
              </div>
            </div>

            {/* Quick Details */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white">Quick Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Destination <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.destinationId}
                    onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Price <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="KES">KES (KSh)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary Tab */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaCalendarAlt className="text-[#11A560]" />
                Daily Itinerary
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm">{itinerary.length} days configured</span>
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all"
                >
                  <FaPlus />
                  Add Day
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {itinerary.map((day, index) => (
                <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  {/* Day Header */}
                  <div className="px-4 py-3 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#0E8A50] text-white flex items-center justify-center font-bold">
                        {day.day}
                      </span>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                        className="bg-transparent text-white font-semibold text-lg border-b border-slate-600 focus:border-[#11A560] outline-none px-1"
                        placeholder="Day title"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Day Content */}
                  <div className="p-4 space-y-4">
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Day Description
                      </label>
                      <textarea
                        value={day.description}
                        onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                        rows={3}
                        placeholder="Describe the activities for this day..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Meals */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                          <FaUtensils />
                          Meals Included
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {MEAL_OPTIONS.filter(m => m !== 'None').map((meal) => (
                            <button
                              key={meal}
                              type="button"
                              onClick={() => toggleMeal(index, meal)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                day.meals.includes(meal)
                                  ? 'bg-green-600 text-white'
                                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                              }`}
                            >
                              {meal}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Accommodation */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                          <FaBed />
                          Accommodation
                        </label>
                        <input
                          type="text"
                          value={day.accommodation}
                          onChange={(e) => updateItineraryDay(index, 'accommodation', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
                          placeholder="e.g., Mara Serena Lodge"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {itinerary.length === 0 && (
                <div className="text-center py-12 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700">
                  <FaCalendarAlt className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">No itinerary days added yet</p>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus />
                    Add First Day
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0E8A50] to-[#0C7845] text-white font-semibold rounded-lg hover:from-[#E8F5EE]0 hover:to-[#0E8A50] disabled:opacity-50 transition-all shadow-lg shadow-[#11A560]/20"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {safari ? 'Update Safari' : 'Create Safari'}
            </button>
          </div>
        </div>
      )}

      {/* Inclusions Tab */}
      {activeTab === 'inclusions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Includes */}
          <ArrayInput
            label="What's Included"
            icon={FaCheckCircle}
            items={formData.includes}
            onAdd={(v) => addArrayItem('includes', v)}
            onRemove={(i) => removeArrayItem('includes', i)}
            placeholder="Add included item (e.g., All accommodation)"
            color="green"
          />

          {/* Excludes */}
          <ArrayInput
            label="What's Excluded"
            icon={FaTimesCircle}
            items={formData.excludes}
            onAdd={(v) => addArrayItem('excludes', v)}
            onRemove={(i) => removeArrayItem('excludes', i)}
            placeholder="Add excluded item (e.g., International flights)"
            color="red"
          />

          {/* Highlights */}
          <ArrayInput
            label="Safari Highlights"
            icon={FaLightbulb}
            items={formData.highlights}
            onAdd={(v) => addArrayItem('highlights', v)}
            onRemove={(i) => removeArrayItem('highlights', i)}
            placeholder="Add highlight (e.g., Big Five Viewing)"
            color="yellow"
          />

          {/* Activities */}
          <ArrayInput
            label="Available Activities"
            icon={FaHiking}
            items={formData.activities}
            onAdd={(v) => addArrayItem('activities', v)}
            onRemove={(i) => removeArrayItem('activities', i)}
            placeholder="Add activity (e.g., Game Drives)"
            color="blue"
          />

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0E8A50] to-[#0C7845] text-white font-semibold rounded-lg hover:from-[#E8F5EE]0 hover:to-[#0E8A50] disabled:opacity-50 transition-all shadow-lg shadow-[#11A560]/20"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {safari ? 'Update Safari' : 'Create Safari'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

interface ArrayInputProps {
  label: string;
  icon: any;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  color: 'green' | 'red' | 'yellow' | 'blue';
}

function ArrayInput({ label, icon: Icon, items, onAdd, onRemove, placeholder, color }: ArrayInputProps) {
  const [value, setValue] = useState('');

  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-500 text-green-400',
    red: 'bg-red-600 hover:bg-red-500 text-red-400',
    yellow: 'bg-yellow-600 hover:bg-yellow-500 text-yellow-400',
    blue: 'bg-blue-600 hover:bg-blue-500 text-blue-400',
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Icon className={colorClasses[color].split(' ')[2]} />
          {label}
        </h3>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#11A560]"
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAdd(value);
                setValue('');
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              onAdd(value);
              setValue('');
            }}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}
          >
            <FaPlus />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-500 text-center py-4 text-sm">No items added yet</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-lg group hover:bg-slate-750 transition-colors">
                <span className="text-slate-300">{item}</span>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
