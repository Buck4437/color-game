function playerMainProperty(id, name, isBarHidden, text, styles, unlockFunction){
  return {
    id: id,
    global:{
      name: name,
      color: name
    },
    bar:{
      max: 255,
      isHidden: isBarHidden
    },
    addsub: {
      text: text,
      isHidden: isBarHidden,
      style: styles,
      unlocks: unlockFunction
    },
  }
}

new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  computed:{
    colors: function(){
      let styles = {
        enabled:{
          color: "white",
          border: "4px solid white",
          cursor: "pointer"
        },
        disabled:{
          color: "grey",
          border: "4px solid #888888",
          cursor: "default"
        }
      }
      return [
        playerMainProperty(0, "red", false, "+" + gainRateColor().red +" Red", styles),
        playerMainProperty(1, "green", false, "+" + "Reset to gain " + gainRateColor().green + " Green (Requires 255 Red)", styles, firstTimeUnlock().green),
        playerMainProperty(2, "blue", !player.unlocks.color.blue, "Reset to gain " + gainRateColor().blue +" Blue (Requires 255 Green)", styles, firstTimeUnlock().blue)
      ]
    }
  }
})

function firstTimeUnlock(){
  return{
    green: function(){
      player.unlocks.upgrades.green = true
      player.unlocks.color.blue = true
    },
    blue: function(){
      player.unlocks.upgrades.blue = true
    }
  }
}

function canGainColor(){
  return {
    red: player.red != 255,
    green: player.red >= 255 && player.green != 255,
    blue: player.green >= 255 && player.blue != 255
  }
}

function gainRateColor(){
  let redRate = 1
  let greenRate = 1
  let blueRate = 1
  let redMultis = [player.green+1, player.blue+1, 2**player.upgrades.red.multi]
  let greenMultis = [player.blue+1, 2**player.upgrades.green.multi]
  let blueMultis = [2**player.upgrades.blue.multi]
  for (let redmulti of redMultis){
    redRate *= redmulti
  }
  for (let greenmulti of greenMultis){
    greenRate *= greenmulti
  }
  for (let bluemulti of blueMultis){
    blueRate *= bluemulti
  }
  return {
    red: Math.min(255,redRate),
    green: Math.min(255,greenRate),
    blue: Math.min(255,blueRate)
  }
}

function gainColor(color){
  if(canGainColor()[color]){
    prestige(color)
    player[color] += gainRateColor()[color]
    if(player[color] > 255){
      player[color] = 255
    }
  }
}

function setAutoBuyColor(color, boolean, interval){
  player[color+"Auto"] = boolean
  clearInterval(game.autobuyersInterval[color])
  if(player[color+"Auto"]){
    gainColor(color)
    game.autobuyersInterval[color] = setInterval(function(){gainColor(color)}, interval)
  }
}

function updateAutobuyers(){
  let colors = Object.keys(game.autobuyersInterval)
  for (let color of colors){
    setAutoBuyColor(color, player[color+"Auto"], 1000/Math.max(1,player.upgrades[color].auto||1))
  }
}
