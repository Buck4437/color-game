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
        },
        color: function(color){
          return {
            color: color,
            border: "4px solid " + color,
            cursor: "pointer"
          }
        }
      }
      let inputStyles = {
        color: function(color){
          return {
            borderBottom: "1px solid " + color,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "black",
            color: color,
            height: "15px",
            cursor: "text",
            textAlign: "center",
            width: "75px",
            marginLeft: "10px",
            marginRight: "10px"
          }
        }
      }
      let unassignedPhotonsAmount = function(){
        let photonAmount = Math.floor(player.lights.photons.amount)
        let init = Math.floor(player.lights.photons.amount)
        for (color of ["red", "green", "blue"]){
          init -= Math.floor(player.lights.photons.percentage[color] * photonAmount/100)
        }
        if (init/(photonAmount+1) < 0.001){
          return 0
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
        auto:{
          display: containBit(player.lights.upgradesBit, 4096) ? "inline-block" : "none"
        },
        toggleAuto:{
          text: player.lights.auto.isEnabled ? "Auto: On" : "Auto: Off",
          click: function(){
            player.lights.auto.isEnabled = !player.lights.auto.isEnabled
            updateAutobuyersLights()
          },
          style: player.lights.auto.isEnabled ? buttonStyles.color("#0f0") : buttonStyles.color("#c00")
        },
        toggleMode:{
          text: player.lights.auto.mode == 0 ? "Mode: Amount" : "Mode: Time",
          click: function(){
            player.lights.auto.mode = (player.lights.auto.mode + 1) % 2
            if(isNaN(player.lights.auto.mode)){
              player.lights.auto.mode = 0
            }
          },
          style: buttonStyles.enabled,
          protext: player.lights.auto.mode == 0 ? (player.lights.auto.value == 1 ? "Light" : "Lights" ) : (player.lights.auto.value == 1 ? "second" : "seconds" )
        },
        input:{
          style: isNaN(parseFloat($("#lightsAutoInput").val())) ? inputStyles.color("red") : inputStyles.color("white")
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
          click: function(){
            if(player.lights.amount >= 2**(player.lights.photons.multi)){
              player.lights.amount -= 2**(player.lights.photons.multi)
              player.lights.photons.multi ++
            }
          },
          style: (player.lights.amount >= 2**(player.lights.photons.multi)) ? buttonStyles.enabled : buttonStyles.disabled,
        },
        colorPhotons:["red", "green", "blue"],
        unassignedPhotons:{
          text: "Unassigned&nbspPhotons:&nbsp" + numToSci(unassignedPhotonsAmount(), 0, 2),
          width: unassignedPhotonsWidth(),
          color: "#888",
        }
      }
    }
  }
})

$(function() {
  $("#lightsAutoInput").on("input", function(){
    let parsedNum = parseFloat($("#lightsAutoInput").val())
    if (!isNaN(parsedNum)){
      player.lights.auto.value = parsedNum
    }
  })
});
