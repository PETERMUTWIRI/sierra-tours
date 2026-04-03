import { authApiHandler } from '@neondatabase/auth/next/server';

// ==========================================
// NEON AUTH API HANDLER
// Handles all auth endpoints: /api/auth/sign-in, /api/auth/sign-up, etc.
// ==========================================

export const { GET, POST } = authApiHandler();
