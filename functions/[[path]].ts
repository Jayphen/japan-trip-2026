// Cloudflare Pages Function for SvelteKit
// This enables SSR for all non-static routes

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  
  // Skip static assets - let Cloudflare handle them
  if (url.pathname.startsWith('/_app') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.txt') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.woff') ||
      url.pathname.endsWith('.woff2')) {
    return next();
  }
  
  // For all other routes, return the SvelteKit SSR response
  return next();
}
