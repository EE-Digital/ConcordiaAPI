import { FastifyReply, FastifyRequest } from "fastify";
import config from "../../config.json";

export default function ApiRoot(req: FastifyRequest, res: FastifyReply) {
	res.send({
		version: config.version,
		name: config.name,
		description: config.description,
	});
}
