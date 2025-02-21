import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../lib/database.js";

export default async function ApiMessages(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.params as { id: string };

	const messages = await db.message.findMany({ where: { channelId: id }, include: { author: { omit: { password: true } } } });

	res.send(messages);
}
