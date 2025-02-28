import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import db from "../../lib/database.js";
import crypto from "crypto";
import log from "../../lib/log.js";

type BodyType = {
	username: string;
	password: string;
};

const invalidCredentials = (res: FastifyReply) => res.status(400).send({ message: "Invalid credentials" });

export default async function ApiLogin(req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) {
	const { username, password } = req.body;

	if (!username || !password) return invalidCredentials(res);

	const user = await db.user.findFirst({ where: { name: username } });

	if (!user) return invalidCredentials(res);

	if (!bcrypt.compareSync(password, user.password)) return invalidCredentials(res);

	const secureToken = crypto.randomBytes(64).toString("hex");

	const token = await db.token.create({ data: { token: secureToken, userId: user.id } });

	log(`User ${user.name} logged in`, "Login", "INFO");

	return res.status(200).send({ token: token.token });
}
