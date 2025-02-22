import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../lib/database.js";
import hasPermission from "../../lib/hasPermission.js";
import { RequestWithUser } from "../../types/RequestWithUser.js";
import { Permission, Permissions } from "@prisma/client";

export default async function ApiCreateRoles(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user!, Permissions.ROLE_CREATE)) return res.status(403).send("You do not have permission to create a role");

	if (!req.body) return res.status(400).send("No body provided");

	const { title, permissions } = req.body as { title: string; permissions: Permission[] };

	try {
		const role = await db.role.create({
			data: {
				title: title,
				permissions: {
					create: permissions,
				},
			},
			include: { permissions: { omit: { roleId: true, channelId: true } } },
		});
		res.status(200).send(role);
	} catch (e) {
		return res.status(500).send({ error: "Error creating role" });
	}
}
