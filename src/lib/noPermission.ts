import { FastifyReply } from "fastify";

export default function unauthorized(res: FastifyReply) {
	return res.status(403).send({ error: "You do not have permission to perform this action" });
}
