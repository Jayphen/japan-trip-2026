<script lang="ts">
	import { setupConvex } from "convex-svelte";
<<<<<<< HEAD
	import { dev } from "$app/environment";

	let { children } = $props();

	// Skip Convex in dev/preview mode to avoid SSR issues
	if (!dev) {
		try {
			const convexUrl = import.meta.env.PUBLIC_CONVEX_URL || "https://rare-moose-955.convex.cloud";
			setupConvex(convexUrl);
		} catch (e) {
			// Convex not available
		}
	}
=======
	import { PUBLIC_CONVEX_URL } from "$env/static/public";

	let { children } = $props();

	setupConvex(PUBLIC_CONVEX_URL);
>>>>>>> e78071a (Fix critical deployment issues: CSS and Convex integration)
</script>

{@render children()}
