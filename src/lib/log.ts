import config from "../../config.json";

export default function log(message: string, module: string, type: "INFO" | "WARN" | "ERROR" = "INFO") {
	if (!config.logging) return;
	return console.log(`[${type}] [${module}] ${message}`);
}
