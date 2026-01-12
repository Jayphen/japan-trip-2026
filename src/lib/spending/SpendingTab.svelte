<script lang="ts">
  import { useQuery, useConvexClient } from "convex-svelte";
  import { api } from "../../convex/_generated/api";
  import { formatCurrency, convertToHomeCurrency } from "$lib/currency";
  import ExpenseList from "./ExpenseList.svelte";
  import Keypad from "./Keypad.svelte";
  import type { Id } from "../../convex/_generated/dataModel";

  interface Props {
    date: string; // YYYY-MM-DD
  }

  let { date } = $props();

  const client = useConvexClient();
  
  // Reactive query
  const expensesQuery = useQuery(api.expenses.list, () => ({ date }));
  
  let expenses = $derived(expensesQuery.data || []);
  let totalJpy = $derived(expenses.reduce((sum, e) => sum + e.amount, 0));
  let totalAud = $derived(convertToHomeCurrency(totalJpy));
  
  let showKeypad = $state(false);

  async function handleAdd(amount: number, description: string, category: string) {
    await client.mutation(api.expenses.add, {
      amount,
      description,
      category: category as any,
      date,
    });
  }

  async function handleDelete(id: Id<"expenses">) {
    if (confirm("Are you sure you want to delete this expense?")) {
      await client.mutation(api.expenses.remove, { id });
    }
  }
</script>

<div class="space-y-6">
  <!-- Daily Total Card -->
  <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
    <div class="relative z-10">
      <p class="text-emerald-100 font-medium mb-1">Daily Spending</p>
      <div class="flex items-baseline gap-2">
        <h2 class="text-4xl font-bold">{formatCurrency(totalJpy, "JPY")}</h2>
      </div>
      <p class="text-emerald-100 mt-1 font-medium text-lg">
        ≈ {formatCurrency(totalAud, "AUD")}
      </p>
    </div>
    <!-- Decorative background blobs -->
    <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
  </div>

  <!-- Main Add Button (Desktop Friendly) -->
  <button
    onclick={() => showKeypad = true}
    class="w-full py-3 bg-white border-2 border-emerald-500 text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Add Expense
  </button>

  <!-- Expense List -->
  <ExpenseList {expenses} onDelete={handleDelete} />

  <!-- FAB (Mobile only, hidden on desktop to avoid clutter/duplication or kept as sticky) -->
  <!-- Keeping it for now as it's useful when scrolling a long list, but maybe hide on lg screens? -->
  <div class="fixed bottom-8 right-6 z-40 md:hidden">
    <button
      onclick={() => showKeypad = true}
      class="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      aria-label="Add Expense"
    >
      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>

  <!-- Keypad Modal -->
  {#if showKeypad}
    <Keypad
      onClose={() => showKeypad = false}
      onSave={handleAdd}
      initialDate={date}
    />
  {/if}
</div>
