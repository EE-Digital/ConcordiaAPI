import { FastifyReply } from "fastify";
import db from "../../modules/database.js";
import { RequestWithUser } from "../../types/RequestWithUser.js";

interface Body {
	text: string;
}

export default async function ApiUpdateMessage(req: RequestWithUser, res: FastifyReply) {
	const { text } = req.body as Body;
	const { channelId, messageId } = req.params as { messageId: string; channelId: string }; // 🤮🤮🤮 I ❤️ TS, it's so nice

	if (!text || text.length < 0) return res.send({ status: 400, message: "No message provided" });

	try {
		const newMessage = await db.message.update({
			where: {
				id: messageId,
				channelId: channelId,
				authorId: req.user!.id,
			},
			data: {
				text: text,
			},
		});
		res.send(newMessage);
	} catch (e) {
		res.status(404).send("Message not found on your account");
	}
}
