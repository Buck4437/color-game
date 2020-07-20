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
  let keepAutoProp = function (color, colorHex, colorHexGrey, cost){
    return {
      key: color + "Auto",
      text: "Keep " + capitalizeFirstLetter(color) +" Autoclicker on prestige" + (player.lights.upgrades.keep[color].auto ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(player.lights.upgrades.keep[color].auto != true && player.lights.amount >= cost){
          player.lights.upgrades.keep[color].auto = true
          player.lights.amount -= cost
        }
      },
      style: player.lights.upgrades.keep[color].auto ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let keepMultiProp = function (color, colorHex, colorHexGrey, cost){
    return {
      key: color + "Multi",
      text: "Keep " + capitalizeFirstLetter(color) +" multiplier upgrades on prestige" + (player.lights.upgrades.keep[color].multi ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(player.lights.upgrades.keep[color].multi != true && player.lights.amount >= cost){
          player.lights.upgrades.keep[color].multi = true
          player.lights.amount --
        }
      },
      style: player.lights.upgrades.keep[color].multi ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let fasterAutoProp = function (color, colorHex, colorHexGrey, cost){
    return {
      key: color + "FasterAuto",
      text: capitalizeFirstLetter(color) +" autoclicker speed x2" + (player.lights.upgrades.fasterAuto[color] ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(player.lights.upgrades.fasterAuto[color] != true && player.lights.amount >= cost){
          player.lights.upgrades.fasterAuto[color] = true
          player.lights.amount --
        }
      },
      style: player.lights.upgrades.fasterAuto[color] ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let boostPhotonsProp = function (color, colorHex, colorHexGrey, cost){
    return {
      key: color + "boostPhotons",
      text: "Multiplier to photons based on " + capitalizeFirstLetter(color) + (player.lights.upgrades.boostPhotons[color] ? " (Bought!)" : "") + "<br><br>Currently: x" + numToSci(lightUpgradesEffect().boostPhotons[color], 2) + (player.lights.upgrades.boostPhotons[color] ? "" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(player.lights.upgrades.boostPhotons[color] != true && player.lights.amount >= cost){
          player.lights.upgrades.boostPhotons[color] = true
          player.lights.amount -= cost
        }
      },
      style: player.lights.upgrades.boostPhotons[color] ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  game.lightUpgrades = {
    row1:{
      upgrade1: keepAutoProp("red", "#f00", "#800", 1),
      upgrade2: keepMultiProp("red", "#f00", "#800", 1),
      upgrade3: fasterAutoProp("red", "#f00", "#800", 1),
      upgrade4: boostPhotonsProp("red", "#f00", "#800", 3)
    },
    row2:{
      upgrade1: keepAutoProp("green", "#0f0", "#080", 1),
      upgrade2: keepMultiProp("green", "#0f0", "#080", 1),
      upgrade3: fasterAutoProp("green", "#0f0", "#080", 1),
      upgrade4: boostPhotonsProp("green", "#0f0", "#080", 5)
    },
    row3:{
      upgrade1: keepAutoProp("blue", "#00f", "#008", 1),
      upgrade2: keepMultiProp("blue", "#00f", "#008", 1),
      upgrade3: fasterAutoProp("blue", "#00f", "#008", 1),
      upgrade4: boostPhotonsProp("blue", "#00f", "#008", 10)
    }
  }
}
