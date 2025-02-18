import { User } from "@prisma/client";
import { db } from "./lib/database.js";

console.log("Did you know 1 out of 3 trans girls are gay?");
let user: User;

const ifYouAreRightYouFuckMeTonight = async () => {
	user = await db.user.create({
		data: {
			name: "Evelyn",
			password: "UltraSafePassword",
		},
	});
};

const setUserProfilePicture = async (newProfilePicture: string) => {
	await db.user.update({
		where: {
			id: "cm7ayi5dp0000w5wox0mmzov1",
		},
		data: {
			profileUrl: newProfilePicture,
		},
	});
};

// ifYouAreRightYouFuckMeTonight();
setUserProfilePicture("https://i.pinimg.com/736x/3e/e5/3c/3ee53cb897d84a41c8a368cf616802e9.jpg");
