import Fastify from "fastify";
import { FastifyRequest } from "fastify";
import Authenticate from "../middlewares/authenticate.js";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const authenticatedPathRegistrator = (fastify: Fastify.FastifyInstance, method: Method) => (url: string, handler: (req: FastifyRequest, res: Fastify.FastifyReply) => void) => {
	fastify.route({
		method,
		url,
		handler,
		preHandler: Authenticate,
	});
};
export default authenticatedPathRegistrator;
