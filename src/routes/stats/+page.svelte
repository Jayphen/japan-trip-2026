<script lang="ts">
  import { onMount } from "svelte";
  import { useQuery } from "convex-svelte";
  import { api } from "../../convex/_generated/api";
  import { formatCurrency, convertToHomeCurrency, CATEGORIES } from "$lib/currency";
  import { Chart, registerables } from 'chart.js';
  import CategoryIcon from "$lib/spending/CategoryIcon.svelte";
  import { browser } from "$app/environment";

  Chart.register(...registerables);

  let expenses: any[] = [];
  let totalJpy = 0;
  let totalAud = 0;
  let loading = true;
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  // Only run in browser
  if (browser) {
    onMount(async () => {
      try {
        const q = useQuery(api.expenses.list, {});
        const unsub = q.subscribe((data) => {
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
    });
  } else {
    loading = false;
  }
  
  function updateChart() {
    // ... chart code
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