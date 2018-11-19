/*
Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.
*/

function chunkArrayInGroups(arr, size) {
   // Break it up.
   const len = arr.length;
   if (size <= 0 || size > len) {
      return arr;
   }
   let result = [];
   for (let i=0; i<len; i+=size) {
      const step = i+size;
      if (step > len) {
         result = result.concat([arr.slice(i)]);
      } else {
         result = result.concat([arr.slice(i, step)]);
      }
   }
   return result;
}
