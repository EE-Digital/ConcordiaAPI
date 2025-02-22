import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../lib/database.js";

export default async function ApiGetChannels(req: FastifyRequest, res: FastifyReply) {
	const channels = await db.channel.findMany({
		// where: { permissions: { some: { permission: Permissions.CHANNEL_READ, state: PermissionState.ALLOW } } },
		omit: { createdAt: true, updatedAt: true },
	}); // Get all channels

	return res.status(200).send(channels);
}
