import { User } from "@prisma/client";

export function safeUser(user: User) {
	// Do not return users sensitive data
	// such as password, email, etc.

	return {
		id: user.id,
		name: user.name,
		profileUrl: user.profileUrl,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
}
export type SafeUser = ReturnType<typeof safeUser>;
