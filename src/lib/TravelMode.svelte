<script lang="ts">
	import type { DayPlan } from "./itinerary";
	import { getDayPlan } from "./itinerary";
	import DayMap from "./DayMap.svelte";
	import SpendingTab from "$lib/spending/SpendingTab.svelte";
	import { weatherCodeToLabel, type WeatherSummary } from "$lib/weather";

	interface Props {
		dayPlan: DayPlan;
		currentDate: Date;
	}

	let { dayPlan, currentDate }: Props = $props();
	let viewDateOffset = $state(0);
	let imageError = $state(false);
	let weather: WeatherSummary | null = $state(null);
	let weatherError: string | null = $state(null);
	let activeTab = $state<"itinerary" | "spending">("itinerary");

	let viewDate = $derived(() => {
		const date = new Date(currentDate);
		date.setDate(date.getDate() + viewDateOffset);
		return date;
	});
	let currentDayPlan = $derived(getDayPlan(viewDate()) || dayPlan);
	let formattedDateStr = $derived(() => {
		const d = viewDate();
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	});

	// Reset image error when day changes
	$effect(() => {
		currentDayPlan;
		imageError = false;
	});

	// Weather (best-effort)
	$effect(() => {
		currentDayPlan;
		weather = null;
		weatherError = null;

		(async () => {
			try {
				const lat = currentDayPlan.coordinates?.lat;
				const lng = currentDayPlan.coordinates?.lng;
				if (lat == null || lng == null) return;

				const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}&date=${currentDayPlan.date}`);
				if (!res.ok) {
					weatherError = `Weather unavailable (${res.status})`;
					return;
				}
				const w = (await res.json()) as any;
				if (w?.error) {
					weatherError = w.error;
					return;
				}
				weather = w as WeatherSummary;
			} catch {
				weatherError = 'Weather unavailable';
			}
		})();
	});

	function navigateDay(direction: number) {
		viewDateOffset += direction;
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}

	function handleImageError() {
		imageError = true;
	}
</script>

<div class="space-y-6">
	<!-- Hero Image with Region Badge -->
	{#if currentDayPlan.heroImage && !imageError}
		<div class="relative rounded-xl overflow-hidden shadow-lg">
			<img
				src={currentDayPlan.heroImage}
				alt={currentDayPlan.heroImageAlt || currentDayPlan.region}
				class="w-full h-48 md:h-64 object-cover"
				loading="lazy"
				onerror={handleImageError}
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
			<div class="absolute bottom-4 left-4 right-4">
				<span class="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-rose-900">
					{currentDayPlan.region}
				</span>
			</div>
		</div>
	{:else}
		<!-- Fallback when no image -->
		<div class="bg-gradient-to-r from-rose-400 to-pink-500 rounded-xl p-6 shadow-lg">
			<span class="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-rose-900">
				{currentDayPlan.region}
			</span>
		</div>
	{/if}

	<!-- Day Navigation -->
	<div class="flex items-center justify-between gap-4">
		<button
			onclick={() => navigateDay(-1)}
			class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-rose-900 font-semibold flex items-center gap-2"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Yesterday
		</button>

		<div class="text-center flex-1">
			<div class="text-sm text-rose-700 font-medium">Day {currentDayPlan.dayNumber} of 20</div>
		</div>

		<button
			onclick={() => navigateDay(1)}
			class="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-rose-900 font-semibold flex items-center gap-2"
		>
			Tomorrow
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<!-- Date Header -->
	<div class="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-rose-200">
		<h2 class="text-3xl font-bold text-rose-900 mb-2">
			{formatDate(currentDayPlan.date)}
		</h2>
		{#if weather}
			{@const wl = weatherCodeToLabel(weather.weatherCode ?? undefined)}
			<div class="text-sm text-gray-700 font-medium">
				<span class="mr-2">{wl.emoji}</span>
				{wl.label}
				· {Math.round(weather.tempMinC ?? 0)}–{Math.round(weather.tempMaxC ?? 0)}°C
				{#if weather.precipProbMaxPct !== null && weather.precipProbMaxPct !== undefined}
					· {Math.round(weather.precipProbMaxPct)}% rain
				{/if}
			</div>
		{:else if weatherError}
			<div class="text-xs text-gray-500">{weatherError}</div>
		{/if}
	</div>

	<!-- Tab Switcher -->
	<div class="flex p-1 bg-rose-100 rounded-xl">
		<button
			class="flex-1 py-2 rounded-lg font-semibold text-sm transition-all {activeTab === 'itinerary' ? 'bg-white text-rose-900 shadow-sm' : 'text-rose-600 hover:bg-rose-50'}"
			onclick={() => activeTab = 'itinerary'}
		>
			Itinerary
		</button>
		<button
			class="flex-1 py-2 rounded-lg font-semibold text-sm transition-all {activeTab === 'spending' ? 'bg-white text-rose-900 shadow-sm' : 'text-rose-600 hover:bg-rose-50'}"
			onclick={() => activeTab = 'spending'}
		>
			Spending
		</button>
	</div>

	{#if activeTab === 'itinerary'}
		<!-- Main Content -->
		<div class="bg-white rounded-xl shadow-lg p-8 space-y-6">
			<!-- Hotel Info -->
			<div class="border-l-4 border-rose-500 pl-6 py-2">
				<h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Today's Stay</h3>
				{#if currentDayPlan.hotelUrl}
					<a
						href={currentDayPlan.hotelUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-2xl font-bold text-rose-900 hover:text-rose-700 transition-colors inline-flex items-center gap-2"
					>
						{currentDayPlan.hotel}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				{:else}
					<p class="text-2xl font-bold text-rose-900">{currentDayPlan.hotel}</p>
				{/if}
			</div>

			<!-- Main Activity -->
			<div class="border-l-4 border-pink-400 pl-6 py-2">
				<h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Key Activity</h3>
				<p class="text-xl text-gray-800">{currentDayPlan.mainActivity}</p>
			</div>

			<!-- Train Info (if present) -->
			{#if currentDayPlan.trainInfo}
				<div class="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg">
					<h3 class="text-sm font-semibold text-blue-700 uppercase mb-2 flex items-center gap-2">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						Train Info
					</h3>
					<p class="text-lg text-blue-900 font-medium">{currentDayPlan.trainInfo}</p>
				</div>
			{/if}

			<!-- Logistics Alert (if present) -->
			{#if currentDayPlan.logistics}
				<div class="bg-amber-50 border-l-4 border-amber-500 pl-6 py-4 rounded-r-lg">
					<h3 class="text-sm font-semibold text-amber-700 uppercase mb-2 flex items-center gap-2">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						Important Logistics
					</h3>
					<p class="text-lg text-amber-900 font-medium">{currentDayPlan.logistics}</p>
				</div>
			{/if}
		</div>

		<!-- Activities Section -->
		{#if currentDayPlan.activities && currentDayPlan.activities.length > 0}
			<div class="bg-white rounded-xl shadow-lg p-8">
				<h3 class="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
					</svg>
					Today's Activities
				</h3>
				<div class="space-y-4">
					{#each currentDayPlan.activities as activity, index}
						<div class="relative pl-8 pb-4 {index < currentDayPlan.activities.length - 1 ? 'border-l-2 border-rose-200' : ''} ml-2">
							<!-- Timeline dot -->
							<div class="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow"></div>
							
							<div class="bg-rose-50/50 rounded-lg p-4 hover:bg-rose-50 transition-colors">
								<div class="flex items-start justify-between gap-2 mb-1">
									<h4 class="font-semibold text-gray-900">{activity.name}</h4>
									{#if activity.time}
										<span class="text-xs px-2 py-1 bg-rose-100 text-rose-700 rounded-full font-medium whitespace-nowrap">
											{activity.time}
										</span>
									{/if}
								</div>
								{#if activity.description}
									<p class="text-gray-600 text-sm mb-2">{activity.description}</p>
								{/if}
								{#if activity.tip}
									<div class="flex items-start gap-2 mt-2 p-2 bg-amber-50 rounded-md">
										<svg class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
										</svg>
										<span class="text-sm text-amber-800"><strong>Tip:</strong> {activity.tip}</span>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Day Map -->
		<DayMap dayPlan={currentDayPlan} />
	{:else}
		<!-- Spending Tab -->
		<SpendingTab date={formattedDateStr()} />
	{/if}

	<!-- Progress Bar -->
	<div class="bg-white rounded-xl shadow-lg p-6">
		<div class="flex justify-between text-sm text-gray-600 mb-2">
			<span>Trip Progress</span>
			<span>{currentDayPlan.dayNumber} / 20 days</span>
		</div>
		<div class="w-full bg-gray-200 rounded-full h-3">
			<div
				class="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500"
				style="width: {(currentDayPlan.dayNumber / 20) * 100}%"
			></div>
		</div>
	</div>
</div>
