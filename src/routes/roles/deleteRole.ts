import { FastifyReply } from "fastify";
import db from "../../lib/database.js";
import hasPermission from "../../lib/hasPermission.js";
import { Permissions } from "@prisma/client";
import { RequestWithUser } from "../../types/RequestWithUser.js";

export default async function ApiDeleteRole(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user!, Permissions.ROLE_DELETE)) return res.status(403).send("You do not have permission to delete roles");

	const { roleId } = req.params as { roleId: string };
	if (!roleId || roleId == ":roleId") return res.status(400).send("Malformed request");

	try {
		await db.role.delete({
			where: {
				title: roleId,
			},
		});
		res.status(200).send("Deleted role");
	} catch (e) {
		return res.status(500).send({ error: "Error deleting role" });
	}
}
