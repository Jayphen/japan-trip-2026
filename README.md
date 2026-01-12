# Japan Trip Companion App 🇯🇵

A personal travel companion app for the Japan 2026 trip (Jan 29 - Feb 17, 2026). The app automatically transitions between Prep Mode and Travel Mode based on the current date.

## Features

- **Prep Mode** (Before Jan 29, 2026)
  - Countdown to departure
  - Interactive checklist with task categories and priorities
  - Overdue task highlighting
  - Progress tracking

- **Travel Mode** (During the trip)
  - Daily itinerary with hotel information
  - Train schedules and logistics alerts
  - Day-by-day navigation
  - Trip progress indicator

- **Debug Mode**
  - Date picker to test both modes before the trip

## Tech Stack

- **Frontend**: SvelteKit (Vite) + Tailwind CSS
- **Backend/Database**: Convex
- **TypeScript**: Full type safety

## Setup Instructions

### 1. Install Dependencies

```sh
npm install
```

### 2. Set Up Convex

First, you need to create a Convex account and deployment:

```sh
npx convex dev
```

This will:
- Open a browser to create/login to your Convex account
- Create a new Convex project
- Generate the Convex deployment URL

The command will update your `.env` file with the `PUBLIC_CONVEX_URL`.

### 3. Seed Initial Tasks

Once Convex is running, the app will load. Click the "Seed Tasks" button in the Prep Mode dashboard to populate the initial task list.

### 4. Start Development Server

In a separate terminal (keep `npx convex dev` running):

```sh
npm run dev -- --open
```

## Project Structure

```
src/
├── lib/
│   ├── itinerary.ts           # Trip itinerary data and helper functions
│   ├── ConvexClientProvider.svelte
│   ├── PrepMode.svelte         # Pre-trip checklist dashboard
│   └── TravelMode.svelte       # Daily itinerary dashboard
├── routes/
│   ├── +layout.svelte          # Root layout with Convex provider
│   └── +page.svelte            # Main app with mode detection
└── app.css                     # Tailwind styles

convex/
├── schema.ts                   # Convex database schema
└── tasks.ts                    # Convex queries and mutations
```

## Usage

### Testing Different Modes

Use the date picker at the top of the app to test different dates:

- Set to any date before **Jan 29, 2026** to see Prep Mode
- Set to any date between **Jan 29 - Feb 17, 2026** to see Travel Mode
- Navigate through days in Travel Mode using the Yesterday/Tomorrow buttons

### Managing Tasks (Prep Mode)

- Click the circle next to any task to toggle completion
- Overdue tasks are highlighted in red
- Tasks are organized by priority (🔴 High, 🟡 Medium, 🟢 Low)
- Categories include BOOKING, LOGISTICS, and FUN

## Building for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Deployment

1. Deploy Convex to production:
   ```sh
   npx convex deploy
   ```

2. Update your production environment variables with the production Convex URL

3. Deploy the SvelteKit app to your preferred hosting provider (Vercel, Netlify, etc.)

## License

Personal project for the Japan 2026 trip.
