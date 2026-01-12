# Product Requirements Document: Japan Trip Companion App

**Tech Stack:** SvelteKit (Vite), Tailwind CSS, Convex (Backend/Database), Chart.js (for stats)

---

## 1. Project Overview

Build a personal travel companion app that transitions between two modes based on the current date:

- **Prep Mode:** A persistent checklist of tasks to complete before the trip.
- **Travel Mode:** A dynamic dashboard showing the daily itinerary, hotel details, logistics, and daily spending.

---

## 2. Data Model (Convex Schema)

The app uses Convex to persist the state of the "To-Do" list and "Expenses".

### Table: `tasks`

| Field | Type | Description |
|-------|------|-------------|
| `_id` | id | Auto-generated unique identifier |
| `title` | string | The task description |
| `dueDate` | string (optional) | YYYY-MM-DD format |
| `category` | string | `'BOOKING'`, `'LOGISTICS'`, `'FUN'` |
| `isCompleted` | boolean | The toggle state |
| `priority` | string | `'HIGH'`, `'MEDIUM'`, `'LOW'` |

### Table: `expenses`

| Field | Type | Description |
|-------|------|-------------|
| `_id` | id | Auto-generated unique identifier |
| `amount` | number | Amount in JPY |
| `description` | string | What was purchased |
| `category` | string | `'FOOD'`, `'TRANSPORT'`, `'SHOPPING'`, `'ACCOMMODATION'`, `'ENTERTAINMENT'`, `'MISC'` |
| `date` | string | YYYY-MM-DD (The day it belongs to) |
| `timestamp` | number | Date.now() for sorting |

### Convex Functions

- **`tasks.ts:list`** - Query to fetch all tasks.
- **`tasks.ts:toggle`** - Mutation to toggle `isCompleted` by task ID.
- **`tasks.ts:seed`** - Mutation to populate the DB with the "Initial Task List".
- **`expenses.ts:list`** - Query to fetch expenses (can filter by date).
- **`expenses.ts:add`** - Mutation to add a new expense.
- **`expenses.ts:delete`** - Mutation to remove an expense.

---

## 3. Hardcoded Data (The Itinerary)

Store as a constant object/array in `src/lib/itinerary.ts`. The structure allows looking up a specific date to get that day's plan.

*(Itinerary data structure and content remains unchanged from previous version)*

### Helper Functions

- `getDayPlan(date)` - Returns DayPlan for specific date or null
- `isBeforeTrip(date)` - Boolean check if date is before Jan 29, 2026
- `isDuringTrip(date)` - Boolean check if date is between Jan 29 - Feb 17, 2026
- `getDaysUntilTrip(date)` - Calculates days remaining until trip start

---

## 4. Initial Task List (For Seeding)

*(Task list remains unchanged from previous version)*

---

## 5. UI & Logic Requirements

### Global Header

- Display **"Japan 2026"**
- **Navigation:**
    - "Map": Link to `/map`
    - "Stats": Link to `/stats` (New)
- **Debug Tool:** A Date Picker that allows the user to override "Today's Date".

### View Logic

**IF Current Date < Jan 29, 2026:**
- Show **Prep Dashboard** (Tasks, Countdown, Stats Bar)

**IF Current Date >= Jan 29, 2026 AND <= Feb 17, 2026:**
- Show **Travel Dashboard**
- **Tabs:**
    - **Itinerary (Default):** Shows Hotel, Activity, Train Info, Logistics, Mini Map.
    - **Spending (New):**
        - **Daily Total:** Large text showing total JPY for the day + Home Currency approximate (e.g., AUD).
        - **Expense List:** Scrollable list of items (Icon, Desc, Amount JPY/Home).
        - **Add Button:** Floating Action Button (FAB) or prominent button to open Keypad.
- **Spending Keypad (Modal/Drawer):**
    - **Display:** Shows current typed amount in JPY and live conversion.
    - **Keypad:** Large tappable grid (1-9, 0, 00, Backspace).
    - **Category Selection:** Row of icons/pills (Food, Transport, etc.).
    - **Description:** Simple text input.
    - **Actions:** "Save" and "Cancel".

**IF Current Date > Feb 17, 2026:**
- Show **"Trip Complete!"** message

### Stats Page (`/stats`)

- **Total Trip Cost:** Aggregated JPY and Home Currency.
- **Charts:**
    - **Pie Chart:** Breakdown by Category (e.g., 40% Food, 30% Shopping).
    - **Bar/Line Chart:** Daily spending trend over the 20 days.
- **List:** Top expenses (highest cost items).

---

## 6. Interactive Maps

*(Map requirements remain unchanged)*

---

## 7. Styling

Use **Tailwind CSS** with clean, minimalist card layouts.

### Color Schemes

*(Prep and Travel mode colors remain)*

### Spending Categories (Colors)

| Category | Color | Icon (Suggestion) |
|----------|-------|-------------------|
| FOOD | `orange-500` | Utensils/Ramen |
| TRANSPORT | `blue-500` | Train/Bus |
| SHOPPING | `pink-500` | Bag |
| ACCOMMODATION | `indigo-500` | Bed |
| ENTERTAINMENT | `purple-500` | Ticket/Music |
| MISC | `gray-500` | Question |

### Currency Configuration

- **Home Currency:** AUD (Australian Dollar)
- **Exchange Rate:** Fixed constant (e.g., 1 AUD = 95 JPY) or configurable. *Note: Using AUD based on +1100 timezone in git logs.*

---

## 8. Technical Details

### Dependencies

```json
{
  "@sveltejs/kit": "^2.49.1",
  "svelte": "^5.45.6",
  "tailwindcss": "^4.1.18",
  "convex": "^1.31.3",
  "leaflet": "^1.9.4",
  "chart.js": "^4.4.1",
  "typescript": "^5.9.3",
  "vite": "^7.2.6"
}
```

---

## 10. Implementation Status

| Feature | Status |
|---------|--------|
| **Core App** | **Complete** |
| Convex schema (tasks) | Complete |
| Prep Mode UI | Complete |
| Travel Mode UI (Itinerary) | Complete |
| Full Trip Map | Complete |
| **Spending Tracker** | **Pending** |
| Convex schema (expenses) | ❌ Pending |
| Expense Functions (add, list, delete) | ❌ Pending |
| Travel Mode Tabs (Itinerary/Spending) | ❌ Pending |
| Spending Keypad Interface | ❌ Pending |
| Daily Spending List | ❌ Pending |
| Stats Page (`/stats`) | ❌ Pending |
| Chart.js Integration | ❌ Pending |

### Recent Updates

- **2026-01-13**: Added Spending Tracker specifications to PRD.