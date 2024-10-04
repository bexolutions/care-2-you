// caregivers.ts
import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  serial,
  boolean
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { db } from './db'; // Import the db instance from your main file

// Define status enum for caregiver statuses
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Define the caregivers table
export const caregivers = pgTable('caregivers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(), // Unique email for caregivers
  contactnumber: text('contactnumber').notNull(),
  location: text('location').notNull(),
  registrationdate: timestamp('registrationdate').notNull().default(sql`CURRENT_TIMESTAMP`),
  servicesoffered: text('servicesoffered').array().notNull().default(sql`ARRAY[]::text[]`),
  qualifications: text('qualifications').array(),
  languagesspoken: text('languagesspoken').array(),
  availability: boolean('availability').notNull().default(true), // Change to boolean, // Availability status as boolean
  profileimage: text('profileimage'),
  status: statusEnum('status').notNull(), // 'active', 'inactive', 'archived'
  notes: text('notes') // Additional notes about the caregiver
});

// Define types and schemas for caregivers
export type SelectCaregiver = typeof caregivers.$inferSelect;
export const insertCaregiverSchema = createInsertSchema(caregivers);

// Function to fetch caregivers, supporting search and pagination
export async function getCaregivers(
  search: string,
  offset: number
): Promise<{
  caregivers: SelectCaregiver[];
  newOffset: number | null;
  totalCaregivers: number;
}> {
  // If there's a search query, return matching caregivers (limit to 1000)
  if (search) {
    return {
      caregivers: await db
        .select()
        .from(caregivers)
        .where(ilike(caregivers.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalCaregivers: 0
    };
  }

  // If no offset is provided, return an empty result
  if (offset === null) {
    return { caregivers: [], newOffset: null, totalCaregivers: 0 };
  }

  // Count total caregivers and fetch caregivers based on pagination
  let totalCaregivers = await db.select({ count: count() }).from(caregivers);
  let moreCaregivers = await db.select().from(caregivers).limit(5).offset(offset);
  let newOffset = moreCaregivers.length >= 5 ? offset + 5 : null;

  return {
    caregivers: moreCaregivers,
    newOffset,
    totalCaregivers: totalCaregivers[0].count
  };
}

// Function to delete a caregiver by ID
export async function deleteCaregiverById(id: number) {
  await db.delete(caregivers).where(eq(caregivers.id, id));
}

export type CaregiverEntry = {
  name: string;
  email: string;
  contactnumber: string;
  location: string;
  registrationdate: Date;
  servicesoffered: string[];
  qualifications?: string[]; // Array of qualifications
  languagesspoken?: string[]; // Array of languages spoken
  availability: boolean; // Caregiver availability status
  profileimage?: string; // URL to caregiver's profile image
  status: 'active' | 'inactive' | 'archived'; // Caregiver status
  notes?: string; // Additional notes about the caregiver
};
