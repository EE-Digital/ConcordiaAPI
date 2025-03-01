import { FastifyReply, FastifyRequest } from "fastify";
import ServerData from "../../../.serverdata.json";

export default async function ApiStatus(req: FastifyRequest, res: FastifyReply) {
	res.send({
		id: ServerData.id,
		version: ServerData.version,
		iconUrl: process.env.ICON_URL,
		name: process.env.NAME,
		description: process.env.DESCRIPTION,
	});
}
