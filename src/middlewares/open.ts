//@ts-nocheck
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

import config from "../../config.json";

const teapot = (res: FastifyReply) => {
	console.log("[LOG] [Open] I am a teapot");
	res.status(418).send("I'm a teapot."); // 🫖
};

const cookiejar = (res: FastifyReply) => {
	console.log("[LOG] [Open] I am a cookiejar");
	res.status(410).send("I'm a cookiejar."); // 🫖
};

export default function OpenCheck(req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) {
	if (config.open === "tea") return teapot(res);
	if (config.open === "cookie") return cookiejar(res);
	if (config.open) return done();
	res.status(400).send("This API is closed.");
}
