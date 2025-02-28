import { FastifyReply } from "fastify";
import { RequestWithUser } from "../../types/RequestWithUser.js";

export default async function ApiUser(req: RequestWithUser, res: FastifyReply) {
	return res.send({ status: 200, data: req.user });
}
