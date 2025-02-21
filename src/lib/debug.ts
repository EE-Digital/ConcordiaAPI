import { Permissions, PermissionState } from "@prisma/client";
import db from "./database.js";

export default async function createAdmin() {
	const roleCheck = await db.role.findFirst({ where: { title: "admin" } });

	if (roleCheck) return console.log("[DEV MODE] [DEBUG] Admin role already exists");

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

	console.log("[DEV MODE] [DEBUG] Created admin role with all permissions");
}
