import { FastifyReply } from "fastify";
import { RequestWithUser } from "../../types/RequestWithUser.js";
import db from "../../modules/database.js";

export default async function ApiUsers(req: RequestWithUser, res: FastifyReply) {
	const users = await db.user.findMany({});

	return res.status(200).send({ data: users });
}
