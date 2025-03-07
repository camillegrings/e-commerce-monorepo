import { z } from 'zod';
import { eq } from "drizzle-orm";
import { procedure, router } from '../trpc';
import { db } from "../db";
import { products, orders } from "../schema";

export const appRouter = router({
    getAll: procedure.query(async () => {
      return await db.select().from(products).orderBy(products.created_at);
    }),

    create: procedure.input(z.object({
      name: z.string(),
      category: z.string(),
      quantity: z.number(),
      price: z.number(),
    })).mutation(async ({ input }) => {
      return await db.insert(products).values(input).returning();
    }),
  
    update: procedure.input(z.object({
      id: z.number(),
      name: z.string(),
      category: z.string(),
      quantity: z.number(),
      price: z.number(),
    })).mutation(async ({ input }) => {
      return await db.update(products).set(input).where(eq(products.id, input.id)).returning();
    }),
  
    delete: procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return await db.delete(products).where(eq(products.id, input.id));
    }),
  
    createOrder: procedure.input(z.object({
      list_of_products: z.array(z.object({
        id: z.number(),
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
      })),
    })).mutation(async ({ input }) => {
      return await db.insert(orders).values(input).returning();
    }),
});

export type AppRouter = typeof appRouter;