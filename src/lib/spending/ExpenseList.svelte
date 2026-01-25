<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade, slide } from "svelte/transition";
  import CategoryIcon from "./CategoryIcon.svelte";
  import { formatCurrency, convertToHomeCurrency } from "$lib/currency";
  import type { Id } from "../../convex/_generated/dataModel";

  interface Expense {
    _id: Id<"expenses">;
    amount: number;
    description: string;
    category: string;
    date: string;
    timestamp: number;
  }

  interface Props {
    expenses: Expense[];
    onDelete: (id: Id<"expenses">) => void;
  }

  let { expenses, onDelete } = $props();
</script>

<div class="space-y-3">
  {#if expenses.length === 0}
    <div class="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <p>No expenses recorded for this day.</p>
    </div>
  {:else}
    {#each expenses as expense (expense._id)}
      <div
        animate:flip={{ duration: 300 }}
        transition:slide={{ duration: 200 }}
        class="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex items-center gap-3"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <CategoryIcon category={expense.category} size="sm" />
        </div>

        <!-- Details -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 truncate">{expense.description}</p>
          <p class="text-xs text-gray-500">{expense.category}</p>
        </div>

        <!-- Amount -->
        <div class="text-right">
          <div class="font-bold text-gray-900">{formatCurrency(expense.amount, "JPY")}</div>
          <div class="text-xs text-gray-500">≈ {formatCurrency(await convertToHomeCurrency(expense.amount, expense.date), "AUD")}</div>
        </div>

        <!-- Delete Action (Swipe or Button) -->
        <button
          onclick={() => onDelete(expense._id)}
          class="p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete expense"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/each}
  {/if}
</div>
