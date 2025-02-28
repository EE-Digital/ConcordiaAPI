import { FastifyReply, FastifyRequest } from "fastify";
import config from "../../config.json";

export default function ApiRoot(req: FastifyRequest, res: FastifyReply) {
	return res.viewAsync("root.handlebars", {
		server: config,
	});
}
