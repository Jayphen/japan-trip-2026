import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const toggle = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    await ctx.db.patch(args.id, { isCompleted: !task.isCompleted });
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    const existingTasks = await ctx.db.query("tasks").collect();

    if (existingTasks.length > 0) {
      return { message: "Tasks already exist, skipping seed" };
    }

    const initialTasks = [
      {
        title: "Book Flights (Jan 29-Feb 17)",
        isCompleted: true,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
      },
      {
        title: "Book All Hotels",
        isCompleted: true,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
      },
      {
        title: "Book teamLab Planets (Feb 14)",
        isCompleted: true,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
      },
      {
        title: "Book Saphir Odoriko Train (Feb 7)",
        isCompleted: true,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
      },
      {
        title: "Book Shinkansen Atami -> Kyoto (Feb 8)",
        isCompleted: true,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
      },
      {
        title: "Book Shinkansen Kyoto -> Hiroshima (Feb 12)",
        isCompleted: false,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
        dueDate: "2026-01-12",
      },
      {
        title: "Book Shinkansen Hiroshima -> Tokyo (Feb 13)",
        isCompleted: false,
        priority: "HIGH" as const,
        category: "BOOKING" as const,
        dueDate: "2026-01-13",
      },
      {
        title: "Book Shibuya Sky (Feb 16)",
        isCompleted: false,
        priority: "MEDIUM" as const,
        category: "BOOKING" as const,
        dueDate: "2026-01-16",
      },
      {
        title: "Activate eSIM (KDDI)",
        isCompleted: false,
        priority: "MEDIUM" as const,
        category: "LOGISTICS" as const,
        dueDate: "2026-01-28",
      },
      {
        title: "Fill Japan Web (Immigration QR)",
        isCompleted: false,
        priority: "MEDIUM" as const,
        category: "LOGISTICS" as const,
        dueDate: "2026-01-25",
      },
    ];

    for (const task of initialTasks) {
      await ctx.db.insert("tasks", task);
    }

    return { message: `Seeded ${initialTasks.length} tasks` };
  },
});
