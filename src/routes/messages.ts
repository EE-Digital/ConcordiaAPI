import { FastifyReply, FastifyRequest } from "fastify";
import db from "../lib/database.js";
import Authorize from "../lib/authorize.js";
import InvalidAuth from "../lib/invalidAuth.js";

export default async function ApiMessages(req: FastifyRequest, res: FastifyReply) {
	const AccessToken = req.headers.authorization;
	const userId = await Authorize(AccessToken);

	if (!userId) return InvalidAuth(res);

	const messages = await db.messages.findMany();

	res.send(messages);
}
