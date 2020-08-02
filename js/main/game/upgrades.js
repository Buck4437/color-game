new Vue ({
  el: "#tabUpgrades",
  data: {
    player: player
  },
  computed: {
    upgrades: function(){
      let costParse = this.costParse
      let styles = {
        max: {
          color: "#0a0",
          border: "4px solid #0f0",
          cursor: "default"
        },
        canBuy: {
          color: "white",
          border: "4px solid white",
          cursor: "pointer"
        },
        cannotBuy: {
          color: "grey",
          border: "4px solid #888",
          cursor: "default"
        }
      }
      return[
        {
          id: 0,
          auto: colorUpgradesProperties("red", "auto", styles),
          multi: colorUpgradesProperties("red", "multi", styles),
        },
        {
          id: 1,
          auto: colorUpgradesProperties("green", "auto", styles, !player.colors.green.upgrades.isUnlocked),
          multi: colorUpgradesProperties("green", "multi", styles, !player.colors.green.upgrades.isUnlocked)
        },
        {
          id: 2,
          auto: colorUpgradesProperties("blue", "auto", styles, !player.colors.blue.upgrades.isUnlocked),
          multi: colorUpgradesProperties("blue", "multi", styles, !player.colors.blue.upgrades.isUnlocked)
        }
      ]
    },
  }
})

function colorUpgradesProperties(name, type, styles, isHidden){
  return{
    color: name,
    onclick: function(){
      if(canbuyColorUpgrades(name, type, player.colors[name].upgrades[type] + 1)){
        buyColorUpgrades(name, type, player.colors[name].upgrades[type] + 1)
        updateAutobuyers()
      }
    },
    isHidden: isHidden,
    disabled: !canbuyColorUpgrades(name, type, player.colors[name].upgrades[type] + 1),
    styles: styles
  }
}

function buyColorUpgrades(name, type, level){
  for (let currency in game.upgradesCost[name][type][level]){
    player.colors[currency].amount -= game.upgradesCost[name][type][level][currency]
  }
  player.colors[name].upgrades[type] = level
}

function canbuyColorUpgrades(category, type, level){
  if(game.upgradesCost[category][type][level] === undefined){
    return false
  }
  for (let currency in game.upgradesCost[category][type][level]){
    if(player.colors[currency].amount < game.upgradesCost[category][type][level][currency]){
      return false
    }
  }
  return true
}

function costStringify(object){
  if(object === undefined){
    return ""
  }
  let string = ""
  for (let property in object){
    if(string != ""){
      string += ", "
    }
    string += (numToSci(object[property]) + " " + capitalizeFirstLetter(property))
  }
  return string
}
