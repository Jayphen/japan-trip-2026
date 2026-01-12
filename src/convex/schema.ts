import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    dueDate: v.optional(v.string()),
    category: v.union(v.literal("BOOKING"), v.literal("LOGISTICS"), v.literal("FUN")),
    isCompleted: v.boolean(),
    priority: v.union(v.literal("HIGH"), v.literal("MEDIUM"), v.literal("LOW")),
  }),
  expenses: defineTable({
    amount: v.number(), // In JPY
    description: v.string(),
    category: v.union(
      v.literal("FOOD"),
      v.literal("TRANSPORT"),
      v.literal("SHOPPING"),
      v.literal("ACCOMMODATION"),
      v.literal("ENTERTAINMENT"),
      v.literal("MISC")
    ),
    date: v.string(), // YYYY-MM-DD
    timestamp: v.number(),
  }),
});
