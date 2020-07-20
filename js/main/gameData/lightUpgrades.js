function updateGameDataLightUpgrades(){
  let lightUpgradesStyles = function(color, colorGrey){
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
        border: "4px solid " + colorGrey,
        cursor: "default"
      }
    }
  }
  let keepAutoProp = function (color, colorHex, colorHexGrey){
    return {
      key: color + "Auto",
      text: "Keep " + capitalizeFirstLetter(color) +" Autoclicker on prestige" + (player.lights.upgrades.keep[color].auto ? " (Bought!)" : "<br><br>Cost: 1 Light"),
      onclick: function(){
        if(player.lights.upgrades.keep[color].auto != true && player.lights.amount >= 1){
          player.lights.upgrades.keep[color].auto = true
          player.lights.amount --
        }
      },
      style: player.lights.upgrades.keep[color].auto ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= 1 ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy,
      disabled: player.lights.upgrades.keep[color].auto || player.lights.amount < 1
    }
  }
  let keepMultiProp = function (color, colorHex, colorHexGrey){
    return {
      key: color + "Multi",
      text: "Keep " + capitalizeFirstLetter(color) +" multiplier upgrades on prestige" + (player.lights.upgrades.keep[color].multi ? " (Bought!)" : "<br><br>Cost: 1 Light"),
      onclick: function(){
        if(player.lights.upgrades.keep[color].multi != true && player.lights.amount >= 1){
          player.lights.upgrades.keep[color].multi = true
          player.lights.amount --
        }
      },
      style: player.lights.upgrades.keep[color].multi ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= 1 ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy,
      disabled: player.lights.upgrades.keep[color].multi || player.lights.amount < 1
    }
  }
  game.lightUpgrades = {
    row1:{
      upgrade1: keepAutoProp("red", "#f00", "#800"),
      upgrade2: keepMultiProp("red", "#f00", "#800"),
      upgrade3:{
        key: "redfasterAuto",
        text: "Keep Red Autoclicker on prestige" + (player.lights.upgrades.fasterAuto.red ? " (Bought!)" : "<br><br>Cost: 1 Light"),
        onclick: function(){
          if(player.lights.upgrades.fasterAuto.red != true && player.lights.amount >= 1){
            player.lights.upgrades.fasterAuto.red = true
            player.lights.amount -= 1
          }
        },
        style: player.lights.upgrades.fasterAuto.red ? lightUpgradesStyles("#f00", "#800").max
              :player.lights.amount >= 1 ? lightUpgradesStyles("#f00", "#800").canBuy : lightUpgradesStyles("#f00", "#800").cannotBuy,
        disabled: player.lights.upgrades.fasterAuto.red || player.lights.amount < 1
      },
      upgrade4:{
        key: "redboostPhotons",
        text: "Multiplier to photons based on Red" + (player.lights.upgrades.boostPhotons.red ? " (Bought!)" : "") + "<br><br>Currently: x" + numToSci(lightUpgradesEffect().boostPhotons.red, 2) + (player.lights.upgrades.boostPhotons.red ? "" : "<br><br>Cost: " + 3 + " Light"),
        onclick: function(){
          if(player.lights.upgrades.boostPhotons.red != true && player.lights.amount >= 3){
            player.lights.upgrades.boostPhotons.red = true
            player.lights.amount -= 3
          }
        },
        style: player.lights.upgrades.boostPhotons.red ? lightUpgradesStyles("#f00", "#800").max
              :player.lights.amount >= 3 ? lightUpgradesStyles("#f00", "#800").canBuy : lightUpgradesStyles("#f00", "#800").cannotBuy,
        disabled: player.lights.upgrades.boostPhotons.red || player.lights.amount < 3
      }
    }
  }
}
