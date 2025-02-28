import { FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config.json";

export default function ApiStatus(req: FastifyRequest, res: FastifyReply) {
	res.send({
		id: config.serverId,
		iconUrl: config.iconUrl,
		version: config.version,
		name: config.name,
		description: config.description,
	});
}
