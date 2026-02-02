import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("expenses")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .collect();
  },
});

export const add = mutation({
  args: {
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", args);
  },
});

export const remove = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
