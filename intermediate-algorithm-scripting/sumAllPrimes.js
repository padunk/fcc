/*
Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.

The provided number may not be a prime.
*/

// sieve of Erastothenes
function sumPrimes(num) {
   if (num <= 1) return undefined;
   
   // Array.from will not work in IE
   // const arr = Array.from({length: num+1}, (e, i) => i<2 || (i>2 && i%2 === 0) ? false : true);
   const arr = [];
	for (let i=0; i<=num; i++) {
		if (i<2 || (i>2 && i%2 === 0)) {
			arr.push(false);
		} else {
			arr.push(true);
		}
	}
	
	for (let i=2; i<Math.sqrt(num); i++) {
		if (arr[i]) {
			for (let j=Math.pow(i, 2); j<=num; j+=i) {
				arr[j] = false;
			}
		}
	}
	return arr.reduce((a, e, i) => e ? a+=i : a, 0);
}

// my own solution
function sumPrimes(num) {
	if (num <= 1) return undefined;
	const arr = [2];
	for (let i=3; i<=num; i++) {
		if (i%2 !== 0) {
			arr.push(i);
		}
	}
	for (let i=1; i<Math.sqrt(num); i++) {
		if (arr[i]) {
			for (let j=i+1, len=arr.length; j<len; j++) {
				if (arr[j]%arr[i] === 0) arr[j] = false;
			}
		}
	}
	return arr.reduce((a, e) => e ? a+=e : a, 0);
}
