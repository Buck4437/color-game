function resetColor(){
  for (let item of arguments){
    player[item] = defaultSave[item]
  }
}

function prestige(color){
  if(color == "green"){
    resetColor("red")
  }else if(color == "blue"){
    resetColor("red", "green")
  }
}
