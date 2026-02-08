<script lang="ts">
  import { onMount } from "svelte";
  import { itinerary, TRIP_START, TRIP_END, type DayPlan } from "$lib/itinerary";
  import { weatherCodeToLabel, type WeatherSummary } from "$lib/weather";

  // Force consistent rendering across SSR/client by:
  // - parsing trip dates as UTC ("Z")
  // - formatting in Australia/Sydney explicitly
  const TZ = "Australia/Sydney";

  const tripStart = new Date(TRIP_START + "T00:00:00.000Z");
  const tripEnd = new Date(TRIP_END + "T00:00:00.000Z");

  const weekdayFmt = new Intl.DateTimeFormat("en-AU", { weekday: "short", timeZone: TZ });
  const monthFmt = new Intl.DateTimeFormat("en-AU", { month: "long", timeZone: TZ });
  const dayFmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", timeZone: TZ });
  const rangeFmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: TZ });

  function parseDate(dateStr: string): Date {
    // Treat YYYY-MM-DD as a calendar day, not a local timestamp.
    return new Date(dateStr + "T00:00:00.000Z");
  }

  function isBetween(date: Date, start: Date, end: Date) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }

  // Monday-start week bucket (timezone-stable by using UTC day math).
  function weekStart(d: Date): Date {
    const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const day = (date.getUTCDay() + 6) % 7; // Mon=0..Sun=6
    date.setUTCDate(date.getUTCDate() - day);
    return date;
  }

  function weekEnd(ws: Date): Date {
    const we = new Date(ws);
    we.setUTCDate(we.getUTCDate() + 6);
    return we;
  }

  function formatWeekRange(d: Date): string {
    const ws = weekStart(d);
    const we = weekEnd(ws);
    return `${rangeFmt.format(ws)} – ${rangeFmt.format(we)}`;
  }

  function ymdInSydney(date: Date): string {
    // en-CA gives YYYY-MM-DD
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  }

  const days: Array<{ dateStr: string; date: Date; plan: DayPlan }> = Object.entries(itinerary)
    .map(([dateStr, plan]) => ({ dateStr, date: parseDate(dateStr), plan }))
    .filter(({ date }) => isBetween(date, tripStart, tripEnd))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const todayStr = ymdInSydney(new Date());
  let weatherByDate: Record<string, WeatherSummary> = $state({});

  onMount(() => {
    const el = document.getElementById(`day-${todayStr}`);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });

    // Fetch forecast for each day (best-effort). Open-Meteo supports ~16 days.
    for (const d of days) {
      (async () => {
        try {
          const lat = d.plan.coordinates?.lat;
          const lng = d.plan.coordinates?.lng;
          if (lat == null || lng == null) return;

          const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}&date=${d.dateStr}`);
          if (!res.ok) return;
          const w = (await res.json()) as WeatherSummary;
          weatherByDate = { ...weatherByDate, [d.dateStr]: w };
        } catch {
          // ignore
        }
      })();
    }
  });
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

        <div class="flex gap-3" id={`day-${item.dateStr}`}>
          <!-- Left date rail -->
          <div class="w-14 shrink-0 text-center">
            <div class="text-xs text-neutral-400">{weekdayFmt.format(item.date)}</div>
            <div class="text-3xl font-semibold leading-none">{dayFmt.format(item.date)}</div>
          </div>

          <!-- Event pill -->
          <a
            href={`/day/${item.dateStr}`}
            class={`flex-1 rounded-2xl px-4 py-3 shadow-sm transition-colors ${item.dateStr === todayStr ? 'bg-indigo-400 ring-2 ring-white/70' : 'bg-indigo-500/90 hover:bg-indigo-500'}`}
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

            {#if weatherByDate[item.dateStr]}
              {@const w = weatherByDate[item.dateStr]}
              {@const wl = weatherCodeToLabel(w.weatherCode ?? undefined)}
              <div class="text-xs text-indigo-100/90 mt-1">
                {wl.emoji} {Math.round(w.tempMinC ?? 0)}–{Math.round(w.tempMaxC ?? 0)}°C
                {#if w.precipProbMaxPct !== null && w.precipProbMaxPct !== undefined}
                  · {Math.round(w.precipProbMaxPct)}% rain
                {/if}
              </div>
            {/if}
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
