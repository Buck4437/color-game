
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
        return init
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
          text: "Lights: " + numToSci(player.lights.amount, 0, 2),
          width: 100,
          color: "#4c4"
        },
        toggleAuto:{
          text: "Placeholder",
          onclick: function(){
          },
          style: buttonStyles.enabled
        },
        normalPhotons:{
          text: "Photons: " + numToSci(player.lights.photons.amount, 0, 2) + " (+" + numToSci(gainRateLights().photons, 0, 2) + "/s)",
          width: 100,
          color: "#ccc",
          textStyle:{
            color: "#333"
          }
        },
        double:{
          text: "x2 Photon gain speed. Cost: " + numToSci(2**(player.lights.photons.multi), 0, 2) + " Light" + (player.lights.photons.multi == 0 ? "" : "s"),
          onclick: function(){
            if(player.lights.amount >= 2**(player.lights.photons.multi)){
              player.lights.amount -= 2**(player.lights.photons.multi)
              player.lights.photons.multi ++
            }
          },
          style: (player.lights.amount >= 2**(player.lights.photons.multi)) ? buttonStyles.enabled : buttonStyles.disabled,
        },
        colorPhotons:["red", "green", "blue"],
        unassignedPhotons:{
          text: "Unassigned&nbspPhotons:&nbsp" + numToSci(unassignedPhotonsAmount()),
          width: unassignedPhotonsWidth(),
          color: "#888",
        }
      }
    }
  }
})
