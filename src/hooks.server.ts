import type { HandleHttpError } from '@sveltejs/kit';

export const handleHttpError: HandleHttpError = ({ status, path, error }) => {
  // Skip errors from Convex during prerender (expected behavior)
  if (status === 500 && path?.includes('/stats') || path?.includes('/spending')) {
    return 'warn';
  }
  return undefined;
};
