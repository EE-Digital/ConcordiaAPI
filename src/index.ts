import chalk from "chalk";
import createAdmin from "./modules/debug.js";
import runHTTPServer from "./modules/router.js";
import updateHandler from "./modules/update.js";

if (process.env.DEV) {
	console.log(chalk.blue("Running in DEV mode"));
	createAdmin();
}

// Start the server
runHTTPServer();

// Start update handler
updateHandler();
setInterval(() => {
	updateHandler();
}, 1000 * 60 * 60 * 25); // 25 hours
