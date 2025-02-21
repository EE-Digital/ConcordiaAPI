import { FastifyReply, FastifyRequest } from "fastify";
import db from "../lib/database.js";

export default async function ApiMessages(req: FastifyRequest, res: FastifyReply) {
	const messages = await db.messages.findMany();

	res.send(messages);
}
