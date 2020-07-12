new Vue ({
  el: "#top-bar",
  data: {
    selectedTab: game.selectedTab
  },
  computed:{
    buttons: function(){
      let location = "mainTab"
      let tabs = ["tabMain", "tabUpgrades", "tabLights", "tabOptions"]
      return [
        topBarButtonsProperties(0, "topBarButtonsMain", "Colors", false, location, "tabMain", tabs),
        topBarButtonsProperties(1, "topBarButtonsUpgrades", "Upgrades", false, location, "tabUpgrades", tabs),
        topBarButtonsProperties(2, "topBarButtonsOptions", "Options", false, location, "tabOptions", tabs),
        topBarButtonsProperties(3, "topBarButtonsLights", "Lights", !player.lights.isUnlocked, location, "tabLights", tabs)
      ]
    }
  }
})

function updateMainTab(){
  let tabs = ["tabMain", "tabUpgrades", "tabLights", "tabOptions"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.mainTab).css("display", "block")
}

function switchMainTab(tab){
    game.selectedTab.mainTab= tab
    updateMainTab()
}
