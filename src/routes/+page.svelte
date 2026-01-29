<script lang="ts">
	import { browser } from "$app/environment";
	import { isBeforeTrip, getDaysUntilTrip, getDayPlan } from "$lib/itinerary";
	import PrepMode from "$lib/PrepMode.svelte";
	import TravelMode from "$lib/TravelMode.svelte";
	import { useQuery, useConvexClient } from "convex-svelte";
	import { api } from "../../convex/_generated/api";

  let debugDate = $state(new Date());
  let currentDate = $derived(debugDate);
  let showPrepMode = $derived(isBeforeTrip(currentDate));
  let daysUntil = $derived(getDaysUntilTrip(currentDate));
  let dayPlan = $derived(getDayPlan(currentDate));

	// Only initialize Convex on the client
	let tasks: any = $state([]);
	let client: any = $state(null);

	$effect(() => {
		if (browser) {
			try {
				client = useConvexClient();
				const q = useQuery(api.tasks.list, {});
				// Subscribe to the query
				if (q && typeof q.subscribe === 'function') {
					const unsubscribe = q.subscribe((data: any[]) => {
						tasks = data || [];
					});
					return unsubscribe;
				}
			} catch (e) {
				console.warn('Convex not available:', e);
			}
		}
	});

  function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    debugDate = new Date(target.value + "T00:00:00");
  }

	async function handleToggle(taskId: string) {
		if (client) {
			await client.mutation(api.tasks.toggle, { id: taskId as any });
		}
	}

	async function handleSeed() {
		if (client) {
			await client.mutation(api.tasks.seed, {});
		}
	}
</script>

<div
  class="min-h-screen {showPrepMode
    ? 'bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50'
    : 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50'}"
>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <header class="text-center mb-8">
      <h1
        class="text-4xl font-bold {showPrepMode
          ? 'text-indigo-900'
          : 'text-rose-900'} mb-4"
      >
        🇯🇵 Japan 2026
      </h1>

      <!-- Map Link -->
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <a
          href="/map"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all {showPrepMode
            ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View Trip Map
        </a>

        <a
          href="/stats"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all {showPrepMode
            ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'}"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Spending Stats
        </a>
      </div>

      <!-- Debug Date Picker -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-md mx-auto"
      >
        <label
          for="debug-date"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Debug Date (for testing)
        </label>
        <input
          id="debug-date"
          type="date"
          value={formatDateForInput(debugDate)}
          onchange={handleDateChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </header>

    <!-- Mode Display -->
    {#if showPrepMode}
      <PrepMode
        {daysUntil}
        tasks={tasks}
        {handleToggle}
        {handleSeed}
        {currentDate}
      />
    {:else if dayPlan}
      <TravelMode {dayPlan} {currentDate} />
    {:else}
      <div class="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Trip Complete!</h2>
        <p class="text-gray-600">
          Thank you for using the Japan Trip Companion App.
        </p>
      </div>
    {/if}
  </div>
</div>
