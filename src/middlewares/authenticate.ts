import { FastifyReply } from "fastify";
import db from "../lib/database.js";
import { RequestWithUser } from "../types/RequestWithUser.js";

const fuckOff = (res: FastifyReply, reason: string) => {
	console.log(`[LOG] [Auth] Unauthorized request: ${reason}`);
	res.code(401).send({ error: "Unauthorized" });
};

export default async function Authenticate(req: RequestWithUser, res: FastifyReply, next: Function) {
	const AccessToken = req.headers.authorization;

	if (!AccessToken) return fuckOff(res, "Missing access token");

	const user = await db.user.findFirst({
		where: {
			tokens: {
				some: { token: AccessToken },
			},
		},
		omit: { password: true },
		include: {
			roles: { include: { permissions: true } },
		},
	});

	if (!user) return fuckOff(res, "Invalid access token");

	req.user = user;
}
