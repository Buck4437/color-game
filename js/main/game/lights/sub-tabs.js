new Vue ({
  el: "#lights-top-bar",
  data: {
    selectedTab: game.selectedTab
  },
  computed:{
    buttons: function(){
      let location = "lights"
      let tabs = ["lightsTabRGBLights", "lightsTabUpgrades"]
      let style = {
        backgroundColor: "black",
        color: "#0c0",
        padding: "10px 28px",
        border: "3px solid #0c0",
        margin: "5px",
        fontSize: "15px",
        width: "170px"
      }
      return [
        topBarButtonsProperties(0, null, "Generators", false, location, tabs[0], tabs, style),
        topBarButtonsProperties(1, null, "Light Upgrades", false, location, tabs[1], tabs, style),
      ]
    }
  }
})
