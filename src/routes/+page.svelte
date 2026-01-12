<script lang="ts">
	import { useQuery, useMutation } from "convex/svelte";
	import { api } from "../../convex/_generated/api";
	import { isBeforeTrip, getDaysUntilTrip, getDayPlan } from "$lib/itinerary";
	import PrepMode from "$lib/PrepMode.svelte";
	import TravelMode from "$lib/TravelMode.svelte";

	let debugDate = $state(new Date());
	let currentDate = $derived(debugDate);
	let showPrepMode = $derived(isBeforeTrip(currentDate));
	let daysUntil = $derived(getDaysUntilTrip(currentDate));
	let dayPlan = $derived(getDayPlan(currentDate));

	const tasks = useQuery(api.tasks.list, {});
	const toggleTask = useMutation(api.tasks.toggle);
	const seedTasks = useMutation(api.tasks.seed);

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
		await toggleTask({ id: taskId as any });
	}

	async function handleSeed() {
		await seedTasks({});
	}
</script>

<div class="min-h-screen {showPrepMode ? 'bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50' : 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50'}">
	<div class="container mx-auto px-4 py-8 max-w-4xl">
		<!-- Header -->
		<header class="text-center mb-8">
			<h1 class="text-4xl font-bold {showPrepMode ? 'text-indigo-900' : 'text-rose-900'} mb-4">
				🇯🇵 Japan 2026
			</h1>

			<!-- Debug Date Picker -->
			<div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-md mx-auto">
				<label for="debug-date" class="block text-sm font-medium text-gray-700 mb-2">
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
			<PrepMode {daysUntil} {tasks} {handleToggle} {handleSeed} {currentDate} />
		{:else if dayPlan}
			<TravelMode {dayPlan} {currentDate} />
		{:else}
			<div class="bg-white rounded-xl shadow-lg p-8 text-center">
				<h2 class="text-2xl font-bold text-gray-800 mb-4">Trip Complete!</h2>
				<p class="text-gray-600">Thank you for using the Japan Trip Companion App.</p>
			</div>
		{/if}
	</div>
</div>
