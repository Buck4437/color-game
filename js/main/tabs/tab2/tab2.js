function buyUpgrades(category, type, level){
  for (let currency in upgradesCost[category][type][level]){
    player[currency] -= upgradesCost[category][type][level][currency]
  }
  player.upgrades[category][type] = level
}

function canBuyUpgrades(category, type, level){
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
    upgrades: function(){
      let costParse = this.costParse
      let canBuyStyle = {
        color: "white",
        border: "4px solid white",
        cursor: "pointer"
      }
      let cannotBuyStyle = {
        color: "grey",
        border: "4px solid #888888",
        cursor: "default"
      }
      let maxBuyStyle = {
        color: "#00FF00",
        border: "4px solid #00FF00",
        cursor: "default"
      }
      return {
        redAuto: {
          text: {
            locked: "Unlock Red Autoclicker<br><br>Cost: 10 Red",
            unlocked: "Upgrade Red Autoclicker <br><br>" + player.upgrades.red.auto + " CPS => " + (player.upgrades.red.auto + 1) + " CPS<br><br>Cost: " + costStringify(upgradesCost.red.auto[player.upgrades.red.auto + 1]),
            maxed: "Upgrade Red Autoclicker<br><br>"+ player.upgrades.red.auto + " CPS (Maxed!)"
          },
          currentText:  upgradesCost.red.auto[player.upgrades.red.auto + 1] === undefined ? "maxed"
                     : player.upgrades.red.auto == 0 ? "locked"
                     : "unlocked",
          onclick: function(){
            if(canBuyUpgrades("red", "auto", player.upgrades.red.auto + 1)){
              buyUpgrades("red", "auto", player.upgrades.red.auto + 1)
              updateAutobuyers()
            }
          },
          disabled: !canBuyUpgrades("red", "auto", player.upgrades.red.auto + 1),
          style: upgradesCost.red.auto[player.upgrades.red.auto + 1] === undefined ? maxBuyStyle
               : canBuyUpgrades("red", "auto", player.upgrades.red.auto + 1) ? canBuyStyle
               : cannotBuyStyle
        },
        redMulti: {
          text: "x2 multiplier to Red gain<br><br>Currently: x" + 2**player.upgrades.red.multi + (upgradesCost.red.multi[player.upgrades.red.multi + 1] === undefined ? "" : ("<br><br>Cost: " + costStringify(upgradesCost.red.multi[player.upgrades.red.multi + 1]))),
          onclick: function(){
            if(canBuyUpgrades("red", "multi", player.upgrades.red.multi + 1)){
              buyUpgrades("red", "multi", player.upgrades.red.multi + 1)
              updateAutobuyers()
            }
          },
          disabled: !canBuyUpgrades("red", "multi", player.upgrades.red.multi + 1),
          style: upgradesCost.red.multi[player.upgrades.red.multi + 1] === undefined ? maxBuyStyle
               : canBuyUpgrades("red", "multi", player.upgrades.red.multi + 1) ? canBuyStyle
               : cannotBuyStyle
        }
      }
    }
  }
})
