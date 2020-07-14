new Vue({
  el: "#unlockLights",
  data:{
    player: player
  },
  computed:{
    gainLights: function (){
      return{
        text: "Reset all progress to unlock new prestige layer.",
        isHidden: !((player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && (player.colors.blue.amount >= 255 && !player.lights.isUnlocked)),
        onclick: function(){
          if(confirm("This will reset all colors and upgrades, in exchange for new currencies. Proceed?")){
            player.lights.isUnlocked = true
            prestigeLights()
            switchMainTab("tabLights")
          }
        },
        style: {
          color: "white",
          border: "4px solid white",
          cursor: "pointer"
        }
      }
    }
  }
})

function canPrestigeLights(){
  return (player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && player.colors.blue.amount >= 255
}

function prestigeLights(){
  resetColor("red", "green", "blue")
  let colors = ["red", "green", 'blue']
  let types = ["auto", 'multi']
  for (let color of colors){
    for (let type of types){
      resetColorUpgrades(color, type)
    }
    clearInterval(game.autobuyersInterval[color])
    player.colors[color].auto = defaultSave.colors[color].auto
  }
  gainLights()
}

function resetColorUpgrades(color, type){
  player.colors[color].upgrades[type] = defaultSave.colors[color].upgrades[type]
}

function gainLights(){
  player.lights.amount += gainRateLights().lights
}

function gainRateLights(){
  return{
    lights: Math.max(Math.floor( (player.colors.blue.amount+1)/16 - 15 ), 1)||1
  }
}
//temp formula
