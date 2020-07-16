/*

Custom functions list:

PART A: BROAD
locateVar("varName"): return the value of var inputted (support properties in dot notations, global only)
IsJsonString(str): true if it is valid, false otherwise
capitalizeFirstLetter(string): Capitalize First Letter of the string
isNumber(thing): return whether the thing is a finite number
numToSci(Number to convert, decimal places, dp used in sci notation, use full number if smaller than this (def 1000))

PART B: SPECFIC
topBarButtonsProperties(id, elementID, text, isHidden, variable, tabID, tabs, style):
Use to declare properties
*/

function locateVar(input){
  let array = input.split('.')
  let target = window.top[array[0]]
  for (let i=1;i<array.length;i++){
    target = target[array[i]]
  }
  return target
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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


function topBarButtonsProperties(id, elementID, text, isHidden, variable, tabID, tabs, style){
  return{
    id: id,
    tab:{
      elementID: elementID,
      text: text,
      style: style,
      isHidden: isHidden,
      selectedTabVariable: variable,
      correspondingTabID: tabID,
      listOfTabs: tabs
    }
  }
}
