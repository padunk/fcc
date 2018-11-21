/*
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. The answer here would be 6.
*/

function smallestCommons(arr) {
	arr.sort((a, b) => a-b);
	// const sequence = (start, stop, step) => Array.from({length: ((stop-start)/step)+1}, (_, i) => start + (i*step));
   // const array = sequence(arr[0], arr[1], 1);
   const array = [];
   while (arr[0]<=arr[1]) {
      array.push(arr[0]);
      arr[0]++;
   }
	const lcm = (a,b) => Math.abs(a*b)/gcd(a,b);
	const result = array.reduce((a, e) => a = lcm(a, e));
	return result;
}

function gcd(a, b) {
	let temp;
	while (b !== 0) {
		temp = b;
		b = a%b;
		a = temp;
	}
	return a;
}