<script lang="ts">
	import type { Id } from "../../convex/_generated/dataModel";

	interface Task {
		_id: Id<"tasks">;
		title: string;
		dueDate?: string;
		category: "BOOKING" | "LOGISTICS" | "FUN";
		isCompleted: boolean;
		priority: "HIGH" | "MEDIUM" | "LOW";
	}

	interface Props {
		daysUntil: number;
		tasks: Task[] | undefined;
		handleToggle: (taskId: string) => void;
		handleSeed: () => void;
		currentDate: Date;
	}

	let { daysUntil, tasks, handleToggle, handleSeed, currentDate }: Props = $props();

	function isOverdue(task: Task): boolean {
		if (!task.dueDate) return false;
		const dueDate = new Date(task.dueDate);
		return dueDate < currentDate && !task.isCompleted;
	}

	function formatDueDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	}

	const categoryColors = {
		BOOKING: "bg-blue-100 text-blue-800",
		LOGISTICS: "bg-green-100 text-green-800",
		FUN: "bg-purple-100 text-purple-800",
	};

	const priorityEmojis = {
		HIGH: "🔴",
		MEDIUM: "🟡",
		LOW: "🟢",
	};
</script>

<div class="space-y-6">
	<!-- Countdown Card -->
	<div class="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-indigo-200">
		<h2 class="text-3xl font-bold text-indigo-900 mb-2">
			{daysUntil} {daysUntil === 1 ? "Day" : "Days"} until Japan
		</h2>
		<p class="text-gray-600">Jan 29 - Feb 17, 2026</p>
	</div>

	<!-- Tasks Section -->
	<div class="bg-white rounded-xl shadow-lg p-8">
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold text-indigo-900">Pre-Trip Checklist</h2>
			{#if tasks && tasks.length === 0}
				<button
					onclick={handleSeed}
					class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
				>
					Seed Tasks
				</button>
			{/if}
		</div>

		{#if !tasks}
			<div class="text-center py-8">
				<p class="text-gray-500">Loading tasks...</p>
			</div>
		{:else if tasks.length === 0}
			<div class="text-center py-8">
				<p class="text-gray-500">No tasks yet. Click "Seed Tasks" to get started!</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each tasks as task (task._id)}
					<div
						class="flex items-center gap-4 p-4 rounded-lg border-2 transition-all {isOverdue(task)
							? 'border-red-300 bg-red-50'
							: 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'}"
					>
						<button
							onclick={() => handleToggle(task._id)}
							class="flex-shrink-0 w-6 h-6 rounded-full border-2 {task.isCompleted
								? 'bg-indigo-600 border-indigo-600'
								: 'border-gray-300 hover:border-indigo-400'} flex items-center justify-center transition-all"
						>
							{#if task.isCompleted}
								<svg
									class="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{/if}
						</button>

						<div class="flex-1">
							<div class="flex items-center gap-2 mb-1">
								<span class="text-lg" title="Priority">{priorityEmojis[task.priority]}</span>
								<span
									class="text-gray-900 {task.isCompleted ? 'line-through text-gray-500' : ''}"
								>
									{task.title}
								</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="text-xs px-2 py-1 rounded-full {categoryColors[task.category]}">
									{task.category}
								</span>
								{#if task.dueDate}
									<span
										class="text-xs px-2 py-1 rounded-full {isOverdue(task)
											? 'bg-red-100 text-red-800 font-semibold'
											: 'bg-gray-100 text-gray-700'}"
									>
										Due: {formatDueDate(task.dueDate)}
									</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Stats -->
			<div class="mt-6 pt-6 border-t border-gray-200">
				<div class="flex justify-around text-center">
					<div>
						<div class="text-2xl font-bold text-indigo-600">
							{tasks.filter((t) => t.isCompleted).length}
						</div>
						<div class="text-sm text-gray-600">Completed</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-gray-600">
							{tasks.filter((t) => !t.isCompleted).length}
						</div>
						<div class="text-sm text-gray-600">Remaining</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-red-600">
							{tasks.filter((t) => isOverdue(t)).length}
						</div>
						<div class="text-sm text-gray-600">Overdue</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
