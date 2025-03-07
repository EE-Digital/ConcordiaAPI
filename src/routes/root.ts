import { FastifyReply, FastifyRequest } from "fastify";

export default function ApiRoot(req: FastifyRequest, res: FastifyReply) {
	return res.viewAsync("root.handlebars", {
		server: {
			name: process.env.SERVER_NAME,
			iconUrl: process.env.ICON_URL,
			description: process.env.DESCRIPTION,
			url: encodeURIComponent(process.env.URL as string),
		},
	});
}
