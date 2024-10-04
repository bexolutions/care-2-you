// merchants.ts
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

// Define status enum for merchant statuses
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Define the merchants table
export const merchants = pgTable('merchants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  contactnumber: text('contactnumber').notNull(),
  website: text('website'),
  status: statusEnum('status').notNull(), // 'active', 'inactive', 'archived'
  location: text('location').notNull(),
  registrationdate: timestamp('registrationdate').notNull(),
  branche: text('branche').notNull(),
  firmentyp: text('firmentyp').notNull(),
  offers: text('offers')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  accessibilityfeatures: text('accessibilityfeatures')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  languagesspoken: text('languagesspoken')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  pricing: text('pricing').notNull()
});

// Define types and schemas for merchants
export type SelectMerchant = typeof merchants.$inferSelect;
export const insertMerchantSchema = createInsertSchema(merchants);

// Function to fetch merchants, supporting search and pagination
export async function getMerchants(
  search: string,
  offset: number
): Promise<{
  merchants: SelectMerchant[];
  newOffset: number | null;
  totalMerchants: number;
}> {
  // If there's a search query, return matching merchants (limit to 1000)
  if (search) {
    return {
      merchants: await db
        .select()
        .from(merchants)
        .where(ilike(merchants.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalMerchants: 0
    };
  }

  // If no offset is provided, return an empty result
  if (offset === null) {
    return { merchants: [], newOffset: null, totalMerchants: 0 };
  }

  // Count total merchants and fetch merchants based on pagination
  let totalMerchants = await db.select({ count: count() }).from(merchants);
  let moreMerchants = await db.select().from(merchants).limit(5).offset(offset);
  let newOffset = moreMerchants.length >= 5 ? offset + 5 : null;

  return {
    merchants: moreMerchants,
    newOffset,
    totalMerchants: totalMerchants[0].count
  };
}

// Function to delete a merchant by ID
export async function deleteMerchantById(id: number) {
  await db.delete(merchants).where(eq(merchants.id, id));
}

export type MerchantEntry = {
  name: string;
  email: string;
  contactnumber: string;
  website?: string;
  status: 'active' | 'inactive' | 'archived';
  location: string;
  registrationdate: Date;
  branche: string;
  firmentyp: string;
  offers: string[];
  accessibilityfeatures: string[];
  languagesspoken: string[];
  pricing: string;
};
