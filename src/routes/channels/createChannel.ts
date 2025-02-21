import { FastifyRequest, FastifyReply } from "fastify";
import db from "../../lib/database.js";

interface Body {
	title: string;
	description: string;
}

export default async function ApiCreateChannel(req: FastifyRequest, res: FastifyReply) {
	// TODO add permissions

	const { title, description } = req.body as Body;

	if (!title || title.length < 0) return res.send({ status: 400, message: "No title provided" });

	const channel = await db.channel.create({ data: { title: title, description: description } });

	return res.send(channel);
}
