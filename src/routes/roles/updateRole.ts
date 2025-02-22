import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../lib/database.js";
import hasPermission from "../../lib/hasPermission.js";
import { Permissions } from "@prisma/client";
import { RequestWithUser } from "../../types/RequestWithUser.js";

export default async function ApiUpdateRoles(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user!, Permissions.ROLE_UPDATE)) res.status(403).send({ error: "You do not have permission to update roles" });

	const { roleId } = req.params as { roleId: string };
	const { title, permissions } = req.body as { title?: string; permissions: [] };
	if (!roleId || roleId == ":roleId" || !req.body) return res.status(400).send("Malformed request");

	try {
		const role = await db.role.update({
			where: {
				title: roleId,
			},
			data: {
				title,
				permissions: {
					deleteMany: {},
					create: permissions,
				},
			},
			include: { permissions: { omit: { roleId: true, channelId: true } } },
		});
		res.status(200).send(role);
	} catch (e) {
		return res.status(500).send({ error: "Error updating role" });
	}
}
