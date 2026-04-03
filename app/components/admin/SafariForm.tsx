'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaSave, FaImage, FaSpinner, FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';

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

export default function SafariForm({ safari, onSubmit }: SafariFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(safari?.itinerary || []);
  
  const [formData, setFormData] = useState<Safari>({
    title: '',
    destinationId: '',
    duration: '',
    price: 0,
    currency: 'USD',
    excerpt: '',
    description: '',
    image: '',
    groupSize: '',
    accommodation: '',
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
      uploadFormData.append('image', file);

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
    }]);
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    // Renumber days
    setItinerary(newItinerary.map((day, i) => ({ ...day, day: i + 1 })));
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: string) => {
    setItinerary(itinerary.map((day, i) => 
      i === index ? { ...day, [field]: value } : day
    ));
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
              placeholder="Enter safari title"
              required
            />
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
              rows={2}
              placeholder="Brief summary for listings"
              required
            />
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
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

          {/* Itinerary Builder */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaCalendarAlt />
                Itinerary
              </h3>
              <button
                type="button"
                onClick={addItineraryDay}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <FaPlus />
                Add Day
              </button>
            </div>

            <div className="space-y-4">
              {itinerary.map((day, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-orange-500 font-semibold">Day {day.day}</span>
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white mb-3 focus:ring-2 focus:ring-orange-500"
                    placeholder="Day title (e.g., Arrival in Nairobi)"
                    required
                  />
                  <textarea
                    value={day.description}
                    onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                    rows={2}
                    placeholder="Day description"
                    required
                  />
                </div>
              ))}
              {itinerary.length === 0 && (
                <p className="text-slate-400 text-center py-4">No itinerary days added yet.</p>
              )}
            </div>
          </div>

          {/* Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Includes */}
            <ArrayInput
              label="Includes"
              items={formData.includes}
              onAdd={(v) => addArrayItem('includes', v)}
              onRemove={(i) => removeArrayItem('includes', i)}
              placeholder="Add included item"
            />

            {/* Excludes */}
            <ArrayInput
              label="Excludes"
              items={formData.excludes}
              onAdd={(v) => addArrayItem('excludes', v)}
              onRemove={(i) => removeArrayItem('excludes', i)}
              placeholder="Add excluded item"
            />

            {/* Highlights */}
            <ArrayInput
              label="Highlights"
              items={formData.highlights}
              onAdd={(v) => addArrayItem('highlights', v)}
              onRemove={(i) => removeArrayItem('highlights', i)}
              placeholder="Add highlight"
            />

            {/* Activities */}
            <ArrayInput
              label="Activities"
              items={formData.activities}
              onAdd={(v) => addArrayItem('activities', v)}
              onRemove={(i) => removeArrayItem('activities', i)}
              placeholder="Add activity"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Publish</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-slate-300">Publish immediately</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-slate-300">Featured safari</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {safari ? 'Update Safari' : 'Create Safari'}
            </button>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Featured Image</h3>
            
            {formData.image ? (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img src={formData.image} alt="Featured" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <FaImage className="w-12 h-12 text-slate-600" />
              </div>
            )}

            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-600 file:text-white hover:file:bg-orange-700"
              />
            </label>
            {uploading && <p className="mt-2 text-sm text-slate-400">Uploading...</p>}
          </div>

          {/* Safari Details */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Destination</label>
              <select
                value={formData.destinationId}
                onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>{dest.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., 7 Days / 6 Nights"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="KES">KES</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Group Size</label>
              <input
                type="text"
                value={formData.groupSize}
                onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., 2-6 people"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Accommodation</label>
              <input
                type="text"
                value={formData.accommodation}
                onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Luxury lodges"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

interface ArrayInputProps {
  label: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

function ArrayInput({ label, items, onAdd, onRemove, placeholder }: ArrayInputProps) {
  const [value, setValue] = useState('');

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{label}</h3>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
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
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg">
            <span className="text-slate-300 text-sm">{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-slate-400 hover:text-red-400"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
