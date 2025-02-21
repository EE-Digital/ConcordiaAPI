import { FastifyReply, FastifyRequest } from "fastify";
import db from "../lib/database.js";
import InvalidAuth from "../lib/invalidAuth.js";
import Authorize from "../lib/authorize.js";

interface Body {
	message: string;
}

export default async function ApiSendMessage(req: FastifyRequest<{ Body: Body }>, res: FastifyReply) {
	const { message } = req.body;
	const AccessToken = req.headers.authorization;

	if (!message || message.length < 0) return res.send({ status: 400, message: "No message provided" });

	const userId = await Authorize(AccessToken);
	if (!userId) return InvalidAuth(res);

	const newMessage = await db.messages.create({
		data: {
			text: message,
			author: {
				connect: {
					id: userId,
				},
			},
		},
	});

	res.send(newMessage);
}
