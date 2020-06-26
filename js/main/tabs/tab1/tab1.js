new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  methods:{
    gainCurrency: function(keyword){
      switch(keyword){
        case "red":
          player.red += this.gainRate.red
          if(player.red > 255){
            player.red = 255
          }
          break;
        case "green":
          if(player.red == 255 && player.green != 255){
            player.red = 0
            player.green += this.gainRate.green
            if(player.green > 255){
              player.green = 255
            }
          }
          break;
        case "blue":
          if(player.green == 255 && player.blue != 255){
            player.red = 0
            player.green = 0
            player.blue += this.gainRate.blue
            if(player.blue > 255){
              player.blue = 255
            }
          }
          break;
      }
    },
    autobuyFunctions: function(keyword, updateRate){
      let gainCurrency = this.gainCurrency
      if(isNaN(updateRate)){
        updateRate = 100
      }
      switch(keyword){
        case "red":
          player.redAuto = !player.redAuto
          clearInterval(autobuyersInterval.red)
          if(player.redAuto){
            gainCurrency("red")
            autobuyersInterval.red = setInterval(function(){gainCurrency("red")}, updateRate)
          }
          break;
        case "green":
          player.greenAuto = !player.greenAuto
          clearInterval(autobuyersInterval.green)
          if(player.greenAuto){
            gainCurrency("green")
            autobuyersInterval.green = setInterval(function(){gainCurrency("green")}, updateRate)
          }
          break;
        case "blue":
          player.blueAuto = !player.blueAuto
          clearInterval(autobuyersInterval.blue)
          if(player.blueAuto){
            gainCurrency("blue")
            autobuyersInterval.blue = setInterval(function(){gainCurrency("blue")}, updateRate)
          }
          break;
      }
    }
  },
  computed:{
    gainRate: function(){
      return {
        red: Math.min(255,(player.green+1)*(player.blue+1)),
        green: Math.min(255, player.blue+1),
        blue: 1
      }
    },
    currencys: function(){
      let gainCurrency = this.gainCurrency
      let autobuyFunctions = this.autobuyFunctions
      let gainRate = this.gainRate
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
              autobuyFunctions("red", 1000)
            }
          },
          addsub: {
            text: "+" + gainRate.red +" Red",
            seen: true,
            onclick: function(){
              gainCurrency("red")
            },
            style: customTrueFalseOutput(player.red==255,buttonDisabledStyle,buttonEnabledStyle),
            disabled: player.red==255
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
              autobuyFunctions("green", 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRate.green + " Green (Requires 255 Red)",
            seen: player.unlocks.green,
            onclick: function(){
              gainCurrency("green")
            },
            style: customTrueFalseOutput(player.green==255||player.red!=255,buttonDisabledStyle,buttonEnabledStyle),
            disabled: player.green==255||player.red!=255
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
              autobuyFunctions("blue", 1000)
            }
          },
          addsub: {
            text: "Reset to gain " + gainRate.blue +" Blue (Requires 255 Green)",
            seen: player.unlocks.blue,
            onclick: function(){
              gainCurrency("blue")
            },
            style: customTrueFalseOutput(player.blue==255||player.green!=255,buttonDisabledStyle,buttonEnabledStyle),
            disabled: player.blue==255||player.green!=255
          },
        }
      ]
    }
  }
})
