<script lang="ts">
	import type { DayPlan } from "./itinerary";
	import { getDayPlan } from "./itinerary";

	interface Props {
		dayPlan: DayPlan;
		currentDate: Date;
	}

	let { dayPlan, currentDate }: Props = $props();
	let viewDate = $state(currentDate);
	let currentDayPlan = $derived(getDayPlan(viewDate) || dayPlan);

	function navigateDay(direction: number) {
		const newDate = new Date(viewDate);
		newDate.setDate(newDate.getDate() + direction);
		viewDate = newDate;
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
</script>

<div class="space-y-6">
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
	</div>

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
