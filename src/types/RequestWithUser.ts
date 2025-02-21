import { User } from "@prisma/client";
import { FastifyRequest, RouteGenericInterface } from "fastify";

type UserPayload = { user: Omit<User, "password"> };
type RequestWithUser = FastifyRequest & Partial<UserPayload>;

export default RequestWithUser;
