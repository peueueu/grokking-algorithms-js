import { faker } from "@faker-js/faker";

function retryGenerateRandomNumber(maxValue) {
	return faker.number.int(maxValue);
}

export function seedDatasetFn(datasetSize = 50, maxValue = 100) {
	const _arrLength = new Array(datasetSize);
	const seedData = new Set();

	console.time("Seed");
	while (seedData.size < datasetSize) {
		try {
			const randomNumber = faker.number.int(maxValue);
			if (seedData.has(randomNumber)) {
				throw new Error("Already included on the set");
			}
			seedData.add(randomNumber);
		} catch (_) {
			const newRandomNumber = retryGenerateRandomNumber(maxValue);
			seedData.add(newRandomNumber);
		}
	}
	console.timeEnd("Seed");
	return Array.from(seedData);
}

export function seedBinarySearchDatasetFn(datasetSize = 50) {
	const seedData = new Array(datasetSize);
	console.time("Seed-Binary-Search");
	for (let i = 0; i < seedData.length; i++) {
		seedData[i] = i;
	}
	console.timeEnd("Seed-Binary-Search");
	return seedData;
}
