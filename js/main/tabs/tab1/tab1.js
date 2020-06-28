function canGainColor(){
  return {
    red: player.red != 255,
    green: player.red >= 255 && player.green != 255,
    blue: player.green >= 255 && player.blue != 255
  }
}

function resetPreviousColor(color){
  let array = ["red", "green", "blue"]
  for (let i = 1; i< array.length; i++){
    if (color == array[i]){
      player[array[i-1]] = 0
    }
  }
}

function gainRateColor(){
  return {
    red: Math.min(255,(player.green+1)*(player.blue+1)),
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
  let array = Object.keys(autobuyersInterval)
  for (let i=0;i<array.length;i++){
    color = array[i]
    setAutoBuyColor(color, player[color+"Auto"], 1000/Math.max(1,player.upgrades[color+"Auto"]))
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
        cursor: "default"
      }
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
            text: "Auto (" + player.upgrades.redAuto +" CPS): " + customTrueFalseOutput(player.redAuto,"On","Off"),
            isHidden: !player.upgrades.redAuto != 0,
            onclick: function(){
              setAutoBuyColor("red", !player.redAuto, 1000/Math.max(1,player.upgrades.redAuto))
            }
          },
          addsub: {
            text: "+" + gainRateColor().red +" Red",
            // is: true,
            onclick: function(){
              gainColor("red")
            },
            style: customTrueFalseOutput(canGainColor().red,buttonEnabledStyle,buttonDisabledStyle),
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
            text: "Auto (Avg. 1 CPS): " + customTrueFalseOutput(player.greenAuto,"On","Off"),
            isHidden: !player.unlocks.greenAuto,
            onclick: function(){
              setAutoBuyColor("green", !player.greenAuto, 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRateColor().green + " Green (Requires 255 Red)",
            onclick: function(){
              gainColor("green")
            },
            style: customTrueFalseOutput(canGainColor().green,buttonEnabledStyle,buttonDisabledStyle),
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
            text: "Auto (Avg. 1 CPS): " + customTrueFalseOutput(player.blueAuto,"On","Off"),
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
            style: customTrueFalseOutput(canGainColor().blue,buttonEnabledStyle,buttonDisabledStyle),
            disabled: !canGainColor().blue
          },
        }
      ]
    }
  }
})
