new Vue ({
  el: "#lights-top-bar",
  data: {
    selectedTab: game.selectedTab
  },
  computed:{
    buttons: function(){
      let location = "lights"
      let tabs = ["lightsTabPhotons", "lightsTabUpgrades"]
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
        topBarButtonsProperties(0, null, "Photons", false, location, tabs[0], tabs, style),
        topBarButtonsProperties(1, null, "Light Upgrades", false, location, tabs[1], tabs, style),
      ]
    }
  }
})

function updateLightsTab(){
  let tabs = ["lightsTabPhotons", "lightsTabUpgrades"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.lights).css("display", "block")
}

function switchLightsTab(tab){
    game.selectedTab.lights= tab
    updateLightsTab()
}
