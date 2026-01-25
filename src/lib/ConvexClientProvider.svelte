<script lang="ts">
	import { setupConvex } from "convex-svelte";
	import { browser } from "$app/environment";
	import { dev } from "$app/environment";

	let { children } = $props();

	// Only initialize Convex in the browser (not during prerender)
	if (browser && !dev) {
		const convexUrl = import.meta.env.PUBLIC_CONVEX_URL || "https://rare-moose-955.convex.cloud";
		setupConvex(convexUrl);
	}
</script>

{@render children()}
