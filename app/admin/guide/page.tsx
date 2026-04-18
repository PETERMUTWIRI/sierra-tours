"use client";

import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPlane,
  FaGift,
  FaBox,
  FaNewspaper,
  FaHome,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

const sections = [
  {
    id: "overview",
    title: "How the Site Works",
    icon: FaHome,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "destinations",
    title: "Destinations",
    icon: FaMapMarkerAlt,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    id: "core-safaris",
    title: "Core Safaris",
    icon: FaPlane,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: "package-types",
    title: "Package Types",
    icon: FaGift,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "package-safaris",
    title: "Package Safaris",
    icon: FaBox,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    id: "blog",
    title: "Blog Posts",
    icon: FaNewspaper,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    id: "workflows",
    title: "Common Workflows",
    icon: FaCheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: FaExclamationTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Guide</h1>
        <p className="text-slate-400">
          Everything you need to know to manage the Sierra Tours website.
        </p>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center flex-shrink-0`}>
              <section.icon className={`w-5 h-5 ${section.color}`} />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              {section.title}
            </span>
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-10">
        {/* OVERVIEW */}
        <section id="overview" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FaHome className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">How the Site Works</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300">
              The website runs on <strong>two parallel content systems</strong>. Understanding the difference is the key to never losing a package.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                  <FaPlane /> Core Safaris
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  The original safari system. Each safari belongs directly to a destination.
                </p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Lives at <code className="text-amber-300">/safaris</code> and <code className="text-amber-300">/trips/[slug]</code></li>
                  <li>• Shown on destination pages</li>
                  <li>• Good for standard country-based tours</li>
                </ul>
              </div>

              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                  <FaBox /> Package Safaris
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  The flexible collection system. Each package belongs to a <strong>Package Type</strong> (category).
                </p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Lives at <code className="text-purple-300">/packages/[type]</code> and <code className="text-purple-300">/packages/[type]/[safari]</code></li>
                  <li>• Shown in mega menus, themed pages, and destination pages</li>
                  <li>• Good for beach packages, honeymoon specials, local getaways</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3 not-prose">
              <FaInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200">
                <strong>Good news:</strong> Both systems now appear together on the 
                <Link href="/safaris" className="underline">/safaris</Link> page and 
                destination pages. You can use whichever system fits your workflow best.
              </p>
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section id="destinations" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Destinations</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>
              Destinations are countries or regions (Kenya, Tanzania, Botswana, etc.). They are the 
              <strong> root of everything</strong> — both Core Safaris and Package Safaris can be linked to a destination.
            </p>

            <h3 className="text-white font-semibold mt-4">Where destinations appear:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>Navbar mega menu</strong> — "Destinations" dropdown is auto-populated from here.</li>
              <li><strong>/destinations</strong> — public listing page.</li>
              <li><strong>/destinations/[slug]</strong> — detail page showing all tours linked to this country.</li>
              <li><strong>Safari filters</strong> — destination chips on /safaris page.</li>
            </ul>

            <h3 className="text-white font-semibold mt-4">How to add a destination:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Go to <strong>Admin → Destinations</strong>. (Currently read-only; add via database or ask a dev.)</li>
              <li>Once added, it automatically appears in the navbar and filter chips.</li>
            </ol>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
              <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-200">
                <strong>Tip:</strong> When creating a Package Safari, selecting a destination is optional but recommended. 
                It makes the package appear on that destination&apos;s page and in destination filters.
              </p>
            </div>
          </div>
        </section>

        {/* CORE SAFARIS */}
        <section id="core-safaris" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <FaPlane className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Core Safaris</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>
              These are traditional safaris tied directly to a destination. Use this for standard multi-day tours.
            </p>

            <h3 className="text-white font-semibold mt-4">Where they appear:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><code className="text-amber-300">/safaris</code> — main safari listing</li>
              <li><code className="text-amber-300">/trips/[slug]</code> — individual detail page</li>
              <li><code className="text-amber-300">/destinations/[slug]</code> — on the destination page</li>
            </ul>

            <h3 className="text-white font-semibold mt-4">How to create one:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Click <strong>&quot;New Safari&quot;</strong> from the top bar (or go to <strong>Admin → Safaris → New</strong>).</li>
              <li>Fill in title, slug, destination, duration, price, excerpt, description, and image.</li>
              <li>Add itinerary days (Day 1, Day 2, etc.).</li>
              <li>Set <strong>Published = true</strong> when ready.</li>
              <li>Save. It will appear on /safaris and the destination page immediately.</li>
            </ol>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200">
                <strong>Remember:</strong> Core Safaris do <strong>not</strong> appear under Package Types or the 
                &quot;Packages&quot; section of the site. If you want a safari inside a themed collection (e.g. Honeymoon), 
                use <strong>Package Safaris</strong> instead.
              </p>
            </div>
          </div>
        </section>

        {/* PACKAGE TYPES */}
        <section id="package-types" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FaGift className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Package Types</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>
              Package Types are <strong>categories</strong> that appear in the navbar mega menus. Each type can hold many Package Safaris inside it.
            </p>

            <h3 className="text-white font-semibold mt-4">The three categories:</h3>
            <div className="grid md:grid-cols-3 gap-4 not-prose">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">THEMED</span>
                <h4 className="text-white font-semibold mt-1">Themed Holidays</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Appears in the <strong>&quot;Themed Holidays&quot;</strong> mega menu. Examples: Honeymoon, Valentine, Christmas, Luxury.
                </p>
              </div>
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">SAFARI</span>
                <h4 className="text-white font-semibold mt-1">Safari Experiences</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Appears in the <strong>&quot;Safaris&quot;</strong> mega menu. Examples: Beach Packages, Wildlife Safaris, Mountain Treks.
                </p>
              </div>
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-green-400">LOCAL</span>
                <h4 className="text-white font-semibold mt-1">Local Packages</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Appears in the <strong>&quot;Local Packages&quot;</strong> mega menu. Examples: Beach, Bush, Weekend Getaways.
                </p>
              </div>
            </div>

            <h3 className="text-white font-semibold mt-4">How to create a Package Type:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Go to <strong>Admin → Package Types</strong>.</li>
              <li>Click <strong>&quot;Add Package Type&quot;</strong>.</li>
              <li>Choose a <strong>Name</strong> (e.g. &quot;Beach Packages&quot;) and a URL-friendly <strong>Slug</strong> (e.g. <code>beach-packages</code>).</li>
              <li>Select the <strong>Category</strong> (THEMED, SAFARI, or LOCAL) — this decides which mega menu it appears in.</li>
              <li>Pick an <strong>Icon</strong> (optional) and upload an <strong>Image</strong> (optional).</li>
              <li>Set <strong>Published = true</strong>.</li>
              <li>Save. It will instantly appear in its respective mega menu and on <code className="text-purple-300">/packages/[slug]</code>.</li>
            </ol>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
              <FaInfoCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-200">
                <strong>URL rule:</strong> A Package Type with slug <code>beach-packages</code> will be accessible at 
                <code>/packages/beach-packages</code>. That page will list every Package Safari you add inside it.
              </p>
            </div>
          </div>
        </section>

        {/* PACKAGE SAFARIS */}
        <section id="package-safaris" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <FaBox className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Package Safaris</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>
              These are the actual tours that live <strong>inside</strong> a Package Type. A Package Type is the folder; Package Safaris are the files.
            </p>

            <h3 className="text-white font-semibold mt-4">Where they appear:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><code className="text-orange-300">/packages/[type-slug]</code> — inside their parent category page</li>
              <li><code className="text-orange-300">/packages/[type-slug]/[safari-slug]</code> — individual detail page</li>
              <li><code className="text-orange-300">/safaris</code> — mixed together with Core Safaris</li>
              <li><code className="text-orange-300">/destinations/[slug]</code> — if a destination is selected</li>
              <li><code className="text-orange-300">/packages</code> — overview page if featured</li>
            </ul>

            <h3 className="text-white font-semibold mt-4">How to create a Package Safari:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>
                First, make sure you have created the <strong>Package Type</strong> (the category) that this safari belongs to.
              </li>
              <li>Go to <strong>Admin → Package Safaris</strong>.</li>
              <li>Click <strong>&quot;Add Safari Package&quot;</strong>.</li>
              <li>
                <strong>Select Package Type</strong> — this is required. The safari will live inside this category.
              </li>
              <li>
                <strong>Select Destination</strong> — optional but highly recommended. Without it, the safari won&apos;t show up on destination pages or in destination filters.
              </li>
              <li>Fill in title, slug, duration, price, location, excerpt, description, and image.</li>
              <li>Add itinerary days if applicable.</li>
              <li>Set <strong>Published = true</strong> and <strong>Featured</strong> if you want it highlighted.</li>
              <li>Save.</li>
            </ol>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-200">
                <strong>Critical:</strong> If you create a Package Safari but the page is empty, check these three things:
                <br />1. Is the <strong>parent Package Type</strong> published?
                <br />2. Is the <strong>Package Safari</strong> itself published?
                <br />3. Did you select the <strong>correct Package Type</strong> in the form?
              </p>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <FaNewspaper className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Blog Posts</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p>
              Blog posts appear on the public <code className="text-cyan-300">/blog</code> page and can be linked from the homepage.
            </p>

            <h3 className="text-white font-semibold mt-4">How to publish a post:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Go to <strong>Admin → Blog Posts</strong>.</li>
              <li>Click <strong>&quot;New Post&quot;</strong>.</li>
              <li>Write your content using the rich text editor.</li>
              <li>Add a cover image, category, and excerpt.</li>
              <li>Set <strong>Published = true</strong> when ready to go live.</li>
              <li>Save.</li>
            </ol>
          </div>
        </section>

        {/* WORKFLOWS */}
        <section id="workflows" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <FaCheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Common Workflows</h2>
          </div>

          <div className="space-y-6">
            {/* Workflow 1 */}
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
                Adding a Beach Package
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-400">
                <li>Go to <strong>Admin → Package Types → Add Package Type</strong>.</li>
                <li>Name: <em>Beach Packages</em> | Slug: <code>beach-packages</code> | Category: <strong>SAFARI</strong> (or LOCAL).</li>
                <li>Publish it.</li>
                <li>Go to <strong>Admin → Package Safaris → Add Safari Package</strong>.</li>
                <li>Select <strong>Beach Packages</strong> as the Package Type.</li>
                <li>Select a destination (e.g. Kenya) if you want it on the Kenya destination page.</li>
                <li>Fill details, set Published = true, and save.</li>
                <li>It now appears in the Safaris mega menu → Beach Packages, and on /packages/beach-packages.</li>
              </ol>
            </div>

            {/* Workflow 2 */}
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">2</span>
                Adding a Standard Country Safari
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-400">
                <li>Go to <strong>Admin → Safaris → New Safari</strong>.</li>
                <li>Select the destination (e.g. Tanzania).</li>
                <li>Fill all fields and add itinerary days.</li>
                <li>Set Published = true and save.</li>
                <li>It appears on /safaris, /trips/[slug], and /destinations/tanzania.</li>
              </ol>
            </div>

            {/* Workflow 3 */}
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">3</span>
                Creating a Themed Collection (e.g. Honeymoon)
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-400">
                <li>Go to <strong>Admin → Package Types → Add Package Type</strong>.</li>
                <li>Name: <em>Honeymoon Safaris</em> | Slug: <code>honeymoon-safaris</code> | Category: <strong>THEMED</strong>.</li>
                <li>Publish it.</li>
                <li>Add multiple Package Safaris inside this type.</li>
                <li>They all appear under Themed Holidays → Honeymoon Safaris.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* TROUBLESHOOTING */}
        <section id="troubleshooting" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <FaExclamationTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Troubleshooting</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-2">&quot;I added a package but the page is empty&quot;</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Did you add a <strong>Package Safari</strong> inside the Package Type? A Package Type with no safaris shows &quot;No packages available yet.&quot;</li>
                <li>Is the Package Safari <strong>published</strong>?</li>
                <li>Is the parent Package Type <strong>published</strong>?</li>
                <li>Did you accidentally create a Core Safari instead of a Package Safari?</li>
              </ul>
            </div>

            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-2">&quot;My safari doesn&apos;t show on the destination page&quot;</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Core Safaris: destination is required. Check that you selected one.</li>
                <li>Package Safaris: destination is optional. If you didn&apos;t select one, it won&apos;t appear on destination pages.</li>
                <li>Make sure the safari status is <strong>published</strong>.</li>
              </ul>
            </div>

            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-2">&quot;The mega menu is blank / missing items&quot;</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>Mega menus are dynamic. Only <strong>published</strong> Package Types appear.</li>
                <li>Verify the category: THEMED → Themed Holidays menu, SAFARI → Safaris menu, LOCAL → Local Packages menu.</li>
                <li>Hard refresh the public site (Ctrl+Shift+R) if you just made changes.</li>
              </ul>
            </div>

            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
              <h3 className="text-white font-semibold mb-2">&quot;I can&apos;t edit a SAFARI category type&quot;</h3>
              <p className="text-sm text-slate-400">
                This was a bug that has been fixed. If you still see validation errors when saving a SAFARI type, 
                make sure your app is redeployed.
              </p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="flex items-center justify-center gap-4 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E8A50] text-white font-semibold rounded-xl hover:bg-[#0C7845] transition-all"
          >
            <FaArrowRight />
            Back to Dashboard
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all"
          >
            <FaExternalLinkAlt />
            View Live Site
          </Link>
        </div>
      </div>
    </div>
  );
}
