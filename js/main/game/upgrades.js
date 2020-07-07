function colorUpgradesProperties(name, type, styles, isHidden){
  return{
    color: name,
    onclick: function(){
      if(canbuyColorUpgrades(name, type, player.upgrades[name][type] + 1)){
        buyColorUpgrades(name, type, player.upgrades[name][type] + 1)
        updateAutobuyers()
      }
    },
    isHidden: isHidden,
    disabled: !canbuyColorUpgrades(name, type, player.upgrades[name][type] + 1),
    styles: styles
  }
}

function buyColorUpgrades(category, type, level){
  for (let currency in upgradesCost[category][type][level]){
    player[currency] -= upgradesCost[category][type][level][currency]
  }
  player.upgrades[category][type] = level
}

function canbuyColorUpgrades(category, type, level){
  if(upgradesCost[category][type][level] === undefined){
    return false
  }
  for (let currency in upgradesCost[category][type][level]){
    if(player[currency] < upgradesCost[category][type][level][currency]){
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
    string += (object[property] + " " + capitalizeFirstLetter(property))
  }
  return string
}

new Vue ({
  el: "#tab2",
  data: {
    player: player
  },
  computed: {
    topText: function(){
      return "Red: " + player.red + (player.unlocks.color.blue ? ", Green: " + player.green : "" )
    },
    upgrades: function(){
      let costParse = this.costParse
      let styles = {
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
      return[
        {
          id: 0,
          auto: colorUpgradesProperties("red", "auto", styles),
          multi: colorUpgradesProperties("red", "multi", styles),
        },
        {
          id: 1,
          auto: colorUpgradesProperties("green", "auto", styles, !player.unlocks.upgrades.green),
          multi: colorUpgradesProperties("green", "multi", styles, !player.unlocks.upgrades.green)
        }
      ]
    },
  }
})
