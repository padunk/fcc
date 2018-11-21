/*
Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.
For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
Calling this returned function with a single argument will then return the sum:
var sumTwoAnd = addTogether(2);
sumTwoAnd(3) returns 5.
If either argument isn't a valid number, return undefined.
*/

function addTogether() {
	const args = [...arguments];
   if (args.length === 1 && typeof args[0] === 'number') {
      return function add(another) {
         if (typeof another === 'number') {
            return args[0] + another;
         }
         return undefined;
      }
   } else if (args.every(e => typeof e === 'number')) {
      return args.reduce((a, e) => a+=e, 0);
   }
   return undefined;
}
