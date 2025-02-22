import { Prisma, User } from "@prisma/client";
import { FastifyRequest, RouteGenericInterface } from "fastify";

type SafeUser = Prisma.UserGetPayload<{
	include: { roles: { include: { permissions: true } } };
	omit: { password: true };
}>;

type UserPayload = { user: SafeUser };
type RequestWithUser = FastifyRequest & Partial<UserPayload>;

export { RequestWithUser, SafeUser };
