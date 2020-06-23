const defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  greenAuto: false,
  blue: 0,
  blueAuto: false,
  unlocks: {
   redAuto: true,
   green: true,
   greenAuto: true,
   blue: true,
   blueAuto: true
  }
};
var player = defaultSave;

var autobuyersInterval = {
  red: null
}

new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  methods:{
    gainFunctions: function(keyword, extraMultiplier){
      let xMul = extraMultiplier
      if (isNaN(xMul)){
        xMul = 1
      }
      switch(keyword){
        case "red":
          player.red += xMul * this.gainRate.red
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
      let gainFunctions = this.gainFunctions
      if(isNaN(updateRate)){
        updateRate = 100
      }
      switch(keyword){
        case "red":
          player.redAuto = !player.redAuto
          clearInterval(autobuyersInterval.red)
          if(player.redAuto){
            gainFunctions("red")
            autobuyersInterval.red = setInterval(function(){gainFunctions("red", updateRate/1000)}, updateRate)
          }
          break;
        case "green":
          player.greenAuto = !player.greenAuto
          clearInterval(autobuyersInterval.green)
          if(player.greenAuto){
            gainFunctions("green")
            autobuyersInterval.green = setInterval(function(){gainFunctions("green")}, updateRate)
          }
          break;
        case "blue":
          player.blueAuto = !player.blueAuto
          clearInterval(autobuyersInterval.blue)
          if(player.blueAuto){
            gainFunctions("blue")
            autobuyersInterval.blue = setInterval(function(){gainFunctions("blue")}, updateRate)
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
      let gainFunctions = this.gainFunctions
      let autobuyFunctions = this.autobuyFunctions
      let gainRate = this.gainRate
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
            text: "Auto: " + customTrueFalseText(player.redAuto,"On","Off"),
            seen: player.unlocks.redAuto,
            onclick: function(){
              autobuyFunctions("red", 100)
            }
          },
          addsub: {
            text: "+" + gainRate.red +" Red",
            seen: true,
            onclick: function(){
              gainFunctions("red")
            }
          }
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
            text: "Auto: " + customTrueFalseText(player.greenAuto,"On","Off"),
            seen: player.unlocks.greenAuto,
            onclick: function(){
              autobuyFunctions("green", 100)
            }
          },
          addsub: {
            text: "Reset Red, +" + gainRate.green + " Green (Needs 255 Red)",
            seen: player.unlocks.green,
            onclick: function(){
              gainFunctions("green")
            }
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
            text: "Auto: " + customTrueFalseText(player.blueAuto,"On","Off"),
            seen: player.unlocks.blue,
            onclick: function(){
              autobuyFunctions("blue", 100)
            }
          },
          addsub: {
            text: "Reset Red and Green, +" + gainRate.blue +" Blue (Needs 255 Green)",
            seen: player.unlocks.blue,
            onclick: function(){
              gainFunctions("blue")
            }
          }
        }
      ]
    }
  }
})
