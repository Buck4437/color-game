new Vue({
  el: "#currency-bar",
  data:{
    player: player,
    buttonStyles: {
      lights:{
        enabled:{
          color: "#0f0",
          border: "4px solid #0f0",
          cursor: "pointer"
        },
        disabled:{
          color: "#080",
          border: "4px solid #080",
          cursor: "default"
        }
      }
    }
  },
  computed:{
    red: function(){
      return numToSci(player.colors.red.amount, 0, 2)
    },
    green: function(){
      return numToSci(player.colors.green.amount, 0, 2)
    },
    blue: function(){
      return numToSci(player.colors.blue.amount, 0, 2)
    },
    lights: function(){
      return numToSci(player.lights.amount, 0, 2)
    },
    lightsPrestige: function(){
      return {
        text: "+" + numToSci(gainRateLights().lights, 0, 2) + " <u style='color:" + (canPrestigeLights() ? this.buttonStyles.lights.enabled.color : this.buttonStyles.lights.disabled.color) + "'>L</u>ight" + (gainRateLights().lights != 1 ? "s" : ""),
        click: function(){
          if((player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && player.colors.blue.amount >= 255){
            if(player.settings.confirmation.lights){
              if(confirm("This will reset all colors, upgrades, AND photons in exchanging for lights. Proceed? (You can turn this off in Settings)")){
                prestigeLights()
              }
              return
            }
            prestigeLights()
          }
        },
        style: canPrestigeLights() ? this.buttonStyles.lights.enabled : this.buttonStyles.lights.disabled,
        disabled: !canPrestigeLights()
      }
    }
  }
})
