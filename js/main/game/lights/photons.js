new Vue({
  el:"#lightsTabPhotons",
  data:{
    player: player
  },
  computed:{
    lights: function(){
      let buttonStyles = {
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
      let unassignedPhotonsAmount = function(){
        let init = player.lights.photons.amount
        let colors = ["red", "green", "blue"]
        for (color of colors){
          init -= Math.floor(player.lights.photons.percentage[color] * player.lights.photons.amount/100)
        }
        return Math.floor(init)
      }
      let unassignedPhotonsWidth = function(){
        let init = 100
        let colors = ["red", "green", "blue"]
        for (color of colors){
          init -= player.lights.photons.percentage[color]
        }
        return init
      }
      return {
        bar:{
          text: "Lights: " + Math.floor(player.lights.amount),
          width: 100,
          color: "#4c4"
        },
        gainLights:{
          elementID: "buttonPrestigeLights",
          text: "Reset to gain " + gainRateLights().lights + " Light" + (gainRateLights().lights != 1 ? "s" : ""),
          onclick: function(){
            if(player.options.confirmation.lights){
              if(confirm("This will reset all colors, upgrades, AND photons in exchanging for lights. Proceed? (You can't turn this off in Settings yet because i have not implemented it yet bear with me)")){
                prestigeLights()
              }
              return
            }
            prestigeLights()
          },
          style: canPrestigeLights() ? buttonStyles.enabled : buttonStyles.disabled,
          disabled: !canPrestigeLights()
        },
        initiate:{
          text: "Initiate Photon Emission. Cost: 1 Light",
          isHidden: player.lights.photons.isInitiated,
          onclick: function(){
            player.lights.amount --
            player.lights.photons.isInitiated = true
            player.lights.upgrades.isUnlocked = true
          },
          style: {
            borderRadius: "8px",
            height: "46px",
            width: "300px",
            color: "white",
            border: "4px solid white",
            cursor: "pointer"
          }
        },
        normalPhotons:{
          text: "Photons: " + Math.floor(player.lights.photons.amount) + " (+" + gainRateLights().photons + "/s)",
          width: 100,
          color: "#ccc",
          textStyle:{
            color: "#333"
          }
        },
        colorPhotons:["red", "green", "blue"],
        unassignedPhotons:{
          text: "Unassigned&nbspPhotons:&nbsp" + unassignedPhotonsAmount(),
          width: unassignedPhotonsWidth(),
          color: "#888",
        }
      }
    }
  }
})

function photonEffect(){
  let photons = player.lights.photons.amount
  return{
    red: Math.round(100 + 100 * (photons * player.lights.photons.percentage.red/100)**0.5) / 100,
    green: Math.round(100 + 100 * (photons * player.lights.photons.percentage.green/100)**0.4) / 100,
    blue: Math.round(100 + 100 * (photons * player.lights.photons.percentage.blue/100)**0.3) / 100,
  }
}
