new Vue ({
  el: "#top-bar",
  data: {
    selectedTab: game.selectedTab
  },
  computed:{
    buttons: function(){
      let buttonDeselectedStyle = {
        color: "white",
        border: "4px solid #888888",
        backgroundColor: "black",
        cursor: "pointer"
      }
      let buttonSelectedStyle = {
        color: "black",
        border: "4px solid white",
        backgroundColor: "#eeeeee",
        cursor: "default"
      }
      return [
        {
          id: 0,
          tab:{
            text: "Primary",
            onclick: function(){
              switchTab("tab1")
            },
            style: this.selectedTab.tab=="tab1" ? buttonSelectedStyle : buttonDeselectedStyle,
            disabled: this.selectedTab.tab=="tab1"
          }
        },
        {
          id: 1,
          tab:{
            text: "Settings",
            onclick: function(){
              switchTab("tab2")
            },
            style: this.selectedTab.tab=="tab2" ? buttonSelectedStyle : buttonDeselectedStyle,
            disabled: this.selectedTab.tab=="tab2"
          }
        },
        {
          id: 2,
          tab:{
            text: "Settings",
            onclick: function(){
              switchTab("tab3")
            },
            style: this.selectedTab.tab=="tab3" ? buttonSelectedStyle : buttonDeselectedStyle,
            disabled: this.selectedTab.tab=="tab3"
          }
        }
      ]
    }
  }
})

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
