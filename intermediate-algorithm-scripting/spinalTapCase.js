/*
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

// first group replace space(\s) and underscore(\_) with "-"
// second group replace "C" in camelCase with "-C"
// and make it all lower case.
function spinalCase(str) {
     // "It's such a fine line between stupid, and clever."
   // --David St. Hubbins
   return str
   .replace(/(\s|\_)|(?<=[a-z])[A-Z]/g,(m, p1) => p1 ? "-" : "-" + m).toLowerCase();
}
