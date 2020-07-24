function updateAutobuyers(){
  let colors = ["red", "green", "blue"]
  for (let [index, color] of colors.entries()){
    let interval = 1000/Math.max(1,player.colors[color].upgrades.auto||1)
    if(containBit(player.lights.upgradesBit, 4*16**index)){
      interval /= 2
    }
    setAutoBuyColor(color, player.colors[color].auto, interval)
  }
}

function setAutoBuyColor(color, boolean, interval){
  player.colors[color].auto = boolean
  clearInterval(game.autobuyersInterval[color])
  if(player.colors[color].auto){
    gainColor(color)
    game.autobuyersInterval[color] = setInterval(function(){gainColor(color)}, interval)
  }
}
