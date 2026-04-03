'use client';

interface SEOPreviewProps {
  title: string;
  metaTitle: string;
  metaDesc: string;
  slug: string;
}

export default function SEOPreview({ title, metaTitle, metaDesc, slug }: SEOPreviewProps) {
  const displayTitle = metaTitle || title;
  const displayDesc = metaDesc || 'No meta description set';
  const displayUrl = `https://sierratours.com/blog/${slug}`;

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-400 mb-3">Google Search Preview</h3>
      <div className="bg-white rounded-lg p-4 max-w-2xl">
        <div className="text-sm text-[#202124] truncate" style={{ fontFamily: 'Arial, sans-serif' }}>
          {displayTitle.slice(0, 60)}{displayTitle.length > 60 ? '...' : ''}
        </div>
        <div className="text-xs text-[#006621] truncate mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
          {displayUrl}
        </div>
        <div className="text-sm text-[#545454] mt-1 line-clamp-2" style={{ fontFamily: 'Arial, sans-serif' }}>
          {displayDesc.slice(0, 160)}{displayDesc.length > 160 ? '...' : ''}
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500">
        <p>Title: {displayTitle.length}/60 characters</p>
        <p>Description: {displayDesc.length}/160 characters</p>
      </div>
    </div>
  );
}
