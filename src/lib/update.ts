import ServerData from "../../.serverdata.json";
import log from "./log.js";
import fs from "fs";

const updateHandler = async () => {
	const today = new Date();
	if (!(today.getTime() > Number.parseInt(ServerData.lastCheck) + 86400000)) {
		return log(`Skipping check for update, last check less than 24 hours ago`, "Updater", "WARN");
	}
	// Update last check date
	ServerData.lastCheck = today.getTime().toString();

	fs.writeFileSync(".serverdata.json", JSON.stringify(ServerData));

	// Get latest release version from GitHub
	const data = await fetch("https://api.github.com/repos/EE-Digital/ConcordiaAPI/releases/latest");
	const json = await data.json();
	const version = json.tag_name.replace("v", "");

	if (version === ServerData.version) return log("Server is up to date!", "Updater", "INFO");
	log(`Server update found! New version: ${version}, Currently running ${ServerData.version}`, "Updater", "SEVERE_WARN");

	process.env.OUTDATED = "true"; // TODO add an update script
};

export default updateHandler;
