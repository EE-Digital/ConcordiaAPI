import { FastifyReply } from "fastify";
import db from "../../lib/database.js";
import { RequestWithUser } from "../../types/RequestWithUser.js";

interface Body {
	message: string;
}

export default async function ApiSendMessage(req: RequestWithUser, res: FastifyReply) {
	const { message } = req.body as Body;
	const { id } = req.params as { id: string }; // 🤮🤮🤮 I ❤️ TS, it's so nice

	if (!message || message.length < 0) return res.send({ status: 400, message: "No message provided" });

	const newMessage = await db.message.create({
		data: {
			text: message,
			channel: {
				connect: {
					id: id,
				},
			},
			author: {
				connect: {
					id: req.user!.id,
				},
			},
		},
	});

	res.send(newMessage);
}
