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
        topBarButtonsProperties(0, "Primary", "tab1", style, selectedTab),
        topBarButtonsProperties(1, "Upgrades", "tab2", style, selectedTab),
        topBarButtonsProperties(2, "Settings", "tab3", style, selectedTab)
      ]
    }
  }
})

function topBarButtonsProperties(id, text, tabID, style, selectedTab){
  return{
    id: id,
    tab:{
      text: text,
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
  let tabs = ["tab1", "tab2","tab3"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.tab).css("display", "block")
}

function switchTab(tab){
    game.selectedTab.tab = tab
    updateTab()
}
