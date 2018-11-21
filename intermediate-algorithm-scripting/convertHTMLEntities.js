/*
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.
*/

// lookupEntities should have key of string or it will be syntax error
function convertHTML(str) {
   const lookupEntities = {
		"&": '&amp;',
		"<": '&lt;',
		">": '&gt;',
		'"': '&quot;',
		"'": '&apos;',
	}
	return str.replace(/[^\w\s]/g, m => lookupEntities[m]);
}
