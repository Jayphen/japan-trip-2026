# Claude Context

Project context for AI assistants working on this codebase.

## Overview

Japan Trip 2026 companion app - a SvelteKit 5 app with Convex backend, deployed to Cloudflare Pages.

**Live site**: https://japan.jayphen.com/

## Tech Stack

- **SvelteKit 5** with Svelte 5 runes (`$state`, `$derived`, `$effect`)
- **Tailwind CSS** for styling
- **Convex** for real-time database
- **Cloudflare Pages** for hosting (auto-deploys from `main`)
- **TypeScript** throughout

## Key Commands

```sh
npm run dev          # Start dev server
npm run build        # Build for production
npx convex dev       # Run Convex dev server (needed for local dev)
```

## Deployment

Auto-deploys to Cloudflare Pages on push to `main`. No GitHub Actions needed - Cloudflare's git integration handles it.

Build command: `npm run build`
Output directory: `.svelte-kit/cloudflare`

Manual deploy if needed:
```sh
npm run build && npx wrangler pages deploy .svelte-kit/cloudflare --project-name japan-trip-2026
```

## Project Structure

```
src/
├── lib/
│   ├── itinerary.ts              # Trip data (dates, hotels, activities)
│   ├── ConvexClientProvider.svelte  # Convex client setup
│   ├── PrepMode.svelte           # Pre-trip checklist UI
│   └── TravelMode.svelte         # During-trip itinerary UI
├── routes/
│   ├── +layout.svelte            # Root layout with Convex provider
│   ├── +page.svelte              # Main page (switches between modes)
│   ├── map/                      # Trip map page
│   ├── stats/                    # Spending statistics
│   └── expenses/                 # Expense tracking
convex/
├── schema.ts                     # Database schema
└── tasks.ts                      # Queries and mutations
```

## Important Notes

- **No platform-specific packages**: Don't add packages like `@img/sharp-darwin-arm64` - Cloudflare builds on Linux x64
- **Convex client**: Use `useConvexClient()` with `onMount`, not `$effect`, to avoid SSR issues
- **Environment**: `PUBLIC_CONVEX_URL` has a fallback in code, but is set in `.env.production`

## Common Issues

### Build fails on Cloudflare
Check for platform-specific npm packages (darwin, win32, etc.) in package.json - these break Linux builds.

### Convex not connecting
Make sure `npx convex dev` is running locally, or check `PUBLIC_CONVEX_URL` for production.
