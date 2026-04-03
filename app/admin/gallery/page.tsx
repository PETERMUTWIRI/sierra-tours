'use client';

import { useState } from 'react';
import { FaImages, FaUpload } from 'react-icons/fa';

export default function GalleryManagement() {
  const [uploading, setUploading] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
        <FaImages className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Gallery Management</h2>
        <p className="text-slate-400 mb-6">
          Gallery images are managed through each safari or destination.
          <br />
          Navigate to a specific safari or destination to manage its gallery.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/admin/safaris"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E8A50] text-white rounded-lg hover:bg-[#11A560]"
          >
            Manage Safaris
          </a>
          <a
            href="/admin/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
          >
            Manage Destinations
          </a>
        </div>
      </div>
    </div>
  );
}
