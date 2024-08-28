CREATE TABLE IF NOT EXISTS "history" (
	"id" text PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"type" text NOT NULL,
	"model" text NOT NULL,
	"serial" text,
	"date" timestamp NOT NULL,
	"customer" text,
	"phone" text,
	"email" text,
	"manager" text NOT NULL,
	"etc" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"payee" text NOT NULL,
	"notes" text,
	"date" timestamp NOT NULL,
	"account_id" text,
	"category_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
