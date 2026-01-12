<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { CATEGORIES, convertToHomeCurrency, formatCurrency } from "$lib/currency";
  import CategoryIcon from "./CategoryIcon.svelte";

  interface Props {
    onClose: () => void;
    onSave: (amount: number, description: string, category: string) => void;
    initialDate: string; // Just for context if needed
  }

  let { onClose, onSave } = $props();

  let amountStr = $state("0");
  let description = $state("");
  let selectedCategory = $state("FOOD");

  let amount = $derived(parseInt(amountStr.replace(/^0+/, "") || "0"));
  let converted = $derived(convertToHomeCurrency(amount));

  function handleDigit(digit: string) {
    if (amountStr.length >= 7) return; // Limit length
    if (amountStr === "0") amountStr = digit;
    else amountStr += digit;
  }

  function handleBackspace() {
    if (amountStr.length <= 1) amountStr = "0";
    else amountStr = amountStr.slice(0, -1);
  }

  function handleClear() {
    amountStr = "0";
  }

  function handleSave() {
    if (amount === 0) return;
    onSave(amount, description || "Expense", selectedCategory);
    onClose();
  }
</script>

<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 sm:p-0" transition:fade={{ duration: 200 }}>
  <!-- Backdrop -->
  <div 
    class="absolute inset-0 bg-black/60 backdrop-blur-sm" 
    onclick={onClose}
    role="button"
    tabindex="-1"
  ></div>

  <!-- Modal -->
  <div 
    class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    transition:fly={{ y: 200, duration: 300 }}
  >
    <!-- Header -->
    <div class="p-4 bg-rose-50 border-b border-rose-100 flex justify-between items-center">
      <h3 class="font-bold text-rose-900 text-lg">Add Expense</h3>
      <button onclick={onClose} class="p-2 text-rose-400 hover:text-rose-700 rounded-full hover:bg-rose-100">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Display -->
    <div class="p-6 text-center space-y-1">
      <div class="text-4xl font-bold text-gray-900 tracking-tight">
        {formatCurrency(amount, "JPY")}
      </div>
      <div class="text-lg text-gray-500 font-medium">
        ≈ {formatCurrency(converted, "AUD")}
      </div>
    </div>

    <!-- Inputs -->
    <div class="px-4 pb-2 space-y-4">
      <!-- Categories -->
      <div class="flex gap-3 overflow-x-auto py-2 no-scrollbar">
        {#each CATEGORIES as cat}
          <button
            class="flex flex-col items-center gap-1 min-w-[64px] transition-all"
            class:opacity-100={selectedCategory === cat.id}
            class:opacity-50={selectedCategory !== cat.id}
            class:scale-110={selectedCategory === cat.id}
            onclick={() => selectedCategory = cat.id}
          >
            <div class={`rounded-full p-2 ${selectedCategory === cat.id ? `bg-${cat.color} text-white shadow-md` : `bg-${cat.bgColor} text-${cat.textColor}`}`}>
              <CategoryIcon category={cat.id} size="sm" />
            </div>
            <span class="text-xs font-medium text-gray-600 truncate w-full text-center">{cat.label}</span>
          </button>
        {/each}
      </div>

      <!-- Description -->
      <input
        type="text"
        placeholder="What is it? (e.g. Ramen, Ticket)"
        bind:value={description}
        class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
    </div>

    <!-- Keypad -->
    <div class="grid grid-cols-3 gap-1 p-2 bg-gray-50 mt-2">
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as num}
        <button
          class="h-16 bg-white rounded-lg shadow-sm text-2xl font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          onclick={() => handleDigit(num.toString())}
        >
          {num}
        </button>
      {/each}
      <button
        class="h-16 bg-white rounded-lg shadow-sm text-2xl font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        onclick={() => handleDigit("0")}
      >
        0
      </button>
      <button
        class="h-16 bg-white rounded-lg shadow-sm text-2xl font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        onclick={() => handleDigit("00")}
      >
        00
      </button>
      <button
        class="h-16 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        onclick={handleBackspace}
      >
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
        </svg>
      </button>
      <button
        class="h-16 bg-white rounded-lg shadow-sm text-xl font-medium text-red-500 hover:bg-red-50 active:scale-95 transition-all col-span-3 mt-1"
        onclick={handleClear}
      >
        Clear All
      </button>
    </div>

    <!-- Save Button -->
    <div class="p-4 bg-gray-50">
      <button
        class="w-full py-4 bg-rose-600 text-white rounded-xl text-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={amount === 0}
        onclick={handleSave}
      >
        Save Expense
      </button>
    </div>
  </div>
</div>
