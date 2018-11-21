/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.
*/

// making Fibonacci sequence with fibo variable;
function sumFibs(num) {
   let fibo = [1, 1];
	let i = 2, sum = 2;
	let x = 0, y = 0;

	while (fibo[i-1] + y <= num) {
		x = fibo[i-2];
		y = fibo[i-1];
		(x+y)%2 !== 0 ? sum += (x+y) : sum;
		fibo.push(x+y);
		i++;
	}
	return sum;
}

// don't make any Fibonacci sequence
function sumFibs(num) {
   let init = 0;
	let start = 1;
	let sum = init + start;

	while ((init+start) <= num) {
		let temp = init+start;
		init = start;
		start = temp;
		temp%2 !== 0 ? sum += temp : sum;
	}
	return sum;
}
