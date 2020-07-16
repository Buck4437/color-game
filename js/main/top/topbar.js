new Vue ({
  el: "#top-bar",
  data: {
    selectedTab: game.selectedTab,
    tabs:[
      {
        id: "tabMain",
        name: "Colors",
        color: "white"
      },
      {
        id: "tabUpgrades",
        name: "Upgrades",
        color: "white"
      },
      {
        id: "tabLights",
        name: "Lights",
        color: "#0f0"
      },
      {
        id: "tabOptions",
        name: "Options",
        color: "grey"
      }
    ]
  },
  computed:{
    buttons: function(){
      let tabID = ["tabMain", "tabUpgrades", "tabLights", "tabOptions"]
      let location = "mainTab"
      function style(input, color){
        return (game.selectedTab.mainTab != input ?
          {
            backgroundColor: "black",
            color: color,
            border: "3px solid " + color
          }:
          {
            backgroundColor: color,
            color: "black",
            border: "3px solid " + color
          }
        )
      }
      let array = []
      for (tab of this.tabs){
        array.push(topBarButtonsProperties(tab.id, "topBarButtons" + tab.id, tab.name, false, location, tab.id, tabID, style(tab.id, tab.color)),)
      }
      return array
    }
  }
})

function updateMainTab(){
  let tabs = ["tabMain", "tabUpgrades",  "tabOptions", "tabLights"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.mainTab).css("display", "block")
}

function switchMainTab(tab){
    game.selectedTab.mainTab= tab
    updateMainTab()
}
