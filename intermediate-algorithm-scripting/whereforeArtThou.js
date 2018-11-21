/*
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the name and its value, that was passed on as the second argument.
*/

function whatIsInAName(collection, source) {
   // What's in a name?
   return collection.reduce((a, e) => {
      return Object.keys(source).every(s => e.hasOwnProperty(s) && e[s] === source[s]) ? a.push(e) && a : a ;
	}, []);
}

function withSimpleLoop(collection, source) {
   // What's in a name?
   const arr = [];
   // Only change code below this line
   const srcKey = Object.keys(source);
   for (let c of collection) {
      let temp = [];
      for (let key of srcKey) {
         temp.push(c.hasOwnProperty(key) && c[key] === source[key]);
      }
      if (temp.every(Boolean)) {
         arr.push(c);
      }
   }
   // Only change code above this line
   return arr;
}