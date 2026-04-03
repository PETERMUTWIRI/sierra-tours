'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaHome, FaNewspaper, FaPlane, FaMapMarkerAlt, FaImages,
  FaSignOutAlt, FaBars, FaTimes, FaGlobeAfrica, FaChevronRight,
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
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();

        if (!session) {
          window.location.replace('/auth/sign-in');
          return;
        }

        setIsAuth(true);
        // @ts-ignore - Neon Auth types
        setUser(session?.data?.user || session?.user || {});
        setIsLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        window.location.replace('/auth/sign-in');
      }
    };

    checkAuth();
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLoading || !isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Desktop Sidebar - Always visible on lg+ */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800">
        <SidebarContent 
          user={user} 
          pathname={pathname} 
          onClose={() => setIsSidebarOpen(false)}
          mobile={false}
        />
      </aside>

      {/* Mobile Sidebar - Slide in from left */}
      <aside 
        className={`
          lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent 
          user={user} 
          pathname={pathname} 
          onClose={() => setIsSidebarOpen(false)}
          mobile={true}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top Header - Sticky */}
        <header className="h-16 lg:h-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 sticky top-0 z-30">
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <FaBars className="w-5 h-5" />
              </button>
              
              {/* Page Title */}
              <div>
                <h2 className="text-white font-semibold text-base lg:text-lg">
                  Admin Dashboard
                </h2>
                <p className="text-slate-400 text-xs hidden sm:block">
                  Manage your safari business
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link 
                href="/admin/blog/new" 
                className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-all shadow-lg shadow-orange-600/20"
              >
                <FaNewspaper className="w-4 h-4" />
                <span className="hidden lg:inline">New Post</span>
              </Link>
              <Link 
                href="/admin/safaris/new" 
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
              >
                <FaPlane className="w-4 h-4" />
                <span className="hidden lg:inline">New Safari</span>
                <span className="lg:hidden">New</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

// Sidebar Content Component
interface SidebarContentProps {
  user: any;
  pathname: string;
  onClose: () => void;
  mobile: boolean;
}

function SidebarContent({ user, pathname, onClose, mobile }: SidebarContentProps) {
  return (
    <>
      {/* Logo Header */}
      <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-base lg:text-lg tracking-tight">Sierra Tours</h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Admin Panel</p>
          </div>
        </Link>
        {mobile && (
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 lg:p-4 space-y-1">
        <p className="px-3 lg:px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </p>
        {adminNavLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`
                flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
              onClick={mobile ? onClose : undefined}
            >
              <link.icon className={`
                w-5 h-5 transition-colors flex-shrink-0
                ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
              `} />
              <span className="font-medium flex-1 text-sm lg:text-base">{link.name}</span>
              {isActive && <FaChevronRight className="w-4 h-4 text-white/70 flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="flex items-center gap-3 px-3 lg:px-4 py-2 mb-2">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user?.name?.[0] || user?.email?.[0] || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {user?.name || user?.email || 'Admin'}
            </p>
            <p className="text-slate-400 text-xs truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>
        <button
          onClick={async () => {
            await authClient.signOut();
            window.location.href = '/auth/sign-in';
          }}
          className="flex items-center gap-3 w-full px-3 lg:px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </>
  );
}
