function resetColor(){
  for (let item of arguments){
    player.colors[item].amount = defaultSave.colors[item].amount
  }
}

function prestige(color){
  if(color == "green"){
    resetColor("red")
  }else if(color == "blue"){
    resetColor("red", "green")
  }
}
