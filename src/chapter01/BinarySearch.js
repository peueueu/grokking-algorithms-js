const { seedBinarySearchDatasetFn } = require("../../utils/seed");

/**
 * Needs approximately Log2(x) to find an item (Worst case scenario).
 * @param _arrLength: The given array must be a ordered.;
 * @returns index: Index of the element on the array;
 */
function BinarySearch(target, _arrLength = 100) {
  const arr = seedBinarySearchDatasetFn(_arrLength);
  let low = 0;
  let high = arr.length - 1;
  let numOfSteps = 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const guess = arr[middle];

    if (guess === target) {
      console.info(`Number of steps: ${numOfSteps}`);
      return middle;
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (guess > target) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
    numOfSteps++;
  }
  return null;
}

console.time("Binary Search");
const itemIdx = BinarySearch(4239, 10000);
console.timeEnd("Binary Search");

console.log("Index of the item in the list: ", itemIdx);
