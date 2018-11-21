/*
Translate the provided string to pig latin.
Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".
If a word begins with a vowel you just add "way" to the end.
Input strings are guaranteed to be English words in all lowercase.
*/

function translatePigLatin(str) {
   const re = /[aiueo]/;
   const idx = str.search(re);

   return idx < 0
   ? str + 'ay'
   : re.test(str[0]) 
   ? str + 'way' 
   : str.slice(idx) + str.slice(0, idx) + 'ay' ;
}

// Readable version
function translatePigLatin(str) {
   const re = /[aiueo]/; // initialize the regex to search for vowel
   const idx = str.search(re); // search str and return first index of vowel found
   let result = '';
   if (idx<0) { // if str contains all consonant
      result = str + 'ay';
   } else if (re.test(str[0])) { // if str first letter is vowel
      result = str + 'way'
   } else {
      result = str.slice(idx) + str.slice(0, idx) + 'ay' ;
   }
   return result;
}
