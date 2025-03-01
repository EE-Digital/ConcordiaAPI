import { FastifyReply, FastifyRequest } from "fastify";

export default function ApiRoot(req: FastifyRequest, res: FastifyReply) {
	return res.viewAsync("root.handlebars", {
		server: {
			name: process.env.NAME,
			iconUrl: process.env.ICON_URL,
			description: process.env.DESCRIPTION,
			url: process.env.URL,
		},
	});
}
