import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../modules/database.js";
import { randomString } from "../../lib/randomString.js";
import { setChallenge } from "../../lib/challengeStorage.js";

export default async function ApiInitLogin(req: FastifyRequest, res: FastifyReply) {
	const { cuid } = req.body as { cuid: string };

	// Check if user exists in db
	const user = await db.user.findFirst({
		where: {
			id: cuid,
		},
	});

	// User not found trigger register
	if (!user) return res.status(200).send({ action: "register", message: "User not found" });
	if (!user.publicKey) return res.status(200).send({ action: "password", message: "User has no public key" });

	// User found trigger login
	const challengeString = randomString(512);
	const challengeStringId = randomString(32);

	setChallenge(challengeStringId, {
		userCuid: cuid,
		publicKey: user.publicKey,
		challenge: challengeString,
	});

	res.status(200).send({ action: "login", challenge: challengeString, challengeId: challengeStringId, message: "User found" });
}
