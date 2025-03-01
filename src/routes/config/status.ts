import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";

export default async function ApiStatus(req: FastifyRequest, res: FastifyReply) {
	const ServerData = JSON.parse(fs.readFileSync(".serverdata.json").toString());
	res.send({
		version: ServerData.version,
		iconUrl: process.env.ICON_URL,
		name: process.env.NAME,
		description: process.env.DESCRIPTION,
	});
}
