import { FastifyReply } from "fastify";
import db from "../lib/database.js";
import RequestWithUser from "../types/RequestWithUser.js";

const fuckOff = (res: FastifyReply) => res.code(401).send({ error: "Unauthorized" });

export default async function Authenticate(req: RequestWithUser, res: FastifyReply, next: Function) {
	const AccessToken = req.headers.authorization;

	if (!AccessToken) return fuckOff(res);

	const user = await db.user.findFirst({
		where: {
			tokens: {
				some: { token: AccessToken },
			},
		},
	});

	if (!user) return fuckOff(res);

	delete (user as { password?: string }).password;
	req.user = user;

	next();
}
