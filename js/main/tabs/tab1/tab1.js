function canGainColor(){
  return {
    red: player.red != 255,
    green: player.red >= 255 && player.green != 255,
    blue: player.green >= 255 && player.blue != 255
  }
}

function resetPlayer(){
  for (let item of arguments){
    if(item == "red") {
      player.red = defaultSave.red
      // player.redAuto = defaultSave.redAuto
      // player.upgrades.red = defaultSave.upgrades.red
    }else if(item == "green"){
      player.green = defaultSave.green
      // player.greenAuto = defaultSave.greenAuto
      // player.upgrades.green = defaultSave.upgrades.green
    }
  }
  updateAutobuyers()
}

function resetPreviousColor(color){
   color == "blue" ? resetPlayer("red", "green")
  :color == "green" && resetPlayer("red", "redAuto", "upgrades")
}

function gainRateColor(){
  let redRate = 1
  let redMultis = [player.green+1, player.blue+1, 2**player.upgrades.red.multi]
  for (let redmulti of redMultis){
    redRate *= redmulti
  }
  return {
    red: Math.min(255,redRate),
    green: Math.min(255, player.blue+1),
    blue: 1
  }
}

function gainColor(color){
  if(canGainColor()[color]){
    resetPreviousColor(color)
    player[color] += gainRateColor()[color]
    if(player[color] > 255){
      player[color] = 255
    }
  }
}

function setAutoBuyColor(color, boolean, interval){
  player[color+"Auto"] = boolean
  clearInterval(autobuyersInterval[color])
  if(player[color+"Auto"]){
    gainColor(color)
    autobuyersInterval[color] = setInterval(function(){gainColor(color)}, interval)
  }
}

function updateAutobuyers(){
  let colors = Object.keys(autobuyersInterval)
  for (let color of colors){
    setAutoBuyColor(color, player[color+"Auto"], 1000/Math.max(1,player.upgrades[color].auto||1))
  }
}

new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  computed:{
    colors: function(){
      let buttonEnabledStyle = {
        color: "white",
        border: "4px solid white",
        cursor: "pointer"
      }
      let buttonDisabledStyle = {
        color: "grey",
        border: "4px solid #888888",
      }
      cursor: "default"
      return [
        {
          id: 0,
          bar: {
            name: "Red",
            counter: "player.red",
            max: 255,
            color: "red",
            intRounding: "floor"
          },
          auto: {
            text: "Auto: " + (player.redAuto ? "On" : "Off"),
            isHidden: player.upgrades.red.auto == 0,
            onclick: function(){
              setAutoBuyColor("red", !player.redAuto, 1000/Math.max(1,player.upgrades.red.auto||1))
            }
          },
          addsub: {
            text: "+" + gainRateColor().red +" Red",
            onclick: function(){
              gainColor("red")
            },
            style: canGainColor().red ? buttonEnabledStyle : buttonDisabledStyle,
            disabled: !canGainColor().red
          },
        },
        {
          id: 1,
          bar: {
            name: "Green",
            counter: "player.green",
            max: 255,
            color: "green",
            intRounding: "floor"
          },
          auto: {
            text: "Auto: " + (player.greenAuto ? "On" : "Off"),
            isHidden: !player.unlocks.greenAuto,
            onclick: function(){
              setAutoBuyColor("green", !player.greenAuto, 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRateColor().green + " Green (Requires 255 Red)",
            onclick: function(){
              if(canGainColor("green")){
                gainColor("green")
                player.unlocks.blue = true
              }
            },
            style: canGainColor().green ? buttonEnabledStyle : buttonDisabledStyle,
            disabled: !canGainColor().green
          }
        },
        {
          id: 2,
          bar: {
            name: "Blue",
            counter: "player.blue",
            max: 255,
            color: "blue",
            isHidden: !player.unlocks.blue,
            intRounding: "floor"
          },
          auto: {
            text: "Auto: " + (player.blueAuto ? "On" : "Off"),
            isHidden: !(player.unlocks.blue && player.unlocks.blueAuto),
            onclick: function(){
              setAutoBuyColor("blue", !player.blueAuto, 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRateColor().blue +" Blue (Requires 255 Green)",
            isHidden: !player.unlocks.blue,
            onclick: function(){
              gainColor("blue")
            },
            style: canGainColor().blue ? buttonEnabledStyle : buttonDisabledStyle,
            disabled: !canGainColor().blue
          },
        }
      ]
    }
  }
})
