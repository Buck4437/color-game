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
          auto: {
            color: "red",
            onclick: function(){
              if(canbuyColorUpgrades("red", "auto", player.upgrades.red.auto + 1)){
                buyColorUpgrades("red", "auto", player.upgrades.red.auto + 1)
                updateAutobuyers()
              }
            },
            disabled: !canbuyColorUpgrades("red", "auto", player.upgrades.red.auto + 1),
            styles: styles
          },
          multi: {
            color: "red",
            onclick: function(){
              if(canbuyColorUpgrades("red", "multi", player.upgrades.red.multi + 1)){
                buyColorUpgrades("red", "multi", player.upgrades.red.multi + 1)
                updateAutobuyers()
              }
            },
            disabled: !canbuyColorUpgrades("red", "multi", player.upgrades.red.multi + 1),
            styles: styles
          }
        },
        {
          id: 1,
          auto: {
            color: "green",
            onclick: function(){
              if(canbuyColorUpgrades("green", "auto", player.upgrades.green.auto + 1)){
                buyColorUpgrades("green", "auto", player.upgrades.green.auto + 1)
                updateAutobuyers()
              }
            },
            isHidden: !player.unlocks.upgrades.green,
            disabled: !canbuyColorUpgrades("green", "auto", player.upgrades.green.auto + 1),
            styles: styles
          },
          multi:{
            color: "green",
            onclick: function(){
              if(canbuyColorUpgrades("green", "multi", player.upgrades.red.multi + 1)){
                buyColorUpgrades("green", "multi", player.upgrades.red.multi + 1)
                updateAutobuyers()
              }
            },
            isHidden: !player.unlocks.upgrades.green,
            disabled: !canbuyColorUpgrades("green", "multi", player.upgrades.red.multi + 1),
            styles: styles
          }
        }
      ]
    },
  }
})
