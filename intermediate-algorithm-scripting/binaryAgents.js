/*
Return an English translated sentence of the passed binary string.
The binary string will be space separated.
*/

function binaryAgent(str) {
   return str.split(' ').map(e => String.fromCharCode(parseInt(e, 2))).join('');
}

// with simple loop
function binaryAgent(str) {
   let result = str.split(' ');
   for (let i = 0, len = result.length; i < len; i++) {
      result[i] = String.fromCharCode(parseInt(result[i], 2));
   }
   return result.join('');
}
