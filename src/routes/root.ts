import { FastifyReply, FastifyRequest } from "fastify";
import config from "../../config.json";

export default function ApiRoot(req: FastifyRequest, res: FastifyReply) {
	console.log(config);

	if (!config.open) res.send({ status: 400, message: "This API is closed." });

	res.send({
		version: config.version,
		name: config.name,
		description: config.description,
	});
}
