CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY,
	"reference" varchar(24) NOT NULL UNIQUE,
	"client_name" text NOT NULL,
	"phone" varchar(40) NOT NULL,
	"email" text,
	"desk" varchar(8) NOT NULL,
	"desk_name" text NOT NULL,
	"service" text NOT NULL,
	"engagement" text NOT NULL,
	"timeframe" text DEFAULT '' NOT NULL,
	"data_entry_fields" text DEFAULT '' NOT NULL,
	"upload_checklist" text DEFAULT '' NOT NULL,
	"deadline" text,
	"priority" varchar(12) DEFAULT 'STANDARD' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"channel" varchar(20) DEFAULT 'web' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY,
	"reference" varchar(24) NOT NULL UNIQUE,
	"client_name" text NOT NULL,
	"phone" varchar(40) NOT NULL,
	"email" text,
	"desk" varchar(8) NOT NULL,
	"desk_name" text NOT NULL,
	"service" text NOT NULL,
	"engagement" text NOT NULL,
	"details" text DEFAULT '' NOT NULL,
	"channel" varchar(20) DEFAULT 'web' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
