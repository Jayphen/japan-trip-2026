<script lang="ts">
  import { itinerary, TRIP_START, TRIP_END, type DayPlan } from "$lib/itinerary";

  const tripStart = new Date(TRIP_START + "T00:00:00");
  const tripEnd = new Date(TRIP_END + "T00:00:00");

  const weekdayFmt = new Intl.DateTimeFormat("en-AU", { weekday: "short" });
  const monthFmt = new Intl.DateTimeFormat("en-AU", { month: "long" });
  const dayFmt = new Intl.DateTimeFormat("en-AU", { day: "numeric" });
  const rangeFmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" });

  function parseDate(dateStr: string): Date {
    return new Date(dateStr + "T00:00:00");
  }

  function isBetween(date: Date, start: Date, end: Date) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }

  // Monday-start week bucket.
  function weekStart(d: Date): Date {
    const date = new Date(d);
    const day = (date.getDay() + 6) % 7; // Mon=0..Sun=6
    date.setDate(date.getDate() - day);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function weekEnd(ws: Date): Date {
    const we = new Date(ws);
    we.setDate(we.getDate() + 6);
    return we;
  }

  function formatWeekRange(d: Date): string {
    const ws = weekStart(d);
    const we = weekEnd(ws);
    return `${rangeFmt.format(ws)} – ${rangeFmt.format(we)}`;
  }

  const days: Array<{ dateStr: string; date: Date; plan: DayPlan }> = Object.entries(itinerary)
    .map(([dateStr, plan]) => ({ dateStr, date: parseDate(dateStr), plan }))
    .filter(({ date }) => isBetween(date, tripStart, tripEnd))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-50">
  <div class="container mx-auto max-w-3xl px-4 py-6">
    <header class="flex items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold leading-tight">Agenda</h1>
        <p class="text-sm text-neutral-400">{monthFmt.format(tripStart)} – {monthFmt.format(tripEnd)}</p>
      </div>

      <div class="flex gap-2">
        <a href="/" class="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm">Today</a>
        <a href="/map" class="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm">Map</a>
      </div>
    </header>

    <div class="space-y-6">
      {#each days as item, i}
        {@const prev = i > 0 ? days[i - 1] : null}
        {#if !prev || formatWeekRange(prev.date) !== formatWeekRange(item.date)}
          <div class="text-xs tracking-wider text-neutral-400 uppercase">
            {formatWeekRange(item.date)}
          </div>
        {/if}

        <div class="flex gap-3">
          <!-- Left date rail -->
          <div class="w-14 shrink-0 text-center">
            <div class="text-xs text-neutral-400">{weekdayFmt.format(item.date)}</div>
            <div class="text-3xl font-semibold leading-none">{dayFmt.format(item.date)}</div>
          </div>

          <!-- Event pill -->
          <a
            href={`/day/${item.dateStr}`}
            class="flex-1 rounded-2xl bg-indigo-500/90 hover:bg-indigo-500 transition-colors px-4 py-3 shadow-sm"
            title={item.plan.mainActivity}
          >
            <div class="flex items-center justify-between gap-3">
              <div class="font-semibold">
                Japan 🇯🇵 · Day {item.plan.dayNumber}/20
              </div>
              <div class="text-xs text-indigo-100/90">{item.plan.region}</div>
            </div>
            <div class="text-sm text-indigo-50/95 mt-1">
              {item.plan.mainActivity}
            </div>
            {#if item.plan.trainInfo}
              <div class="text-xs text-indigo-100/90 mt-1">
                🚄 {item.plan.trainInfo}
              </div>
            {/if}
            {#if item.plan.logistics}
              <div class="text-xs text-indigo-100/90 mt-1">
                📝 {item.plan.logistics}
              </div>
            {/if}
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>
