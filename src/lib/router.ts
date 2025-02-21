import Fastify from "fastify";
import ApiRoot from "../routes/root.js";
import ApiMessages from "../routes/getMessages.js";
import ApiUser from "../routes/user.js";
import ApiSendMessage from "../routes/sendMessage.js";
import ApiLogin from "../routes/login.js";
import ApiRegister from "../routes/register.js";
import authenticatedPathRegistrator from "./authPath.js";
import ApiCreateChannel from "../routes/createChannel.js";
import ApiDeleteChannel from "../routes/deleteChannel.js";
import ApiGetChannels from "../routes/getChannels.js";
import ApiDeleteMessage from "../routes/deleteMessage.js";
import ApiUpdateMessage from "../routes/updateMessage.js";

export default async function runHTTPServer() {
	const fastify = Fastify({
		logger: true,
	});

	const authPost = authenticatedPathRegistrator(fastify, "POST");
	const authPut = authenticatedPathRegistrator(fastify, "PUT");
	const authGet = authenticatedPathRegistrator(fastify, "GET");
	const authDelete = authenticatedPathRegistrator(fastify, "DELETE");

	// Register routes

	// Unauthenticated paths
	fastify.get("/", ApiRoot);
	fastify.post("/login", ApiLogin);
	fastify.post("/register", ApiRegister);

	// Authenticated paths
	authGet("/users/:id", ApiUser);

	// Messages
	authGet("/channels/:id/messages", ApiMessages);
	authPost("/channels/:id/messages", ApiSendMessage);
	authDelete("/channels/:channelId/messages/:messageId", ApiDeleteMessage);
	authPut("/channels/:channelId/messages/:messageId", ApiUpdateMessage);

	// Channels
	authPost("/channels", ApiCreateChannel);
	authGet("/channels", ApiGetChannels);
	authDelete("/channels/:id", ApiDeleteChannel);

	// Start the server
	fastify.listen({ port: 3000 }, function (err: Error | null) {
		if (err) {
			fastify.log.error(err);
		}
	});

	return fastify;
}
