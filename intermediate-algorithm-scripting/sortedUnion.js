/*
Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.
In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.
The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.
*/

function uniteUnique(arr) {
	const newArr = [...arguments].reduce((a, e) => Array.isArray(e) ? a = a.concat(e) : a, []);
   return newArr.filter((e, i, a) => a.indexOf(e) === i);
}

// With the experimental .flat
function uniteUnique(arr) {
   return [...arguments].flat().filter((e, i, a) => a.indexOf(e) === i);
}

