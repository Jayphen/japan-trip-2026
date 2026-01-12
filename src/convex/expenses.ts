import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    date: v.optional(v.string()), // Optional: filter by specific date (YYYY-MM-DD)
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("expenses");
    
    if (args.date) {
      q = q.filter((q) => q.eq(q.field("date"), args.date));
    }
    
    // Sort by timestamp descending (newest first)
    // Note: In a real app with index, we'd use .withIndex
    const expenses = await q.collect();
    return expenses.sort((a, b) => b.timestamp - a.timestamp);
  },
});

export const add = mutation({
  args: {
    amount: v.number(),
    description: v.string(),
    category: v.union(
      v.literal("FOOD"),
      v.literal("TRANSPORT"),
      v.literal("SHOPPING"),
      v.literal("ACCOMMODATION"),
      v.literal("ENTERTAINMENT"),
      v.literal("MISC")
    ),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("expenses", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
