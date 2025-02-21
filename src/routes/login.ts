import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import db from "../lib/database.js";

type BodyType = {
	username: string;
	password: string;
};

const invalidCredentials = (res: FastifyReply) => res.send({ status: 400, message: "Invalid credentials" });

export default async function ApiLogin(req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) {
	const { username, password } = req.body;

	if (!username || !password) return invalidCredentials(res);

	const user = await db.user.findFirst({ where: { name: username } });

	if (!user) return invalidCredentials(res);

	if (!bcrypt.compareSync(password, user.password)) return invalidCredentials(res);

	const token = await db.tokens.create({ data: { userId: user.id } });

	res.send({ status: 200, token: token.token });
}
