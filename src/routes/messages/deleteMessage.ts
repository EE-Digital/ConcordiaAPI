import { FastifyReply } from "fastify";
import db from "../../modules/database.js";
import { RequestWithUser } from "../../types/RequestWithUser.js";
import log from "../../lib/log.js";

export default async function ApiDeleteMessage(req: RequestWithUser, res: FastifyReply) {
	const { channelId, messageId } = req.params as { channelId: string; messageId: string }; // 🤮🤮🤮 I ❤️ TS, it's so nice

	const { count } = await db.message.deleteMany({
		where: {
			id: messageId,
			channelId: channelId,
			authorId: req.user!.id,
		},
	});

	if (count < 1) return res.status(404).send("Message not found"); // Return 404 if channel not found

	log(`Deleted message ${messageId} in channel ${channelId} by ${req.user!.name}`, "DeleteMessage", "INFO"); // Log the deletion

	return res.status(200).send("ok");
}
