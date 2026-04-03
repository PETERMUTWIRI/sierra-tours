'use client';

import { createAuthClient } from '@neondatabase/auth/next';

// ==========================================
// NEON AUTH CLIENT
// Reads NEXT_PUBLIC_NEON_AUTH_URL from environment automatically
// ==========================================

export const authClient = createAuthClient();

// Debug: Log auth URL (will show in browser console)
if (typeof window !== 'undefined') {
  console.log('Auth client initialized');
}
