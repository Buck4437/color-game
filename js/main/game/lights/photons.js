new Vue({
  el:"#lightsTabPhotons",
  data:{
    player: player
  },
  computed:{
    lights: function(){
      let prestigeLightsStyles = {
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
      return {
        bar:{
          name: "Lights",
          counter: "player.lights.amount",
          max: 1,
          hideMax: true,
          color: "#4c4",
          intRounding: "floor"
        },
        gainLights:{
          elementID: "buttonPrestigeLights",
          text: "Reset to gain " + gainRateLights().lights + " Light" + (gainRateLights().lights != 1 ? "s" : ""),
          onclick: function(){
            if(player.options.confirmation.lights){
              if(confirm("This will reset all colors and upgrades in exchanging for lights. Proceed? (You can't turn this off in Settings yet because i have not implemented it yet bear with me)")){
                prestigeLights()
              }
              return
            }
            prestigeLights()
          },
          style: canPrestigeLights() ? prestigeLightsStyles.enabled : prestigeLightsStyles.disabled,
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
            color: "white",
            border: "4px solid white",
            borderRadius: "8px",
            cursor: "pointer",
            height: "46px",
            width: "300px"
          }
        }
      }
    }
  }
})
