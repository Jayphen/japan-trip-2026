<script lang="ts">
  import { onMount } from "svelte";
  import { useQuery } from "convex-svelte";
  import { api } from "../../convex/_generated/api";
  import { formatCurrency, convertToHomeCurrency, CATEGORIES } from "$lib/currency";
  import { Chart, registerables } from 'chart.js';
  import CategoryIcon from "$lib/spending/CategoryIcon.svelte";

  Chart.register(...registerables);

  const expensesQuery = useQuery(api.expenses.list, {});
  
  let expenses = $derived(expensesQuery.data || []);
  let totalJpy = $derived(expenses.reduce((sum, e) => sum + e.amount, 0));
  let totalAud = $derived(convertToHomeCurrency(totalJpy));

  let pieChartCanvas: HTMLCanvasElement;
  let barChartCanvas: HTMLCanvasElement;
  let pieChart: Chart | null = null;
  let barChart: Chart | null = null;

  function updateCharts() {
    if (!expenses.length) return;
    if (!pieChartCanvas || !barChartCanvas) return;

    // --- Category Data ---
    const categoryTotals: Record<string, number> = {};
    CATEGORIES.forEach(c => categoryTotals[c.id] = 0);
    expenses.forEach(e => {
      if (categoryTotals[e.category] !== undefined) {
        categoryTotals[e.category] += e.amount;
      }
    });

    const categoryLabels = CATEGORIES.map(c => c.label);
    const categoryData = CATEGORIES.map(c => convertToHomeCurrency(categoryTotals[c.id])); // Chart in AUD
    const categoryColors = [
      'rgb(249, 115, 22)', // Orange (Food)
      'rgb(59, 130, 246)', // Blue (Transport)
      'rgb(236, 72, 153)', // Pink (Shopping)
      'rgb(99, 102, 241)', // Indigo (Hotel)
      'rgb(168, 85, 247)', // Purple (Fun)
      'rgb(107, 114, 128)', // Gray (Misc)
    ];

    // --- Daily Data ---
    const dailyTotals: Record<string, number> = {};
    expenses.forEach(e => {
      dailyTotals[e.date] = (dailyTotals[e.date] || 0) + e.amount;
    });
    // Sort dates
    const sortedDates = Object.keys(dailyTotals).sort();
    const dailyLabels = sortedDates.map(d => {
        const date = new Date(d);
        return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
    });
    const dailyData = sortedDates.map(d => convertToHomeCurrency(dailyTotals[d]));

    // --- Render Pie Chart ---
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieChartCanvas, {
      type: 'doughnut',
      data: {
        labels: categoryLabels,
        datasets: [{
          data: categoryData,
          backgroundColor: categoryColors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw as number, "AUD")}`
            }
          }
        }
      }
    });

    // --- Render Bar Chart ---
    if (barChart) barChart.destroy();
    barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: dailyLabels,
        datasets: [{
          label: 'Daily Spend (AUD)',
          data: dailyData,
          backgroundColor: 'rgba(244, 63, 94, 0.6)', // Rose-500
          borderColor: 'rgb(244, 63, 94)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  $effect(() => {
    if (expenses.length > 0) {
      updateCharts();
    }
  });

  onMount(() => {
    // Initial render if data exists immediately
    updateCharts();
  });

</script>

<div class="min-h-screen bg-gray-50 pb-12">
  <div class="bg-white shadow-sm sticky top-0 z-20">
    <div class="container mx-auto px-4 py-4 flex items-center gap-4">
      <a href="/" class="p-2 text-gray-500 hover:text-rose-600 transition-colors">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
      <h1 class="text-xl font-bold text-gray-900">Spending Analysis</h1>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8 max-w-4xl space-y-6">
    
    <!-- Total Card -->
    <div class="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center">
      <p class="text-rose-100 font-medium text-lg uppercase tracking-wider mb-2">Total Trip Cost</p>
      <div class="text-5xl font-extrabold mb-2">
        {formatCurrency(totalJpy, "JPY")}
      </div>
      <div class="text-2xl text-rose-100 font-medium">
        ≈ {formatCurrency(totalAud, "AUD")}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Category Chart -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Breakdown by Category</h3>
        <div class="aspect-square relative flex items-center justify-center">
          {#if expenses.length === 0}
            <p class="text-gray-400">No data yet</p>
          {:else}
            <canvas bind:this={pieChartCanvas}></canvas>
          {/if}
        </div>
      </div>

      <!-- Top Expenses -->
      <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Top Expenses</h3>
        <div class="flex-1 overflow-y-auto max-h-[300px] space-y-3">
            {#if expenses.length === 0}
                <p class="text-gray-400">No expenses recorded.</p>
            {:else}
                {#each [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5) as expense}
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CategoryIcon category={expense.category} size="sm" />
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900 truncate">{expense.description}</p>
                            <p class="text-xs text-gray-500">{expense.date}</p>
                        </div>
                        <div class="text-right">
                             <p class="font-bold text-gray-900">{formatCurrency(expense.amount, "JPY")}</p>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
      </div>
    </div>

    <!-- Daily Trend -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Daily Trend</h3>
      <div class="h-64 relative flex items-center justify-center">
         {#if expenses.length === 0}
            <p class="text-gray-400">No data yet</p>
          {:else}
            <canvas bind:this={barChartCanvas}></canvas>
          {/if}
      </div>
    </div>

  </div>
</div>
