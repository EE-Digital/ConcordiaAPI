import { Permissions, PermissionState } from "@prisma/client";
import { SafeUser } from "../types/RequestWithUser.js";

export default function hasPermission(user: SafeUser, lookupPermission: Permissions) {
	const userRoles = user.roles;

	return userRoles.some((role) => role.permissions.some((permission) => permission.permission === lookupPermission && permission.state === PermissionState.ALLOW));
}
