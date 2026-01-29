import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ status, event }) => {
  // Skip errors from Convex during prerender (expected behavior)
  const path = event.url.pathname;
  if (status === 500 && (path?.includes('/stats') || path?.includes('/spending'))) {
    return {
      message: 'Convex prerender error ignored'
    };
  }
};
