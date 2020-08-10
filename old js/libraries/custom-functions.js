/*

Custom functions list:

locateProperty(object, property): you can get the property of an object using string(in dot notation)
capitalizeFirstLetter(string): Capitalize First Letter of the string
isNumber(thing): return whether the thing is a finite number
numToSci(Number to convert, decimal places, dp used in sci notation, use full number if smaller than this (def 1000))
secondToTime(ms) convert milliseconds to a readable form
containBit(number, bit): find if a number converted to a bin contains a certain bit
*/

function locateProperty(root, property){
  let array = property.split('.')
  let target = root[array[0]]
  for (let i=1;i<array.length;i++){
    target = target[array[i]]
  }
  return target
}

function capitalizeFirstLetter(input) {
  string = String(input)
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}

function numToSci(num, dp, scidp, showFullIfSmallerThanThis){
  if(!isFinite(dp)||(dp||1) > 50){
    dp = 0
  }
  if(!isFinite(scidp)||(scidp||1) > 50){
    scidp = 0
  }
  if(num < (showFullIfSmallerThanThis||1000)){
    let string = Math.floor(num)
    if(dp > 0){
      string += "."
      for(let i = dp; i > 0; i--){
        num -= Math.floor(num)
        num *= 10
        string += Math.floor(num)
      }
    }
    return string
  }else{
    let exponent = Math.floor(Math.log10(num))
    let mantissaFull = num / (10**exponent)
    let mantissa = Math.floor(mantissaFull)
    if(scidp > 0){
      mantissa += "."
      for(let i = scidp; i > 0; i--){
        mantissaFull -= Math.floor(mantissaFull)
        mantissaFull *= 10
        mantissa += Math.floor(mantissaFull)
      }
    }
    return mantissa + "e" + exponent
  }
}

function secondToTime(s){
  let original = s
  let string = ""
  let units = [["year", 31536000], ["day",86400], ["hour", 3600], ["minute", 60]]
  for (let [unit, toS] of units){
    if (s > toS){
      string += Math.floor(s/toS) + " " + unit + (Math.floor(s/toS) == 1 ? "s, " : ", ")
      s -= Math.floor(s/toS)* toS
    }
  }
  return string + (original > 10 ? Math.floor(s) : numToSci(s, 3, 0, 10000)) + " seconds"
}

function containBit(num, ...args){
  for (let bit of args){
    let quotient = Math.floor(num / bit)
    if(quotient % 2 != 1){
      return false
    }
  }
  return true
}
