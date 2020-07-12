/*

Custom functions list:

PART A: BROAD
locateVar("varName"): return the value of var inputted (support properties in dot notations, global only)
IsJsonString(str): true if it is valid, false otherwise
capitalizeFirstLetter(string): Capitalize First Letter of the string

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
