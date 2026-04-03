'use client';

import '@neondatabase/auth/ui/css';
import { AuthView, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <NeonAuthUIProvider
      authClient={authClient as any}
      redirectTo="/admin"
    >
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <div className="text-left">
                <p className="text-xl text-white font-bold">Sierra Tours</p>
                <p className="text-xs text-slate-400">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign In</h1>

            <AuthView path="sign-in" />

            <p className="text-center mt-6 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/sign-up" className="text-orange-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
