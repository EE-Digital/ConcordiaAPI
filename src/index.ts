import createAdmin from "./lib/debug.js";
import runHTTPServer from "./lib/router.js";

if (process.env.DEV) {
	console.log("Running in DEV mode");
	createAdmin();
}

// Start the server
runHTTPServer();
