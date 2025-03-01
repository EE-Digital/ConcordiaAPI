import { Permissions, PermissionState } from "@prisma/client";
import db from "./database.js";
import bcrypt from "bcryptjs";
import chalk from "chalk";

export default async function createAdmin() {
	const roleCheck = await db.role.findFirst({ where: { title: "admin" } });

	if (roleCheck) return console.log(chalk.blue("[DEV MODE] [DEBUG] Admin role already exists"));

	const permissions = Object.values(Permissions);

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

	const passwordHash = await bcrypt.hash("admin", 10);

	await db.user.create({
		data: {
			name: "admin",
			password: passwordHash,
			roles: {
				connect: {
					title: "admin",
				},
			},
		},
	});

	console.log(chalk.blue("[DEV MODE] [DEBUG] Created admin user with all permissions"));
}
