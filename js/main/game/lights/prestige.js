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
  return player.colors.blue.amount >= 255
}

function prestigeLights(){
  gainLights()
  resetColor("red", "green", "blue")
  let colors = ["red", "green", 'blue']
  let types = ["auto", 'multi']
  for (let color of colors){
    for (let type of types){
      if(!player.lights.upgrades.keep[color][type]){
        resetColorUpgrades(color, type)
      }
    }
    if(!player.lights.upgrades.keep[color].auto){
      clearInterval(game.autobuyersInterval[color])
      player.colors[color].auto = false
    }
  }
  player.lights.photons.amount = 0
}

function resetColorUpgrades(color, type){
  player.colors[color].upgrades[type] = 0
}

function gainLights(){
  player.lights.amount += gainRateLights().lights
}
