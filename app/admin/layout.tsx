'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaHome, FaNewspaper, FaPlane, FaMapMarkerAlt, FaImages,
  FaSignOutAlt, FaBars, FaTimes, FaGlobeAfrica, FaCalendarAlt,
} from 'react-icons/fa';

const adminNavLinks = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'Blog Posts', href: '/admin/blog', icon: FaNewspaper },
  { name: 'Safaris', href: '/admin/safaris', icon: FaPlane },
  { name: 'Destinations', href: '/admin/destinations', icon: FaMapMarkerAlt },
  { name: 'Gallery', href: '/admin/gallery', icon: FaImages },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();

        if (!session) {
          // Not authenticated - redirect immediately
          window.location.replace('/auth/sign-in');
          return;
        }

        // Authenticated
        setIsAuth(true);
        // @ts-ignore
        setUser(session.data?.user || session.user);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        window.location.replace('/auth/sign-in');
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking
  if (isLoading || !isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" />
          <p className="text-slate-400">{isLoading ? 'Checking authentication...' : 'Redirecting...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Sierra Tours</h1>
              <p className="text-slate-400 text-xs">Admin</p>
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavLinks.map((link) => (
            <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={async () => {
              await authClient.signOut();
              window.location.href = '/auth/sign-in';
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <FaBars />
              </button>
              <h2 className="text-white font-semibold hidden sm:block">Admin Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/admin/blog/new" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-semibold">
                <FaNewspaper className="w-4 h-4" />
                New Post
              </Link>
              <Link href="/admin/safaris/new" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">
                <FaPlane className="w-4 h-4" />
                New Safari
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.[0] || user?.email?.[0] || 'A'}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
