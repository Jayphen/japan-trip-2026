# Product Requirements Document: Japan Trip Companion App

**Tech Stack:** SvelteKit (Vite), Tailwind CSS, Convex (Backend/Database)

---

## 1. Project Overview

Build a personal travel companion app that transitions between two modes based on the current date:

- **Prep Mode:** A persistent checklist of tasks to complete before the trip.
- **Travel Mode:** A dynamic dashboard showing the daily itinerary, hotel details, and logistics.

---

## 2. Data Model (Convex Schema)

The app uses Convex to persist the state of the "To-Do" list.

### Table: `tasks`

| Field | Type | Description |
|-------|------|-------------|
| `_id` | id | Auto-generated unique identifier |
| `title` | string | The task description |
| `dueDate` | string (optional) | YYYY-MM-DD format |
| `category` | string | `'BOOKING'`, `'LOGISTICS'`, `'FUN'` |
| `isCompleted` | boolean | The toggle state |
| `priority` | string | `'HIGH'`, `'MEDIUM'`, `'LOW'` |

### Convex Functions

- **`tasks.ts:list`** - Query to fetch all tasks.
- **`tasks.ts:toggle`** - Mutation to toggle `isCompleted` by task ID.
- **`tasks.ts:seed`** - Mutation to populate the DB with the "Initial Task List" (defined below) if the table is empty.

---

## 3. Hardcoded Data (The Itinerary)

Store as a constant object/array in `src/lib/itinerary.ts`. The structure allows looking up a specific date to get that day's plan.

### DayPlan Interface

```typescript
{
  date: string;           // YYYY-MM-DD
  dayNumber: number;      // 1-20
  hotel: string;          // Hotel name
  hotelUrl?: string;      // Google Maps link
  mainActivity: string;   // Primary activity
  logistics?: string;     // Important notes
  trainInfo?: string;     // Train schedules
}
```

### Trip Range: Jan 29, 2026 – Feb 17, 2026 (20 Days)

### Day-by-Day Itinerary

| Day | Date | Hotel | Activity | Logistics/Train |
|-----|------|-------|----------|-----------------|
| 1 | Jan 29 | Tosei Hotel Cocone Asakusa | Arrival Day | Pick up Skyliner tickets |
| 2 | Jan 30 | Tosei Hotel Cocone Asakusa | Tokyo Explore | — |
| 3 | Jan 31 | Tosei Hotel Cocone Asakusa | Tokyo Explore | — |
| 4 | Feb 1 | [Work Hotel - Minato] | Work Week Begins | Wife uses 72hr Subway passes |
| 5 | Feb 2 | [Work Hotel - Minato] | Work Week | Wife uses 72hr Subway passes |
| 6 | Feb 3 | [Work Hotel - Minato] | Work Week | Wife uses 72hr Subway passes |
| 7 | Feb 4 | [Work Hotel - Minato] | Work Week | Wife uses 72hr Subway passes |
| 8 | Feb 5 | [Work Hotel - Minato] | Work Week | Wife uses 72hr Subway passes |
| 9 | Feb 6 | [Work Hotel - Minato] | Work Week | Wife uses 72hr Subway passes |
| 10 | Feb 7 | Prince Smart Inn Atami | Izu Trip | Ship luggage to Kyoto Gate Hotel. Train: Saphir Odoriko (Tokyo → Kawazu) |
| 11 | Feb 8 | The Gate Hotel Takasegawa (Kyoto) | Travel to Kyoto | Shinkansen Atami → Kyoto (Seat E) |
| 12 | Feb 9 | The Gate Hotel Takasegawa (Kyoto) | Kyoto Exploration | — |
| 13 | Feb 10 | The Gate Hotel Takasegawa (Kyoto) | Kyoto Exploration | — |
| 14 | Feb 11 | The Gate Hotel Takasegawa (Kyoto) | Nara Day Trip | — |
| 15 | Feb 12 | The Knot Hiroshima | Travel to Hiroshima | Ship luggage to Royal Park Canvas Ginza. Shinkansen Kyoto → Hiroshima |
| 16 | Feb 13 | Royal Park Canvas Ginza (Tokyo) | Return to Tokyo | Shinkansen Hiroshima → Tokyo |
| 17 | Feb 14 | Royal Park Canvas Ginza (Tokyo) | Valentine's Day | 10:00 AM: teamLab Planets |
| 18 | Feb 15 | Super Hotel Premier Akasaka | Move to Akasaka | Relax in Onsen |
| 19 | Feb 16 | Super Hotel Premier Akasaka | Free Day | Sunset: Shibuya Sky (Book Jan 16) |
| 20 | Feb 17 | Super Hotel Premier Akasaka | Departure Day | Flight departs 22:45 |

### Helper Functions

- `getDayPlan(date)` - Returns DayPlan for specific date or null
- `isBeforeTrip(date)` - Boolean check if date is before Jan 29, 2026
- `isDuringTrip(date)` - Boolean check if date is between Jan 29 - Feb 17, 2026
- `getDaysUntilTrip(date)` - Calculates days remaining until trip start

---

## 4. Initial Task List (For Seeding)

These tasks are seeded into the Convex `tasks` table:

| Task | Category | Priority | Status | Due Date |
|------|----------|----------|--------|----------|
| Book Flights (Jan 29-Feb 17) | BOOKING | HIGH | ✅ Completed | — |
| Book All Hotels | BOOKING | HIGH | ✅ Completed | — |
| Book teamLab Planets (Feb 14) | BOOKING | HIGH | ✅ Completed | — |
| Book Saphir Odoriko Train (Feb 7) | BOOKING | HIGH | ✅ Completed | — |
| Book Shinkansen Atami -> Kyoto (Feb 8) | BOOKING | HIGH | ✅ Completed | — |
| Book Shinkansen Kyoto -> Hiroshima (Feb 12) | BOOKING | HIGH | ❌ Pending | 2026-01-12 |
| Book Shinkansen Hiroshima -> Tokyo (Feb 13) | BOOKING | HIGH | ❌ Pending | 2026-01-13 |
| Book Shibuya Sky (Feb 16) | BOOKING | MEDIUM | ❌ Pending | 2026-01-16 |
| Activate eSIM (KDDI) | LOGISTICS | MEDIUM | ❌ Pending | 2026-01-28 |
| Fill Japan Web (Immigration QR) | LOGISTICS | MEDIUM | ❌ Pending | 2026-01-25 |

---

## 5. UI & Logic Requirements

### Global Header

- Display **"Japan 2026"**
- **Debug Tool:** A Date Picker that allows the user to override "Today's Date". This is critical for testing the Travel Mode before the trip starts. Default to `new Date()`.

### View Logic

**IF Current Date < Jan 29, 2026:**
- Show **Prep Dashboard**
- Display a countdown: **"X Days until Japan"**
- Show trip dates: Jan 29 - Feb 17, 2026
- Render the Task List from Convex
- Allow clicking items to toggle `isCompleted` (Convex Mutation)
- Highlight **overdue tasks in Red** (tasks with dueDate < currentDate and not completed)
- Show stats bar: Completed count, Remaining count, Overdue count
- Display "Seed Tasks" button if task list is empty

**IF Current Date >= Jan 29, 2026 AND <= Feb 17, 2026:**
- Show **Travel Dashboard**
- Look up the specific date in the itinerary object
- Display:
  - **Today's Stay:** Hotel Name (with Google Maps link)
  - **Key Activity:** The main highlight
  - **Train Info:** Blue section showing train details (if applicable)
  - **Logistics Alert:** Amber section highlighting important notes (if applicable)
- Navigation buttons to flip to "Yesterday" or "Tomorrow"
- Day counter: "Day X of 20"
- Progress bar showing trip progression

**IF Current Date > Feb 17, 2026:**
- Show **"Trip Complete!"** message

### Component Structure

```
src/
├── routes/
│   ├── +layout.svelte      # Root layout with Convex provider
│   └── +page.svelte        # Main app with mode detection
└── lib/
    ├── itinerary.ts        # Trip data and helper functions
    ├── PrepMode.svelte     # Pre-trip checklist UI
    ├── TravelMode.svelte   # Daily itinerary UI
    └── ConvexClientProvider.svelte
```

---

## 6. Styling

Use **Tailwind CSS** with clean, minimalist card layouts.

### Color Schemes

**Prep Mode (Indigo/Violet):**
- Background: Gradient from `indigo-50` → `violet-50` → `purple-50`
- Headers: `indigo-900`
- Accents: `indigo-600`, `indigo-700`
- Borders: `indigo-200`, `indigo-300`

**Travel Mode (Sakura Pink/Rose):**
- Background: Gradient from `pink-50` → `rose-50` → `red-50`
- Headers: `rose-900`
- Accents: `rose-500`, `rose-700`
- Borders: `rose-200`

### Task Category Colors

| Category | Background | Text |
|----------|------------|------|
| BOOKING | `blue-100` | `blue-800` |
| LOGISTICS | `green-100` | `green-800` |
| FUN | `purple-100` | `purple-800` |

### Priority Indicators

- 🔴 HIGH
- 🟡 MEDIUM
- 🟢 LOW

### Travel Mode Section Colors

| Section | Background | Border |
|---------|------------|--------|
| Hotel/Activity | White | `rose-500` / `pink-400` |
| Train Info | `blue-50` | `blue-500` |
| Logistics Alert | `amber-50` | `amber-500` |

### Common Component Styles

- Cards: `bg-white rounded-xl shadow-lg p-6`
- Buttons: `px-4 py-2 rounded-lg font-semibold transition-all`
- Badges: `text-xs px-2 py-1 rounded-full`
- Container: `max-w-4xl mx-auto px-4`

---

## 7. Technical Details

### Dependencies

```json
{
  "@sveltejs/kit": "^2.49.1",
  "svelte": "^5.45.6",
  "tailwindcss": "^4.1.18",
  "convex": "^1.31.3",
  "typescript": "^5.9.3",
  "vite": "^7.2.6"
}
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript/Svelte checks

### Environment Variables

- `PUBLIC_CONVEX_URL` - Convex deployment URL (set by `npx convex dev`)

---

## 8. Key Metrics

- **Trip Duration:** 20 days
- **Cities Visited:** 4 (Tokyo, Izu, Kyoto, Hiroshima)
- **Hotels:** 7 unique properties
- **Pre-Trip Tasks:** 10 items
- **Major Train Journeys:** 3 (Saphir Odoriko, 2x Shinkansen)
- **Key Activities:** teamLab Planets, Shibuya Sky, Nara Day Trip
