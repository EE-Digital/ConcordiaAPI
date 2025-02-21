import Fastify from "fastify";
import ApiRoot from "../routes/root.js";
import ApiMessages from "../routes/messages/getMessages.js";
import ApiUser from "../routes/auth/user.js";
import ApiSendMessage from "../routes/messages/sendMessage.js";
import ApiLogin from "../routes/auth/login.js";
import ApiRegister from "../routes/auth/register.js";
import authenticatedPathRegistrator from "./authPath.js";
import ApiCreateChannel from "../routes/channels/createChannel.js";
import ApiDeleteChannel from "../routes/channels/deleteChannel.js";
import ApiGetChannels from "../routes/channels/getChannels.js";
import ApiDeleteMessage from "../routes/messages/deleteMessage.js";
import ApiUpdateMessage from "../routes/messages/updateMessage.js";
import OpenCheck from "../middlewares/open.js";

export default async function runHTTPServer() {
	const fastify = Fastify({
		logger: process.env.DEV ? true : false,
	});

	const authPost = authenticatedPathRegistrator(fastify, "POST");
	const authPut = authenticatedPathRegistrator(fastify, "PUT");
	const authGet = authenticatedPathRegistrator(fastify, "GET");
	const authDelete = authenticatedPathRegistrator(fastify, "DELETE");

	fastify.addHook("onRequest", OpenCheck);

	//
	//  Register routes
	//

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
	fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err: Error | null) {
		if (err) {
			fastify.log.error(err);
		}
	});

	return fastify;
}
