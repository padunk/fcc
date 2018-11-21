/*
We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them.
The lowest number will not always come first.
*/

function sumAll(arr) {
   arr.sort((a, b) => a-b);
   let result = arr[0];
   while (arr[1] > arr[0]) {
      result += arr[1];
      arr[1] -= 1;
   }
   return result;
}
 
 sumAll([1, 4]);
