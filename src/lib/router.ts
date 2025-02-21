import Fastify from "fastify";
import ApiRoot from "../routes/root.js";
import ApiMessages from "../routes/messages.js";
import ApiUser from "../routes/user.js";
import ApiSendMessage from "../routes/sendMessage.js";
import ApiLogin from "../routes/login.js";
import ApiRegister from "../routes/register.js";

const fastify = Fastify({
	logger: true,
});

export default fastify;

// Register routes
fastify.get("/", ApiRoot);
fastify.get("/channels/:id/messages", ApiMessages);
fastify.post("/messages", ApiSendMessage);
fastify.get("/users/:id", ApiUser);
fastify.post("/login", ApiLogin);
fastify.post("/register", ApiRegister);
