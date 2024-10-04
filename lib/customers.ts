// customers.ts
import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { db } from './db'; // Import the db instance from your main file

// Define status enum for customer statuses
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Define the customers table
export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  contactnumber: text('contactnumber').notNull(),
  location: text('location').notNull(),
  registrationdate: timestamp('registrationdate').notNull(),
  servicesneeded: text('servicesneeded').array().notNull().default(sql`ARRAY[]::text[]`),
  notes: text('notes'), // Additional notes or details about the customer
  status: statusEnum('status').notNull(), // 'active', 'inactive', 'archived'
});

// Define types and schemas for customers
export type SelectCustomer = typeof customers.$inferSelect;
export const insertCustomerSchema = createInsertSchema(customers);

// Function to fetch customers, supporting search and pagination
export async function getCustomers(
  search: string,
  offset: number
): Promise<{
  customers: SelectCustomer[];
  newOffset: number | null;
  totalCustomers: number;
}> {
  // If there's a search query, return matching customers (limit to 1000)
  if (search) {
    return {
      customers: await db
        .select()
        .from(customers)
        .where(ilike(customers.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalCustomers: 0
    };
  }

  // If no offset is provided, return an empty result
  if (offset === null) {
    return { customers: [], newOffset: null, totalCustomers: 0 };
  }

  // Count total customers and fetch customers based on pagination
  let totalCustomers = await db.select({ count: count() }).from(customers);
  let moreCustomers = await db.select().from(customers).limit(5).offset(offset);
  let newOffset = moreCustomers.length >= 5 ? offset + 5 : null;

  return {
    customers: moreCustomers,
    newOffset,
    totalCustomers: totalCustomers[0].count
  };
}

// Function to delete a customer by ID
export async function deleteCustomerById(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
}

export type CustomerEntry = {
  name: string;
  email: string;
  contactnumber: string;
  location: string;
  registrationdate: Date;
  servicesneeded: string[];
  notes?: string; // Additional notes or details about the customer
  status: 'active' | 'inactive' | 'archived';
};
