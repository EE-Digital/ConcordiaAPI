import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../lib/database.js";

export default async function ApiDeleteChannel(req: FastifyRequest, res: FastifyReply) {
	// TODO add permissions
	const { channelId } = req.params as { channelId: string }; // Get id from url

	if (!channelId || channelId.length < 0) return res.send({ status: 400, message: "No id provided" }); // Make sure we got an id

	const { count } = await db.channel.deleteMany({ where: { id: channelId } }); // Delete the channel

	if (count < 1) return res.status(404).send("Channel not found"); // Return 404 if channel not found

	return res.status(200).send("ok");
}
