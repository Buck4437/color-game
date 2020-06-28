function buyUpgrades(type, level){
  let array = Object.keys(upgradesCost[type][level])
  for (let i=0;i<array.length;i++){
    currency = array[i]
    player[currency] -= upgradesCost[type][level][currency]
  }
  player.upgrades[type] = level
}

function canBuyUpgrades(type, level){
  if(upgradesCost[type][level] === undefined){
    return false
  }
  let array = Object.keys(upgradesCost[type][level])
  for (let i=0;i<array.length;i++){
    currency = array[i]
    if(player[currency] < upgradesCost[type][level][currency]){
      return false
    }
  }
  return true
}

function costStringify(object){
  if(object === undefined){
    return
  }
  let string = ""
  let array = Object.keys(object)
  for (let i=0;i<array.length;i++){
    let property = array[i]
    if(string != ""){
      string += ","
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
        upgrade1: {
          text: customTrueFalseOutput(
            upgradesCost.redAuto[player.upgrades.redAuto + 1] === undefined,
              "Upgrade Red Autoclicker<br><br>"+ player.upgrades.redAuto + " CPS (Maxed!)",
              customTrueFalseOutput(player.upgrades.redAuto == 0,
                "Unlock Red Autoclicker <br><br>Cost: 10 Red",
                "Upgrade Red Autoclicker <br><br>"+ player.upgrades.redAuto + " CPS -> " + (player.upgrades.redAuto + 1) + " CPS<br><br>Cost: " + costStringify(upgradesCost.redAuto[player.upgrades.redAuto + 1])
              ),
          ),
          onclick: function(){
            if(canBuyUpgrades("redAuto", player.upgrades.redAuto + 1)){
              buyUpgrades("redAuto", player.upgrades.redAuto + 1)
              updateAutobuyers()
            }
          },
          disabled: !canBuyUpgrades("redAuto", player.upgrades.redAuto + 1),
          style: customTrueFalseOutput(
            upgradesCost.redAuto[player.upgrades.redAuto + 1] === undefined,
              maxBuyStyle,
              customTrueFalseOutput(canBuyUpgrades("redAuto", player.upgrades.redAuto + 1), canBuyStyle, cannotBuyStyle )
          )
        }
      }
    }
  }
})
