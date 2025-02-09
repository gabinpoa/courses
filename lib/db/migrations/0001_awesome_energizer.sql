CREATE TYPE "public"."content_types" AS ENUM('MDX', 'VIDEO');--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"content_type" "content_types" NOT NULL,
	"content" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"is_extra_content" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE no action ON UPDATE no action;