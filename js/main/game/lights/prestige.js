new Vue({
  el: "#unlockLights",
  data:{
    player: player
  },
  computed:{
    gainLights: function (){
      return{
        text: "Reset all progress to unlock a new prestige layer.",
        isHidden: !((player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && (player.colors.blue.amount >= 255 && !player.lights.isUnlocked)),
        click: function(){
          if(confirm("This will reset all colors and upgrades. You will gain new currencies and unlock new upgrades in exchange. Proceed?")){
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
  return player.colors.blue.amount >= 255
}

function prestigeLights(){
  if(player.stats.prestigeTime.lights.current < player.stats.prestigeTime.lights.fastest){
    player.stats.prestigeTime.lights.fastest = player.stats.prestigeTime.lights.current
  }
  player.stats.prestigeTime.lights.current = 0
  gainLights()
  resetColor("red", "green", "blue")
  resetColorUpgrades()
  player.lights.photons.amount = 0
}

function resetColorUpgrades(){
  let colors = ["red", "green", 'blue']
  let types = ["auto", 'multi']
  for (let [cIndex, color] of colors.entries()){
    for (let [tIndex, type] of types.entries()){
      if(!containBit(player.lights.upgradesBit, (16**cIndex)*(2**tIndex))){
        player.colors[color].upgrades[type] = 0
      }
    }
    if(!containBit(player.lights.upgradesBit, (16**cIndex))){
      clearInterval(game.autobuyersInterval[color])
      player.colors[color].auto = false
    }
  }
}


function gainLights(){
  player.lights.amount += gainRateLights().lights
}
