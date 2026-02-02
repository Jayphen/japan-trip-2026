import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    date: v.string(),
  }).index("by_date", ["date"]),
});
