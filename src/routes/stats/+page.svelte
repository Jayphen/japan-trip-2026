<script lang="ts">
  import { onMount } from "svelte";
  import { formatCurrency, convertToHomeCurrency, CATEGORIES } from "$lib/currency";
  import CategoryIcon from "$lib/spending/CategoryIcon.svelte";
  import { browser } from "$app/environment";

  let expenses: any[] = $state([]);
  let totalJpy = $state(0);
  let totalAud = $state(0);
  let loading = $state(true);
  let chartCanvas: HTMLCanvasElement;
  let chart: any;

  // Convex API (loaded dynamically)
  let api: any;
  let q: any;

  onMount(async () => {
    if (browser) {
      try {
        const Chart = (await import('chart.js')).default;
        Chart.register(...registerables);
        
        const convex = await import("convex-svelte");
        const convexApi = await import("../../convex/_generated/api");
        api = convexApi.api;
        
        q = convex.useQuery(api.expenses.list, {});
        q.subscribe((data: any[]) => {
          expenses = data || [];
          totalJpy = expenses.reduce((sum, e) => sum + e.amount, 0);
          convertToHomeCurrency(totalJpy).then(aud => totalAud = aud);
          updateChart();
          loading = false;
        });
      } catch (e) {
        console.warn("Failed to load expenses:", e);
        loading = false;
      }
    } else {
      loading = false;
    }
  });
  
  function updateChart() {
    if (!chartCanvas || !expenses.length) return;
    // Chart update code...
  }
</script>

<div class="max-w-4xl mx-auto p-4 space-y-6">
  {#if !loading && expenses.length > 0}
    <!-- Chart and stats -->
  {:else if !loading && expenses.length === 0}
    <p>No expenses yet</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>