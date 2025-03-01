import { Permissions, PermissionState } from "@prisma/client";
import db from "../src/modules/database.js";
import bcrypt from "bcryptjs";
import chalk from "chalk";

const createAdmin = async () => {
	if (!process.env.ADMIN_PASSWORD) {
		throw new Error("[ERROR] [scripts/createAdmin] PASSWORD env is not defined");
	}
	if (!process.env.ADMIN_USERNAME) {
		throw new Error("[ERROR] [scripts/createAdmin] USERNAME env is not defined");
	}

	console.log("RUNNING");

	const permissions = Object.values(Permissions);
	console.log("RUNNING2");

	await db.role.create({
		data: {
			title: "admin",
			permissions: {
				createMany: {
					data: permissions.map((perm) => ({
						permission: perm,
						state: PermissionState.ALLOW,
					})),
				},
			},
		},
	});

	console.log("Created role");

	const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

	await db.user.create({
		data: {
			name: process.env.ADMIN_USERNAME,
			password: passwordHash,
			roles: {
				connect: {
					title: "admin",
				},
			},
		},
	});

	console.log("Created user");

	console.log(chalk.blue("[DEV MODE] [DEBUG] Created admin user with all permissions"));
};

createAdmin();
