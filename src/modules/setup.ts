import { confirm, input, password } from "@inquirer/prompts";
import { PrismaClient } from "@prisma/client/extension";
import chalk from "chalk";
import { exec, execSync } from "child_process";
import mysql from "mysql2/promise";
import fs from "fs";

const validateServerName = (servername: string) => {
	servername = servername.trim();
	if (servername.length < 3 || servername.length > 20) return "Server name must be between 3 and 20 characters";
	return true;
};

const validateDescription = (description: string) => {
	description = description.trim();
	if (description.length > 100) return "Server description must be less than or 100 characters";
	return true;
};

const validateUsername = (username: string) => {
	username = username.trim();
	if (username.length < 3 || username.length > 20) return "Username must be between 3 and 20 characters";
	if (!/^[a-zA-Z0-9]+$/g.test(username)) return "Username must be alphanumeric";
	return true;
};

const validatePassword = (password: string) => {
	password = password.trim();
	if (!/[0-9]+/g.test(password)) return "Password must contain at least one number";
	if (!/[a-z]+/g.test(password)) return "Password must contain at least one lowercase letter";
	if (!/[A-Z]+/g.test(password)) return "Password must contain at least one uppercase letter";
	return true;
};

const setupDatabase = async () => {
	const database = {
		dbUser: await input({ message: "Username: ", required: true }),
		dbPassword: await password({ message: "Password: " }),
		dbHost: await input({ message: "Host(IP:PORT): ", required: true }),
		dbName: await input({ message: "Database name: ", required: true }),
		dbUrl: "",
	};

	const dbUrl = `mysql://${database.dbUser}:${database.dbPassword}@${database.dbHost}/${database.dbName}`;

	try {
		const connection = await mysql.createConnection(dbUrl);
		if (connection) connection.end();

		console.log(chalk.green("[SETUP] Database test connection successful!"));
		database.dbUrl = dbUrl;
	} catch (error) {
		console.error(chalk.red.bold("[SETUP] Database connection failed!"));
		console.error(chalk.red(`[SETUP] Please check your database credentials ${chalk.bold.underline("and that the database is running")}.`));
		return null;
	}

	return database;
};
type Database = Awaited<ReturnType<typeof setupDatabase>>;

const setupPrisma = async (database: Database) => {
	console.log(chalk.green("[SETUP] Checking for existing database schema..."));

	console.log(chalk.green("[SETUP] Creating database schema..."));
	// TODO save to file
	fs.writeFileSync("./.env", `DATABASE_URL=${database!.dbUrl}`);
	const data = execSync(`npx prisma migrate deploy`);

	console.log(data.toString("utf8"));

	console.log(chalk.green("[SETUP] Database schema created!"));
};

const setup = async () => {
	let database: Database | null = null;

	console.log(chalk.green("[SETUP] Starting server setup..."));

	console.log(chalk.green("\n[SETUP] Database configuration:"));

	do {
		database = await setupDatabase();
	} while (!database);

	const setup = await confirm({ message: "Create database schema?", default: true });
	if (setup) setupPrisma(database);

	console.log(chalk.green("\n[SETUP] Server configuration:"));
	const serverName = (await input({ message: "Server name: ", required: true, validate: validateServerName })).trim();
	const description = (await input({ message: "Server description: ", validate: validateDescription })).trim();
	const logEvents = await confirm({ message: "Log events?", default: true });

	console.log(chalk.green("\n[SETUP] Admin user:"));
	const adminName = (await input({ message: "Username: ", required: true, validate: validateUsername })).trim();
	const adminPassword = await password({ message: "Password: ", validate: validatePassword });
};

export default setup;
