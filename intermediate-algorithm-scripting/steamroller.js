/*
Flatten a nested array. You must account for varying levels of nesting.
*/

// recursive function
function steamrollArray(arr) {
   if (Array.isArray(arr)) {
		return arr.reduce((a, e) => a.concat(steamrollArray(e)), []);
	}
	return arr;
}

// using flat, but hardcode the flat depth
// TODO, don't hardcode it.
function steamrollArray(arr) {
   return arr.flatMap(e => Array.isArray(e) ? e.flat(2) : e);
}