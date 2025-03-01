import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../modules/database.js";

export default async function ApiRoles(req: FastifyRequest, res: FastifyReply) {
	const roles = await db.role.findMany({
		include: { permissions: { omit: { roleId: true, channelId: true } } },
	});

	res.status(200).send(roles);
}
