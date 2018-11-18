function convertToRoman(num) {
   var roman = {
      1: "I", 2: "II", 3: "III", 4: "IV", 6: "VI", 7: "VII", 8: "VIII", 9: "IX",
      10: "X", 20: "XX", 30: "XXX", 40: "XL", 60: "LX", 70: "LXX", 80: "LXXX", 90: "XC",
      100: "C", 200: "CC", 300: "CCC", 400: "CD", 600: "DC", 700: "DCC", 800: "DCCC", 900: "CM",
      1000: "M", 2000: "MM", 3000: "MMM",
      5: "V",
      50: "L",
      500: "D", 0:""
   };
   var ribuan = 0;
   var ratusan = 0;
   var puluhan = 0;
   var satuan = 0;
   var result = "";

   if(num>10 && num<100) {
      puluhan = num.toString().charAt()*10;
      satuan = num.toString().charAt(1)*1;
      result = roman[puluhan] + roman[satuan];
   } else if(num>100 && num<1000) {
      ratusan = num.toString().charAt()*100;
      puluhan = num.toString().charAt(1)*10;
      satuan = num.toString().charAt(2)*1;
      result = roman[ratusan] + roman[puluhan] + roman[satuan];
   } else if(num>1000 && num<4000) {
      ribuan = num.toString().charAt()*1000;
      ratusan = num.toString().charAt(1)*100;
      puluhan = num.toString().charAt(2)*10;
      satuan = num.toString().charAt(3)*1;
      result = roman[ribuan] + roman[ratusan] + roman[puluhan] + roman[satuan];
   } else {
      result = roman[num];
   }

   return result;
}