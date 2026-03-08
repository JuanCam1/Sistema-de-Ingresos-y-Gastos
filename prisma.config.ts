import "dotenv/config";
import { defineConfig } from "prisma/config";
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
		seed: `tsx prisma/seed.ts`,
	},
	datasource: {
		url: process.env["DATABASE_URL"],
		// url: "file:./dev.db",
	},
});
