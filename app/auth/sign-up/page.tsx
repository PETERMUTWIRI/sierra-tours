'use client';

import '@neondatabase/auth/ui/css';
import { AuthView, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
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
              <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <div className="text-left">
                <p className="text-xl text-white font-bold">Sierra Tours</p>
                <p className="text-xs text-slate-400">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Auth Form - Dark Theme */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h1>

            <div className="neon-auth-dark">
              <AuthView path="sign-up" />
            </div>

            <p className="text-center mt-6 text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/auth/sign-in" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Override Neon Auth UI styles for dark theme */
        .neon-auth-dark {
          --neon-auth-bg: transparent;
          --neon-auth-input-bg: rgb(30 41 59);
          --neon-auth-input-border: rgb(51 65 85);
          --neon-auth-input-text: white;
          --neon-auth-label-text: rgb(148 163 184);
          --neon-auth-button-bg: rgb(234 88 12);
          --neon-auth-button-text: white;
        }
        
        .neon-auth-dark input,
        .neon-auth-dark [data-testid="email-input"],
        .neon-auth-dark [data-testid="password-input"] {
          background-color: rgb(30 41 59) !important;
          border-color: rgb(51 65 85) !important;
          color: white !important;
        }
        
        .neon-auth-dark input::placeholder {
          color: rgb(100 116 139) !important;
        }
        
        .neon-auth-dark label {
          color: rgb(148 163 184) !important;
        }
        
        .neon-auth-dark button[type="submit"] {
          background-color: rgb(234 88 12) !important;
          color: white !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
        }
        
        .neon-auth-dark button[type="submit"]:hover {
          background-color: rgb(194 65 12) !important;
        }
      `}</style>
    </NeonAuthUIProvider>
  );
}
