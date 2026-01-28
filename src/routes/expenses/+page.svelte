<script lang="ts">
  import SpendingTab from "$lib/spending/SpendingTab.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let today = $state("");

  onMount(() => {
    if (browser) {
      today = new Date().toISOString().split('T')[0];
    }
  });
</script>

{#if today}
  <SpendingTab date={today} />
{:else}
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <p class="text-gray-500">Loading...</p>
  </div>
{/if}
