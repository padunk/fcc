/*
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.
*/

function fearNotLetter(str) {
	let result = str.split('');
	let check = str.charCodeAt(0);
	for (let r of result) {
		if (check !== r.charCodeAt(0)) {
			return String.fromCharCode(check++);
		}
		check++;
	}
   return undefined;
 }

 // Other version
function fearNotLetter(str) {
   let result = str.split('');
   for (let i=1, len=result.length; i<len; i++) {
      if (result[i].charCodeAt(0) - result[i-1].charCodeAt(0) !== 1) {
         return String.fromCharCode(result[i].charCodeAt(0)-1);
      }
   }
   return undefined;
}
