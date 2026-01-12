<script lang="ts">
	import { ConvexProvider, createConvexClient } from "convex/svelte";
	import { PUBLIC_CONVEX_URL } from "$env/static/public";

	let { children } = $props();

	const client = createConvexClient(PUBLIC_CONVEX_URL);
</script>

<ConvexProvider {client}>
	{@render children()}
</ConvexProvider>
