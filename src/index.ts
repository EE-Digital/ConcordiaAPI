import chalk from "chalk";
import createAdmin from "./modules/debug.js";
import runHTTPServer from "./modules/router.js";
import updateHandler from "./modules/update.js";
import setup from "./modules/setup.js";

if (process.env.DEV) {
	console.log(chalk.blue("Running in DEV mode"));
	createAdmin();
}

// Setup the server if it's not already setup
if (!process.env.DATABASE_URL) {
	setup().then(() => process.exit(0));
} else startServer();

function startServer() {
	// Start API server
	runHTTPServer();

	// Start update handler
	updateHandler();
	setInterval(() => {
		updateHandler();
	}, 1000 * 60 * 60 * 25); // 25 hours
}
