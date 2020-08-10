function updateGameDataLightUpgrades(){
  let innerLightUpgradesStyles = function(color, colorGrey){
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
  let outerLightUpgradesStyles = function(color, colorGrey){
    return{
      max: {
        color: color,
        border: "4px solid #ccc",
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
      style: containBit(upgradesBit, correspondingBit) ? innerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? innerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : innerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
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
      style: containBit(upgradesBit, correspondingBit) ? innerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? innerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : innerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
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
        updateAutobuyers()
      },
      style: containBit(upgradesBit, correspondingBit) ? innerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost ? innerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : innerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
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
      style: containBit(upgradesBit, correspondingBit) ? outerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? outerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : outerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
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
      style: containBit(upgradesBit, correspondingBit) ? outerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? outerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : outerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let unspentMultiProp = function (correspondingBit, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: "unspentMulti",
      text: "Multiplier to all colors based on unspent Light" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)<br><br>Currently: x" + numToSci(lightUpgradesEffect().unspentMulti, 2, 2) : " <br><br>Currently: x"  + numToSci(lightUpgradesEffect().unspentMulti, 2, 2) + "<br><br>Cost: "  + cost + " Light"),
      onclick: function(){
        if((!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost) && unlockReq){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? outerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? outerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : outerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let auto20Prop = function (correspondingBit, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: "auto20",
      text: "All autoclicker always work at 20 CPS" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)" : "<br><br>Cost: "  + cost + " Light"),
      onclick: function(){
        if((!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost) && unlockReq){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
          updateAutobuyers()
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? outerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? outerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : outerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  let moreLightsProp = function (correspondingBit, colorHex, colorHexGrey, cost, unlockReq){
    let upgradesBit = player.lights.upgradesBit
    return {
      key: "moreLights",
      text: "Multiplier to Light gain based on unspent Light" + (containBit(upgradesBit, correspondingBit) ? " (Bought!)<br><br>Currently: x" + numToSci(lightUpgradesEffect().moreLights, 2, 2) : " <br><br>Currently: x"  + numToSci(lightUpgradesEffect().moreLights, 2, 2) + "<br><br>Cost: "  + cost + " Light"),
      onclick: function(){
        if((!containBit(upgradesBit, correspondingBit) && player.lights.amount >= cost) && unlockReq){
          player.lights.upgradesBit += correspondingBit
          player.lights.amount -= cost
        }
      },
      style: containBit(upgradesBit, correspondingBit) ? outerLightUpgradesStyles(colorHex, colorHexGrey).max
            :player.lights.amount >= cost && unlockReq ? outerLightUpgradesStyles(colorHex, colorHexGrey).canBuy : outerLightUpgradesStyles(colorHex, colorHexGrey).cannotBuy
    }
  }
  game.lightUpgrades = {
    row1:{
      upgrade1: keepAutoProp(1, "red", "#f00", "#800", 1),
      upgrade2: keepMultiProp(2, "red", "#f00", "#800", 1),
      upgrade3: fasterAutoProp(4, "red", "#f00", "#800", 1),
      upgrade4: boostPhotonsProp(8, "red", "#999", "#555", 4, containBit(player.lights.upgradesBit, 1, 2, 4))
    },
    row2:{
      upgrade1: keepAutoProp(16, "green", "#0f0", "#080", 1),
      upgrade2: keepMultiProp(32, "green", "#0f0", "#080", 1),
      upgrade3: fasterAutoProp(64, "green", "#0f0", "#080", 1),
      upgrade4: boostPhotonsProp(128, "green", "#999", "#555", 20, containBit(player.lights.upgradesBit, 16, 32, 64))
    },
    row3:{
      upgrade1: keepAutoProp(256, "blue", "#00f", "#008", 1),
      upgrade2: keepMultiProp(512, "blue", "#00f", "#008", 1),
      upgrade3: fasterAutoProp(1024, "blue", "#00f", "#008", 1),
      upgrade4: boostPhotonsProp(2048, "blue", "#999", "#555", 100, containBit(player.lights.upgradesBit, 256, 512, 1024))
    },
    row4:{
      upgrade1: lightAutoProp(4096, "#999", "#555", 3, containBit(player.lights.upgradesBit, 1, 16, 256)),
      upgrade2: unspentMultiProp(8192, "#999", "#555", 50, containBit(player.lights.upgradesBit, 2, 32, 512)),
      upgrade3: auto20Prop(16384, "#999", "#555", 300, containBit(player.lights.upgradesBit, 4, 64, 1024)),
      upgrade4: moreLightsProp(32768, "#999", "#555", 1000, containBit(player.lights.upgradesBit, 8, 128, 2048, 4096, 8192, 16384))
    }
  }
}
