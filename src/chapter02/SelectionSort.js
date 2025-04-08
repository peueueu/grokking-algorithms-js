/**
 * Finds the index of the element with the smallest value in the array
 * @param {Array} array Source array
 * @returns {number} Index of the element with the smallest value
 */

const { seedDatasetFn } = require("../../utils/seed");

function findSmallest(arr) {
  let smallest = arr[0];
  let smallestIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIdx = i;
    }
  }
  return smallestIdx;
}

/**
 * Sort array by increment
 * @param {Array} array Source array
 * @returns {Array} New sorted array
 */
function SelectionSort(arr) {
  const arrCopy = [...arr];
  const sortedArr = [];
  while (arrCopy.length > 0) {
    const smallestIndex = findSmallest(arrCopy);
    const [smallestValue] = arrCopy.splice(smallestIndex, 1);
    sortedArr.push(smallestValue);
  }
  return sortedArr;
}

const originalArray = seedDatasetFn(15);

console.time("Selection Sort");
const sortedArr = SelectionSort(originalArray);
console.timeEnd("Selection Sort");

console.log("🚀 ~ Original Array:", JSON.stringify(originalArray));
console.log("🚀 ~ Sorted Array:", JSON.stringify(sortedArr));
