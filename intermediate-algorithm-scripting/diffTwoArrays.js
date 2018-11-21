/*
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.
*/

// loop and filter arr1 for any element that is not in arr2
// do the same with arr2 and concat the result
function diffArray(arr1, arr2) {
   return arr1
   .filter(e => !arr2.includes(e))
   .concat(arr2.filter(e => !arr1.includes(e)));
}

// Readable version
function diffArray(arr1, arr2) {
   let result = [];

   for(let val of arr1) {
      if (arr2.includes(val) === false) {
         result.push(val)
      }
   }
   for(let val of arr2) {
      if (arr1.includes(val) === false) {
         result.push(val)
      }
   }
   return result;
}
