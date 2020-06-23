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


new Vue ({
  el: "#playerMain",
  data: {
    player: player,
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
      let gainRate = this.gainRate
      return [
        {
          id: 0,
          bar: {
            name: "Red",
            counter: "player.red",
            max: 255,
            color: "red",
            seen: true
          },
          auto: {
            text: "Auto: " + customTrueFalseText(player.redAuto,"On","Off"),
            seen: player.unlocks.redAuto,
            onclick: function(){
              player.redAuto = !player.redAuto
            }
          },
          addsub: {
            text: "+" + gainRate.red +" Red",
            seen: true,
            onclick: function(){
              player.red += gainRate.red
              if(player.red > 255){
                player.red = 255
              }
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
            seen: player.unlocks.green
          },
          auto: {
            text: "Auto: " + customTrueFalseText(player.greenAuto,"On","Off"),
            seen: player.unlocks.greenAuto,
            onclick: function(){
              player.greenAuto = !player.greenAuto
            }
          },
          addsub: {
            text: "Reset Red, +" + gainRate.green + " Green (Needs 255 Red)",
            seen: player.unlocks.green,
            onclick: function(){
              if(player.red == 255 && player.green != 255){
                player.red = 0
                player.green += gainRate.green
                if(player.green > 255){
                  player.green = 255
                }
              }
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
            seen: player.unlocks.blue
          },
          auto: {
            text: "Auto: " + customTrueFalseText(player.blueAuto,"On","Off"),
            seen: player.unlocks.blue,
            onclick: function(){
              player.blueAuto = !player.blueAuto
            }
          },
          addsub: {
            text: "Reset Red and Green, +" + gainRate.blue +" Blue (Needs 255 Green)",
            seen: player.unlocks.blue,
            onclick: function(){
              if(player.green == 255 && player.blue != 255){
                player.red = 0
                player.green = 0
                player.blue += gainRate.blue
                if(player.blue > 255){
                  player.blue = 255
                }
              }
            }
          }
        }
      ]
    }
  }
})
