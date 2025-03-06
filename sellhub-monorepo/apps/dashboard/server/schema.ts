import { pgTable, serial, text, integer, timestamp, json } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  // deleted_at: timestamp("deleted_at").nullable(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  list_of_products: json("list_of_products").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  // deleted_at: timestamp("deleted_at").nullable(),
});
