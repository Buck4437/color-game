function canGainColor(){
  return {
    red: player.red != 255,
    green: player.red >= 255 && player.green != 255,
    blue: player.green >= 255 && player.blue != 255
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
    player[color] += gainRateColor()[color]
    if(player[color] > 255){
      player[color] = 255
    }
  }
}

function setAutoBuyColor(color, interval){
  player[color+"Auto"] = !player[color+"Auto"]
  clearInterval(autobuyersInterval[color])
  if(player[color+"Auto"]){
    gainColor(color)
    autobuyersInterval[color] = setInterval(function(){gainColor(color)}, interval)
  }
}

new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  computed:{
    currencys: function(){
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
            seen: true,
            intRounding: "floor"
          },
          auto: {
            text: "Auto (Avg. 1 CPS): " + customTrueFalseOutput(player.redAuto,"On","Off"),
            seen: player.unlocks.redAuto,
            onclick: function(){
              setAutoBuyColor("red", 1000)
            }
          },
          addsub: {
            text: "+" + gainRateColor().red +" Red",
            seen: true,
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
            seen: player.unlocks.green,
            intRounding: "floor"
          },
          auto: {
            text: "Auto (Avg. 1 CPS): " + customTrueFalseOutput(player.greenAuto,"On","Off"),
            seen: player.unlocks.greenAuto,
            onclick: function(){
              setAutoBuyColor("green", 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRateColor().green + " Green (Requires 255 Red)",
            seen: player.unlocks.green,
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
            seen: player.unlocks.blue,
            intRounding: "floor"
          },
          auto: {
            text: "Auto (Avg. 1 CPS): " + customTrueFalseOutput(player.blueAuto,"On","Off"),
            seen: player.unlocks.blue,
            onclick: function(){
              setAutoBuyColor("blue", 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRateColor().blue +" Blue (Requires 255 Green)",
            seen: player.unlocks.blue,
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
