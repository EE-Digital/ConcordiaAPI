import fastify from "./lib/router.js";

// const ifYouAreRightYouFuckMeTonight = async () => {
// 	user = await db.user.create({
// 		data: {
// 			name: "Evelyn",
// 			password: "UltraSafePassword",
// 		},
// 	});
// };

// const setUserProfilePicture = async (newProfilePicture: string) => {
// 	await db.user.update({
// 		where: {
// 			id: "cm7ayi5dp0000w5wox0mmzov1",
// 		},
// 		data: {
// 			profileUrl: newProfilePicture,
// 		},
// 	});
// };

// Start the server
fastify.listen({ port: 3000 }, function (err, address) {
	if (err) {
		fastify.log.error(err);
	}
});
