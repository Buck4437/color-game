new Vue ({
  el: "#playerMain",
  data: {
    player: player,
  },
  computed:{
    colors: function(){
      let styles = {
        enabled:{
          color: "white",
          border: "4px solid white",
          cursor: "pointer"
        },
        disabled:{
          color: "grey",
          border: "4px solid #888888",
          cursor: "default"
        }
      }
      return [
        playerMainProperty(0, "red", false, "+" + numToSci(gainRateColor().red, 0, 2) +" Red", styles),
        playerMainProperty(1, "green", false, "Reset to gain " + numToSci(gainRateColor().green, 0, 2) + " Green (Requires 255 Red)", styles, firstTimeUnlockColor().green),
        playerMainProperty(2, "blue", !player.colors.blue.isUnlocked, "Reset to gain " + numToSci(gainRateColor().blue, 0, 2) +" Blue (Requires 255 Green)", styles, firstTimeUnlockColor().blue)
      ]
    }
  }
})

function playerMainProperty(id, name, isBarHidden, text, styles, unlockFunction){
  return {
    id: id,
    global:{
      name: name,
      color: name
    },
    bar:{
      max: 255,
      isHidden: isBarHidden
    },
    addsub: {
      text: text,
      isHidden: isBarHidden,
      style: styles,
      unlocks: unlockFunction,
      elementID: "colors" + capitalizeFirstLetter(name) + "Add"
    },
  }
}

function firstTimeUnlockColor(){
  return{
    green: function(){
      player.colors.green.upgrades.isUnlocked = true
      player.colors.blue.isUnlocked = true
    },
    blue: function(){
      player.colors.blue.upgrades.isUnlocked = true
    }
  }
}

function canGainColor(){
  return {
    red: player.colors.red.amount < 255,
    green: player.colors.red.amount >= 255 && player.colors.green.amount < 255,
    blue: player.colors.green.amount >= 255 && player.colors.blue.amount < 255
  }
}

function gainColor(color){
  if(canGainColor()[color]){
    prestigeColor(color)
    player.colors[color].amount += gainRateColor()[color]
    if(player.colors[color].amount > 255){
      player.colors[color].amount = 255
    }
  }
}

function resetColor(){
  for (let item of arguments){
    player.colors[item].amount = 0
  }
}

function prestigeColor(color){
  if(color == "green"){
    resetColor("red")
  }else if(color == "blue"){
    resetColor("red", "green")
  }
}
