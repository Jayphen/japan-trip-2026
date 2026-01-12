<script lang="ts">
	import MapView from "$lib/MapView.svelte";
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
	<!-- Header -->
	<header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
		<div class="container mx-auto px-4 py-4 max-w-6xl">
			<div class="flex items-center justify-between">
				<a
					href="/"
					class="flex items-center gap-2 text-rose-900 hover:text-rose-700 transition-colors font-semibold"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
					Back to Itinerary
				</a>
				<h1 class="text-xl font-bold text-rose-900">
					🗾 Trip Map
				</h1>
				<div class="w-32"></div>
			</div>
		</div>
	</header>

	<!-- Map Container -->
	<main class="h-[calc(100vh-73px)]">
		<MapView />
	</main>
</div>
