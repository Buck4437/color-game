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
        playerMainProperty(1, "green", false, "+" + "Reset to gain " + gainRateColor().green + " Green (Requires 255 Red)", styles, firstTimeUnlockColor().green),
        playerMainProperty(2, "blue", !player.colors.blue.isUnlocked, "Reset to gain " + gainRateColor().blue +" Blue (Requires 255 Green)", styles, firstTimeUnlockColor().blue)
      ]
    }
  }
})

function firstTimeUnlockColor(){
  return{
    green: function(){
      player.colors.green.upgrades.isUnlocked = true
      player.colors.blue.isUnlocked = true
    },
    blue: function(){
      player.colors.blue.upgrades.isUnlocked = true
    }
  }
}

function canGainColor(){
  return {
    red: player.colors.red.amount != 255,
    green: player.colors.red.amount >= 255 && player.colors.green.amount != 255,
    blue: player.colors.green.amount >= 255 && player.colors.blue.amount != 255
  }
}

function gainRateColor(){
  let redRate = 1
  let greenRate = 1
  let blueRate = 1
  let redMultis = [player.colors.green.amount+1, player.colors.blue.amount+1, 2**player.colors.red.upgrades.multi]
  let greenMultis = [player.colors.blue.amount+1, 2**player.colors.green.upgrades.multi]
  let blueMultis = [2**player.colors.blue.upgrades.multi]
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
    prestigeColor(color)
    player.colors[color].amount += gainRateColor()[color]
    if(player.colors[color].amount > 255){
      player.colors[color].amount = 255
    }
  }
}

function resetColor(){
  for (let item of arguments){
    player.colors[item].amount = defaultSave.colors[item].amount
  }
}

function prestigeColor(color){
  if(color == "green"){
    resetColor("red")
  }else if(color == "blue"){
    resetColor("red", "green")
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

function updateAutobuyers(){
  let colors = Object.keys(game.autobuyersInterval)
  for (let color of colors){
    setAutoBuyColor(color, player.colors[color].auto, 1000/Math.max(1,player.colors[color].upgrades.auto||1))
  }
}
