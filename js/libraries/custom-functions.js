/*

Custom functions list:
locateVar("varName"): return the value of var inputted (support properties in dot notations, global only)
customTrueFalseOutput(varName, trueText, falseText): return Text base on val of varName

*/

function locateVar(input){
  let array = input.split('.')
  let target = window[array[0]]
  for (let i=1;i<array.length;i++){
    target = target[array[i]]
  }
  return target
}

function customTrueFalseOutput(input,trueText,falseText){
  if(input){
    return trueText
  }
  return falseText
}
