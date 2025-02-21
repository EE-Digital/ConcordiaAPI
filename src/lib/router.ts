import Fastify from "fastify";
import ApiRoot from "../routes/root.js";
import ApiMessages from "../routes/messages.js";
import ApiUser from "../routes/user.js";
import ApiSendMessage from "../routes/sendMessage.js";
import ApiLogin from "../routes/login.js";
import ApiRegister from "../routes/register.js";
import Authenticate from "../middlewares/authenticate.js";
import { ResolveFastifyRequestType } from "fastify/types/type-provider.js";

export default async function runHTTPServer() {
	const fastify = Fastify({
		logger: true,
	});

	// Register routes
	fastify.get("/", ApiRoot);
	fastify.get("/channels/:id/messages", ApiMessages);
	fastify.route({
		method: "POST",
		url: "/messages",
		handler: ApiSendMessage,
		preHandler: Authenticate,
	});
	// fastify.post("/messages", ApiSendMessage, { preHandler: Authenticate });
	fastify.get("/users/:id", ApiUser);
	fastify.post("/login", ApiLogin);
	fastify.post("/register", ApiRegister);

	// Start the server
	fastify.listen({ port: 3000 }, function (err: Error | null) {
		if (err) {
			fastify.log.error(err);
		}
	});

	return fastify;
}
