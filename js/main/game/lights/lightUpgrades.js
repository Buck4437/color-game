new Vue({
  el: "#lightsTabUpgrades",
  data:{
    player: player,
    styles: {
      max: {
        color: "#00FF00",
        border: "4px solid #00FF00",
        cursor: "default"
      },
      canBuy: {
        color: "white",
        border: "4px solid white",
        cursor: "pointer"
      },
      cannotBuy: {
        color: "grey",
        border: "4px solid #888888",
        cursor: "default"
      }
    }
  },
  computed:{
    keepAutos: function(){
      let array = []
      let colors = ["red", "green", "blue"]
      for (let color of colors){
        array.push({
          key: color + "Auto",
          text: "Keep " + capitalizeFirstLetter(color) +" Autoclicker on prestige" + (player.lights.upgrades.keep[color].auto ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.keep[color].auto != true && player.lights.amount >= 1){
              player.lights.upgrades.keep[color].auto = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.keep[color].auto ? this.styles.max
                :player.lights.amount >= 1 ? this.styles.canBuy : this.styles.cannotBuy,
          disabled: player.lights.upgrades.keep[color].auto || player.lights.amount < 1
        })
      }
      return array
    },
    keepMultis: function(){
      let array = []
      let colors = ["red", "green", "blue"]
      for (let color of colors){
        array.push({
          key: color + "Multi",
          text: "Keep " + capitalizeFirstLetter(color) +" multiplier upgrades on prestige" + (player.lights.upgrades.keep[color].multi ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.keep[color].multi != true && player.lights.amount >= 1){
              player.lights.upgrades.keep[color].multi = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.keep[color].multi ? this.styles.max
                :player.lights.amount >= 1 ? this.styles.canBuy : this.styles.cannotBuy,
          disabled: player.lights.upgrades.keep[color].multi || player.lights.amount < 1
        })
      }
      return array
    },
    fasterAutos: function(){
      let array = []
      let colors = ["red", "green", "blue"]
      for (let color of colors){
        array.push({
          key: color + "FasterAuto",
          text: capitalizeFirstLetter(color) +" autoclicker speed x2" + (player.lights.upgrades.fasterAuto[color] ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.fasterAuto[color] != true && player.lights.amount >= 1){
              player.lights.upgrades.fasterAuto[color] = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.fasterAuto[color] ? this.styles.max
                :player.lights.amount >= 1 ? this.styles.canBuy : this.styles.cannotBuy,
          disabled: player.lights.upgrades.fasterAuto[color] || player.lights.amount < 1
        })
      }
      return array
    }
  }
})
