'use client';

import '@neondatabase/auth/ui/css';
import { SignUpForm, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function SignUpPage() {
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
              <div className="w-14 h-14 rounded-xl bg-[#0E8A50] flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <div className="text-left">
                <p className="text-xl text-white font-bold">Sierra Tours</p>
                <p className="text-xs text-slate-400">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Sign Up Form */}
          <div className="auth-form-wrapper">
            <SignUpForm localization={{}} />
          </div>

          <style>{`
            .auth-form-wrapper input,
            .auth-form-wrapper input:focus {
              color: white !important;
            }
            .auth-form-wrapper input::placeholder {
              color: rgb(203, 213, 225) !important;
            }
          `}</style>

          <p className="text-center mt-6 text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-[#11A560] font-semibold hover:text-[#B3CE4D] transition-colors">
              Sign in
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
