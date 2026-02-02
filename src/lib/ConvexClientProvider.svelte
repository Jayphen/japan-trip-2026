<script lang="ts">
	import { setupConvex } from "convex-svelte";
	import { browser } from "$app/environment";

	let { children } = $props();

	// Only initialize Convex in the browser (not during SSR)
	if (browser) {
		try {
			const convexUrl = import.meta.env.PUBLIC_CONVEX_URL || "https://rare-moose-955.convex.cloud";
			setupConvex(convexUrl);
		} catch (e) {
			console.warn("Convex setup failed:", e);
		}
	}
</script>

{@render children()}
