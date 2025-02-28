import { Prisma } from "@prisma/client";
import { FastifyRequest } from "fastify";

type SafeUser = Prisma.UserGetPayload<{
	include: { roles: { include: { permissions: true } } };
	omit: { password: true };
}>;

type UserPayload = { user: SafeUser };
type RequestWithUser = FastifyRequest & Partial<UserPayload>;

export { RequestWithUser, SafeUser };
