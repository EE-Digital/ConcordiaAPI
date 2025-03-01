import chalk from "chalk";

export default function log(message: string, module: string, type: "INFO" | "WARN" | "SEVERE_WARN" | "ERROR" = "INFO") {
	if (!process.env.LOGGING) return;
	switch (type) {
		case "INFO":
			return console.log(`[${type}] [${module}] ${message}`);
		case "WARN":
			return console.log(chalk.yellow(`[${type}] [${module}] ${message}`));
		case "SEVERE_WARN":
			return console.log(chalk.yellow.bold(`[${type}] [${module}] ${message}`));
		case "ERROR":
			return console.log(chalk.red(`[${type}] [${module}] ${message}`));
	}
}
