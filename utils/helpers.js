export function sortedSeedDataset(seedFn = () => []) {
	const dataset = seedFn();
	return dataset.sort((a, b) => (a > b ? 1 : -1));
}
