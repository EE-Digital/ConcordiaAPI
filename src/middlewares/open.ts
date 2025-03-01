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
	if (process.env.OPEN === "tea") return teapot(res);
	if (process.env.OPEN === "cookie") return cookiejar(res);
	if (process.env.OPEN === "true") return done();
	res.status(401).send("This API is closed.");
}
