function updateAutobuyers(){
  updateAutobuyersColors()
  updateAutobuyersLights()
}

function updateAutobuyersColors(){
  let colors = ["red", "green", "blue"]
  for (let [index, color] of colors.entries()){
    let interval = 1000
    if(containBit(player.lights.upgradesBit, 16384)){
      interval = 50
    }
    else{
      interval /= Math.max(1,player.colors[color].upgrades.auto||1)
      if(containBit(player.lights.upgradesBit, 4*16**index)){
        interval /= 2
      }
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

function updateAutobuyersLights(){
  setAutoBuyLights(player.lights.auto.isEnabled)
}

function setAutoBuyLights(boolean){
  player.lights.auto.isEnabled = boolean
  clearInterval(game.autobuyersInterval.lights)
  if(boolean){
    game.autobuyersInterval.lights = setInterval(tryGainLights, 50)
  }
}

function tryGainLights(){
  if (!canPrestigeLights()){
    return
  }
  let mode = player.lights.auto.mode
  let value = player.lights.auto.value
  if (mode == 0){ //Amount
    if (gainRateLights().lights >= value){
      prestigeLights()
    }
  }
  else if (mode == 1){ //Time
    if(player.stats.prestigeTime.lights.current >= value){
      prestigeLights()
    }
  }
}
