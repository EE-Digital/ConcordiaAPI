import dotenv from "dotenv";
import chalk from "chalk";
import setup from "./modules/setup.js";
import { spawn } from "child_process";

dotenv.config();

if (process.env.DEV) {
	console.log(chalk.blue("Running in DEV mode"));
}

console.log(`[MAIN] [INFO] .env existing ${process.env.DATABASE_URL ? "✅" : "❌"}`);

// Setup the server if it's not already setup
if (!process.env.DATABASE_URL) {
	setup().then(() => process.exit(0));
}

// Start the server
else {
	const server = spawn("npx tsx src/start.ts", { shell: true, cwd: process.cwd(), env: process.env });
}
