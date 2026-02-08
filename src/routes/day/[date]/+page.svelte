<script lang="ts">
  import TravelMode from "$lib/TravelMode.svelte";
  import type { DayPlan } from "$lib/itinerary";

  interface Props {
    data: {
      date: string;
      dayPlan: DayPlan;
    };
  }

  let { data }: Props = $props();

  const currentDate = $derived(() => new Date(data.date + "T00:00:00"));
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
  <div class="container mx-auto px-4 py-6 max-w-4xl">
    <div class="flex items-center justify-between gap-3 mb-4">
      <a
        href="/agenda"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Agenda
      </a>

      <a
        href="/"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors"
      >
        Today
      </a>
    </div>

    <TravelMode dayPlan={data.dayPlan} currentDate={currentDate()} />
  </div>
</div>
