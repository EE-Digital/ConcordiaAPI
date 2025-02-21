import { FastifyReply, FastifyRequest } from "fastify";
import db from "../lib/database.js";
import InvalidAuth from "../lib/invalidAuth.js";

export default async function ApiUser(req: FastifyRequest, res: FastifyReply) {
	const AccessToken = req.headers.authorization;

	if (!AccessToken) return InvalidAuth(res);

	const userId = await db.tokens.findFirst({ where: { token: AccessToken } });

	if (!userId) return InvalidAuth(res);

	const user = await db.user.findFirst({ where: { id: userId.userId } });

	delete (user as { password?: string }).password;

	res.send({ status: 200, user });
}
