import { FastifyReply } from "fastify";
import { RequestWithUser } from "../../types/RequestWithUser.js";
import db from "../../lib/database.js";

export default async function ApiDeleteTokens(req: RequestWithUser, res: FastifyReply) {
	await db.token.deleteMany({
		where: {
			userId: req.user!.id,
		},
	});

	res.status(200).send({ message: "Logged out of all sessions" });
}
