type ChallangeData = {
	data: {
		userCuid: string;
		publicKey: string;
		challenge: string;
	};
	timeout: NodeJS.Timeout;
};

const challengeStrorage = new Map<string, ChallangeData>();

const deleteChallenge = (id: string) => {
	const data = challengeStrorage.get(id);
	if (!data) return;
	if (data.timeout) {
		clearTimeout(data.timeout);
	}
	challengeStrorage.delete(id);
};

export const setChallenge = (id: string, challengeData: ChallangeData["data"]) => {
	const timeout = setTimeout(() => {
		deleteChallenge(id);
	}, 1000 * 60);

	challengeStrorage.set(id, { data: challengeData, timeout });
};

export const getChallenge = (id: string): ChallangeData["data"] | undefined => {
	const data = challengeStrorage.get(id);
	return data?.data;
};

export const getAndDeleteChallenge = (id: string): ChallangeData["data"] | undefined => {
	const data = challengeStrorage.get(id);
	deleteChallenge(id);
	return data?.data;
};
