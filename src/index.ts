import chalk from "chalk";
import setup from "./modules/setup.js";
import { exec } from "child_process";

if (process.env.DEV) {
	console.log(chalk.blue("Running in DEV mode"));
}

// Setup the server if it's not already setup
if (!process.env.DATABASE_URL) {
	setup().then(() => process.exit(0));
}

// Start the server
exec("npx tsx src/start.ts", (err, stdout, stderr) => {
	console.log(stdout);
	console.error(stderr);
});
