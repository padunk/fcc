/*
The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.
Base pairs are a pair of AT and CG. Match the missing element to the provided character.
Return the provided character as the first element in each array.
For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]
The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.
*/

// with ternary operator
function pairElement(str) {
   return str.split("").map(e => {
		return e === 'G'
		? ['G', 'C']
		: e === 'C'
		? ['C', 'G']
		: e === 'A'
		? ['A', 'T']
      : ['T', 'A'];
   });
}

// with Switch:
function pairElement(str) {
   return str.split("").map(e => {
      switch (e) {
         case 'G':
            return ['G', 'C'];
         case 'C':
            return ['C', 'G'];
         case 'A':
            return ['A', 'T'];
         default:
            return ['T', 'A'];
      }
   });
}

// with object lookup
function pairElement(str) {
   const lookupDNA = {
      A: ['A', 'T'],
      T: ['T', 'A'],
      C: ['C', 'G'],
      G: ['G', 'C']
   };

   return str.split('').map(e => lookupDNA[e]);
}
