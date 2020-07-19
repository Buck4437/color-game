function setAutoBuyColor(color, boolean, interval){
  player.colors[color].auto = boolean
  clearInterval(game.autobuyersInterval[color])
  if(player.colors[color].auto){
    gainColor(color)
    game.autobuyersInterval[color] = setInterval(function(){gainColor(color)}, interval)
  }
}

function updateAutobuyers(){
  let colors = Object.keys(game.autobuyersInterval)
  for (let color of colors){
    let interval = 1000/Math.max(1,player.colors[color].upgrades.auto||1)
    if(player.lights.upgrades.fasterAuto[color]){
      interval /= 2
    }
    setAutoBuyColor(color, player.colors[color].auto, interval)
  }
}
