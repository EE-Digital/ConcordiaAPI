import { FastifyRequest, FastifyReply } from "fastify";
import db from "../lib/database.js";

export default async function ApiGetChannels(req: FastifyRequest, res: FastifyReply) {
	// TODO add permissions

	const channels = await db.channel.findMany({ omit: { createdAt: true, updatedAt: true } }); // Get all channels

	return res.status(200).send(channels);
}
