import { FastifyReply } from "fastify";
import db from "../../lib/database.js";
import log from "../../lib/log.js";
import { RequestWithUser } from "../../types/RequestWithUser.js";

export default async function ApiGetChannels(req: RequestWithUser, res: FastifyReply) {
	const channels = await db.channel.findMany({
		// where: { permissions: { some: { permission: Permissions.CHANNEL_READ, state: PermissionState.ALLOW } } },
		omit: { createdAt: true, updatedAt: true },
	}); // Get all channels

	log(`User ${req.user!.name} fetched channels`, "GetChannels", "INFO"); // Log the fetch

	return res.status(200).send(channels);
}
