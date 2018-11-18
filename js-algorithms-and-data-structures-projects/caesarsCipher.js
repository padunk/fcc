function rot13(str) { // LBH QVQ VG!
	var result = [];
  
  for(let s of str) {
  	var checkStr = s.codePointAt();
  	
  	if (checkStr > 77 && checkStr < 91) {
  		result.push(String.fromCodePoint(checkStr - 13));
  	} else if (checkStr > 64 && checkStr <= 77) {
  		result.push(String.fromCodePoint(checkStr + 13));
  	} else {
  		result.push(String.fromCodePoint(checkStr));
  	}
  }
  
  return result.join('');
}