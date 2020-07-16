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
      return Math.floor(player.colors.red.amount)
    },
    green: function(){
      return Math.floor(player.colors.green.amount)
    },
    blue: function(){
      return Math.floor(player.colors.blue.amount)
    },
    lights: function(){
      return Math.floor(player.lights.amount)
    },
    lightsPrestige: function(){
      return {
        elementID: "buttonPrestigeLights",
        text: "+" + gainRateLights().lights + " Light" + (gainRateLights().lights != 1 ? "s" : ""),
        onclick: function(){
          if((player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && player.colors.blue.amount >= 255){
            if(player.options.confirmation.lights){
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
