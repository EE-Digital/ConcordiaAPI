import { FastifyReply } from "fastify";

const InvalidAuth = (res: FastifyReply) => res.send({ status: 400, message: "Invalid authorization." });
export default InvalidAuth;
