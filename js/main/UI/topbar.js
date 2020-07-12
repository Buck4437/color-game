new Vue ({
  el: "#top-bar",
  data: {
    selectedTab: game.selectedTab
  },
  computed:{
    buttons: function(){
      let selectedTab = this.selectedTab
      let style = {
        selected:{
          color: "black",
          border: "4px solid white",
          backgroundColor: "#eeeeee",
          cursor: "default"
        },
        deselected:{
          color: "white",
          border: "4px solid #888888",
          backgroundColor: "black",
          cursor: "pointer"
        }
      }
      return [
        topBarButtonsProperties(0, "Colors", false, "tabMain", style, selectedTab),
        topBarButtonsProperties(1, "Upgrades", false, "tabUpgrades", style, selectedTab),
        topBarButtonsProperties(3, "Lights", !player.lights.isUnlocked, "tabLights", style, selectedTab),
        topBarButtonsProperties(2, "Options", false, "tabOptions", style, selectedTab)
      ]
    }
  }
})

function topBarButtonsProperties(id, text, isHidden, tabID, style, selectedTab){
  return{
    id: id,
    tab:{
      text: text,
      isHidden: isHidden,
      onclick: function(){
        switchTab(tabID)
        $("#gameSavedLoadedPopup").text("")
      },
      style: selectedTab.tab == tabID ? style.selected : style.deselected,
      disabled: selectedTab.tab == tabID
    }
  }
}

function updateTab(){
  let tabs = ["tabMain", "tabUpgrades", "tabLights", "tabOptions"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.tab).css("display", "block")
}

function switchTab(tab){
    game.selectedTab.tab = tab
    updateTab()
}
