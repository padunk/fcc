function checkCashRegister(price, cash, cid) {
   var diff = cash - price;
   var cls = 'Closed';
   var insuf = 'Insufficient Funds';
   var denom = [
     ["PENNY", 0.01], 
     ["NICKEL", 0.05], 
     ["DIME", 0.10], 
     ["QUARTER", 0.25], 
     ["ONE", 1], 
     ["FIVE", 5.00], 
     ["TEN", 10.00], 
     ["TWENTY", 20.00], 
     ["ONE HUNDRED", 100.00]
   ];
   // Here is your change, ma'am.
   
   //made newCid based [denomination, value] => [penny, 1.01] become [0.01, 1.01]
   var newCid = [];
   for(var i = 0; i < cid.length; i++){
     newCid.push([denom[i][1], cid[i][1]]);
   }
   
   //sum cid to check either Closed or Insufficient Funds
   var sumCid = cid.reduce(function(acc, val){
     return acc + val[1];
   },0);
   
   //main calculation
     if(diff == sumCid){
     return cls;
   } else if(diff > sumCid){
     return insuf;
   } else {
     return kembalian(diff, newCid);
   }
   
   //function to calculate exchange, result will be in [denomination, value]
   function kembalian(value, arr){
     var result = [];
     arr.reverse();
     
     for(var i = 0; i < arr.length; i++){
       if(value > arr[i][0] && arr[i][1] !== 0){
         if(value > arr[i][1]){
           result.push(arr[i]);
           value -= arr[i][1];
         } else {
           result.push([arr[i][0], arr[i][0]*Math.floor(value/arr[i][0])]);
           value = value%arr[i][0];
           value = Math.round(value*100)/100;
         }
       }
     }
     if (result.length < 1 || value > 0) {
       return insuf;
     }
     return replaceDenom(result);
   }
   
   //function to get the result from [0.01, 1.01] to ["PENNY", 1.01]
   function replaceDenom(arr){
     var temp = [];
     arr.map(function(el){
       for(var j = 0; j < denom.length; j++){
         if(el[0] == denom[j][1]){
           temp.push([denom[j][0], el[1]]);
         }
       }
     });
     return temp;
   }
 }