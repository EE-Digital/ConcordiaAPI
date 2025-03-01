import { FastifyReply, FastifyRequest } from "fastify";
import db from "../../modules/database.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import log from "../../lib/log.js";

type BodyType = {
	username: string;
	password: string;
};

export default async function ApiRegister(req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) {
	const { username, password } = req.body ?? { username: undefined, password: undefined };

	if (!username || !password) return res.send({ status: 400, message: "Invalid credentials" });

	const userCheck = await db.user.findFirst({ where: { name: username } });

	if (userCheck) return res.send({ status: 400, message: "User already exists" });

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await db.user.create({ data: { name: username, password: passwordHash } });
	delete (user as { password?: string }).password;

	const secureToken = crypto.randomBytes(64).toString("hex");
	const token = await db.token.create({ data: { token: secureToken, userId: user.id } });

	log(`New user ${user.name}`, "Register", "INFO");

	return res.send({ status: 200, token: token.token, user });
}
