import { faker } from "@faker-js/faker";

function retryGenerateRandomNumber(value) {
  return faker.number.int(value);
}

const numberGen = (factor) => Math.round(Math.random() * 10) * factor;

export function seedDatasetFn(datasetSize = 50, factor = 10) {
  const _arrLength = new Array(datasetSize);
  const seedData = new Set();
  console.time("Seed");
  while (datasetSize > seedData.size) {
    try {
      const randomNumber = faker.number.int(numberGen(factor));
      if (seedData.has(randomNumber)) {
        throw new Error("Already included on the set");
      }
      seedData.add(randomNumber);
    } catch (_) {
      const newRandomNumber = retryGenerateRandomNumber(numberGen(factor));
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
