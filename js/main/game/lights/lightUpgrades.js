new Vue({
  el: "#lightsTabUpgrades",
  data:{
    player: player,
    game: game,
    colors: [["red", "#f00", "#800"], ["green", "#0f0", "#080"], ["blue", "#00f", "#008"]],
  },
  computed:{
    styles: function (){
      return function(color, greyVer){
        return{
          max: {
            color: color,
            border: "4px solid " + color,
            cursor: "default"
          },
          canBuy: {
            color: "white",
            border: "4px solid " + color,
            cursor: "pointer"
          },
          cannotBuy: {
            color: "grey",
            border: "4px solid " + greyVer,
            cursor: "default"
          }
        }
      }
    },
    row1: function(){
      let array = []
      for (let upgrade in game.lightUpgrades.row1){
        array.push(game.lightUpgrades.row1[upgrade])
      }
      return array
    },
    column1: function(){
      let array = []
      for (let [color, codeName, codeNameGrey] of this.colors){
        array.push({
          key: color + "Auto",
          text: "Keep " + capitalizeFirstLetter(color) +" Autoclicker on prestige" + (player.lights.upgrades.keep[color].auto ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.keep[color].auto != true && player.lights.amount >= 1){
              player.lights.upgrades.keep[color].auto = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.keep[color].auto ? this.styles(codeName, codeNameGrey).max
                :player.lights.amount >= 1 ? this.styles(codeName, codeNameGrey).canBuy : this.styles(codeName, codeNameGrey).cannotBuy,
          disabled: player.lights.upgrades.keep[color].auto || player.lights.amount < 1
        })
      }
      // array.push({
      // })
      return array
    },
    column2: function(){
      let array = []
      for (let [color, codeName, codeNameGrey] of this.colors){
        array.push({
          key: color + "Multi",
          text: "Keep " + capitalizeFirstLetter(color) +" multiplier upgrades on prestige" + (player.lights.upgrades.keep[color].multi ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.keep[color].multi != true && player.lights.amount >= 1){
              player.lights.upgrades.keep[color].multi = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.keep[color].multi ? this.styles(codeName, codeNameGrey).max
                :player.lights.amount >= 1 ? this.styles(codeName, codeNameGrey).canBuy : this.styles(codeName, codeNameGrey).cannotBuy,
          disabled: player.lights.upgrades.keep[color].multi || player.lights.amount < 1
        })
      }
      return array
    },
    column3: function(){
      let array = []
      for (let [color, codeName, codeNameGrey] of this.colors){
        array.push({
          key: color + "FasterAuto",
          text: capitalizeFirstLetter(color) +" autoclicker speed x2" + (player.lights.upgrades.fasterAuto[color] ? " (Bought!)" : "<br><br>Cost: 1 Light"),
          onclick: function(){
            if(player.lights.upgrades.fasterAuto[color] != true && player.lights.amount >= 1){
              player.lights.upgrades.fasterAuto[color] = true
              player.lights.amount --
            }
          },
          style: player.lights.upgrades.fasterAuto[color] ? this.styles(codeName, codeNameGrey).max
                :player.lights.amount >= 1 ? this.styles(codeName, codeNameGrey).canBuy : this.styles(codeName, codeNameGrey).cannotBuy,
          disabled: player.lights.upgrades.fasterAuto[color] || player.lights.amount < 1
        })
      }
      return array
    },
    column4: function(){
      let array = []
      let colors = [["red", 3, "#f00", "#800"], ["green", 5, "#0f0", "#080"], ["blue", 10, "#00f", "#008"]]
      for (let [color, cost, codeName, codeNameGrey] of colors){
        array.push({
          key: color + "boostPhotons",
          text: "Multiplier to photons based on " + capitalizeFirstLetter(color) + (player.lights.upgrades.boostPhotons[color] ? " (Bought!)" : "") + "<br><br>Currently: x" + numToSci(lightUpgradesEffect().boostPhotons[color], 2) + (player.lights.upgrades.boostPhotons[color] ? "" : "<br><br>Cost: " + cost + " Light"),
          onclick: function(){
            if(player.lights.upgrades.boostPhotons[color] != true && player.lights.amount >= cost){
              player.lights.upgrades.boostPhotons[color] = true
              player.lights.amount -= cost
            }
          },
          style: player.lights.upgrades.boostPhotons[color] ? this.styles(codeName, codeNameGrey).max
                :player.lights.amount >= cost ? this.styles(codeName, codeNameGrey).canBuy : this.styles(codeName, codeNameGrey).cannotBuy,
          disabled: player.lights.upgrades.boostPhotons[color] || player.lights.amount < cost
        })
      }
      return array
    }
  }
})
