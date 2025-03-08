import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import db from "../../modules/database.js";
import crypto from "crypto";
import log from "../../lib/log.js";
import { getAndDeleteChallenge } from "../../lib/challengeStorage.js";
import { isCuid } from "@paralleldrive/cuid2";
import { safeUser } from "../../lib/safeData.js";


type BodyType = {
	cuid: string;
	challengeId: string;
	signedChallenge: string;
};

export default async function ApiLogin(req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) {
	const { cuid, challengeId, signedChallenge } = req.body;

	// Make sure cuid is a valid cuid
	if (!isCuid(cuid)) return res.status(400).send({ message: "Invalid cuid!" });

	const challenge = getAndDeleteChallenge(challengeId);

	// Check if challengeId is valid
	if (!challenge) return res.status(400).send({ message: "Invalid challengeId" });

	// Make sure cuid is  the same
	if (challenge.userCuid !== cuid) return res.status(403).send({ message: "Invalid cuid" });

	// Get user if exists
	const user = await db.user.findFirst({
		where: {
			id: cuid,
		},
	});

	// Make sure user exists
	if (!user) return res.status(400).send({ message: "User not found" });

	const verifier = crypto.createVerify("RSA-SHA256");
	verifier.update(challenge.challenge);
	const isValid = verifier.verify(user.publicKey!, signedChallenge, "base64");

	if (!isValid) return res.status(403).send({ message: "Invalid signature" });

	const token = await db.token.create({
		data: {
			userId: user.id,
			token: crypto.randomBytes(64).toString("hex"),
		},
	});

	log(`User ${user.name} logged in`, "Login", "INFO");
  
	return res.status(200).send({ status: 200, token: token.token, user: safeUser(user) });
}
