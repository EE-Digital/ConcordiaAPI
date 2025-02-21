import { User } from "@prisma/client";
import { FastifyRequest, RouteGenericInterface } from "fastify";

type UserPayload = { user: User };
type RequestWithUser = FastifyRequest & Partial<UserPayload>;

export default RequestWithUser;
