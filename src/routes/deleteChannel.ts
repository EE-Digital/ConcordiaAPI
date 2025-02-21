import { FastifyRequest, FastifyReply } from "fastify";
import db from "../lib/database.js";

export default async function ApiDeleteChannel(req: FastifyRequest, res: FastifyReply) {
	// TODO add permissions
	const { id } = req.params as { id: string }; // Get id from url

	if (!id || id.length < 0) return res.send({ status: 400, message: "No id provided" }); // Make sure we got an id

	const { count } = await db.channel.deleteMany({ where: { id: id } }); // Delete the channel

	if (count < 1) return res.status(404).send("Channel not found"); // Return 404 if channel not found

	return res.status(200).send("ok");
}
