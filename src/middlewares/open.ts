import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

import config from "../../config.json";

export default function OpenCheck(req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) {
	if (config.open) return done();
	res.status(400).send("This API is closed.");
}
