import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  id: serial().primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  clientName: text("client_name").notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: text("email"),
  desk: varchar("desk", { length: 8 }).notNull(),
  deskName: text("desk_name").notNull(),
  service: text("service").notNull(),
  engagement: text("engagement").notNull(),
  details: text("details").notNull().default(""),
  channel: varchar("channel", { length: 20 }).notNull().default("web"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial().primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  clientName: text("client_name").notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: text("email"),
  desk: varchar("desk", { length: 8 }).notNull(),
  deskName: text("desk_name").notNull(),
  service: text("service").notNull(),
  engagement: text("engagement").notNull(),
  timeframe: text("timeframe").notNull().default(""),
  dataEntryFields: text("data_entry_fields").notNull().default(""),
  uploadChecklist: text("upload_checklist").notNull().default(""),
  deadline: text("deadline"),
  priority: varchar("priority", { length: 12 }).notNull().default("STANDARD"),
  notes: text("notes").notNull().default(""),
  channel: varchar("channel", { length: 20 }).notNull().default("web"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
