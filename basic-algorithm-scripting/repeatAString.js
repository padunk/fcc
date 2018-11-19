/*
Repeat a given string str (first argument) for num times (second argument). Return an empty string if num is not a positive number.
The String built-in repeat() method should not be used.
*/

function repeatStringNumTimes(str, num) {
   let result = '';
	for (let i = 0; i < num; i++) {
		result += str;
	}
	return result;
}