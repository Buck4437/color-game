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
  let keepAutoProp = function (correspondingBit, color, colorHex, colorHexGrey, cost){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: color + "Auto",
      text: "Keep " + capitalizeFirstLetter(color) +" Autoclicker on prestige" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let keepMultiProp = function (correspondingBit, color, colorHex, colorHexGrey, cost){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: color + "Multi",
      text: "Keep " + capitalizeFirstLetter(color) +" multiplier upgrades on prestige" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let fasterAutoProp = function (correspondingBit, color, colorHex, colorHexGrey, cost){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: color + "FasterAuto",
      text: capitalizeFirstLetter(color) +" autoclicker speed x2" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if(!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let boostPhotonsProp = function (correspondingBit, color, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: color + "boostPhotons",
      text: "Gain more Photons based on " + capitalizeFirstLetter(color) + (containBit(upgradesBit, correspondingBit) ? " amount (Bought!)<br><br>Currently: x" + numToSci(lightUpgradesEffect().boostPhotons[color], 2, 2) : " amount<br><br>Currently: x"  + numToSci(lightUpgradesEffect().boostPhotons[color], 2, 2) + "<br><br>Cost: "  + cost + " Light"),
      onclick: function(){
        if(!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let lightAutoProp = function (correspondingBit, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: "lightAuto",
      text: "Unlock auto Lights Prestige" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)" : "<br><br>Cost: " + cost + " Light"),
      onclick: function(){
        if((!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost) && unlockReq){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let unspentMultiProp = function (correspondingBit, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: "unspentMulti",
      text: "(Unbal, No E) Multiplier to all colors based on unspent Light" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)<br><br>Currently: x" + numToSci(lightUpgradesEffect().unspentMulti, 2, 2) : " <br><br>Currently: x"  + numToSci(lightUpgradesEffect().unspentMulti, 2, 2) + "<br><br>Cost: "  + cost + " Light"),
      onclick: function(){
        if((!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost) && unlockReq){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? lightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? lightUpgradesStyles(colorHex, colorHexGrey).canBuy : lightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  game.lightUpgrades = {
    row1:{
      upgrade1: keepAutoProp(1, "red", "#f00", "#800", 1),
      upgrade2: keepMultiProp(2, "red", "#f00", "#800", 1),
      upgrade3: fasterAutoProp(4, "red", "#f00", "#800", 1),
      upgrade4: boostPhotonsProp(8, "red", "#aaa", "#555", 4, containBit(player.lights.upgradesBit, 1, 2, 4))
    },
    row2:{
      upgrade1: keepAutoProp(16, "green", "#0f0", "#080", 1),
      upgrade2: keepMultiProp(32, "green", "#0f0", "#080", 1),
      upgrade3: fasterAutoProp(64, "green", "#0f0", "#080", 1),
      upgrade4: boostPhotonsProp(128, "green", "#aaa", "#555", 20, containBit(player.lights.upgradesBit, 16, 32, 64))
    },
    row3:{
      upgrade1: keepAutoProp(256, "blue", "#00f", "#008", 1),
      upgrade2: keepMultiProp(512, "blue", "#00f", "#008", 1),
      upgrade3: fasterAutoProp(1024, "blue", "#00f", "#008", 1),
      upgrade4: boostPhotonsProp(2048, "blue", "#aaa", "#555", 100, containBit(player.lights.upgradesBit, 256, 512, 1024))
    },
    row4:{
      upgrade1: lightAutoProp(4096, "#aaa", "#555", 3, containBit(player.lights.upgradesBit, 1, 16, 256)),
      upgrade2: unspentMultiProp(8192, "#aaa", "#555", 10, containBit(player.lights.upgradesBit, 2, 32, 512))
    }
  }
}
