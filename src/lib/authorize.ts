import db from "./database.js";

export default async function Authorize(AccessToken?: string) {
	if (!AccessToken) return false;

	const userId = await db.tokens.findFirst({ where: { token: AccessToken } });
	console.log(userId);
	if (!userId) return false;

	return userId.userId;
}
