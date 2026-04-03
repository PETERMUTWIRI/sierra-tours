'use client';

import '@neondatabase/auth/ui/css';
import { SignInForm, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
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

          {/* Sign In Form - Just the form, no extra wrapper */}
          <SignInForm localization={{}} />

          <p className="text-center mt-6 text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors">
              Sign up
            </Link>
          </p>

          <div className="text-center mt-6">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
