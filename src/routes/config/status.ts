import { FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config.json";

export default function ApiStatus(req: FastifyRequest, res: FastifyReply) {
	res.send({
		iconUrl: config.iconUrl,
		version: config.version,
		name: config.name,
		description: config.description,
	});
}
