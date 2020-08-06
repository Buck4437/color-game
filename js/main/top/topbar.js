new Vue ({
  el: "#top-bar",
  data:{
    game: game
  },
  computed:{
    tabs: function(){
      let styles = color => ({
        selected:{
          backgroundColor: color,
          color: "black",
          border: "3px solid " + color
        },
        deselected: {
          backgroundColor: "black",
          color: color,
          border: "3px solid " + color
        }
      })
      return [
        {
          name: "Colors",
          tabID: "tabMain",
          styles: styles("white")
        },
        {
          name: "Upgrades",
          tabID: "tabUpgrades",
          styles: styles("white")
        },
        {
          name: "Lights",
          tabID: "tabLights",
          styles: styles("#0f0"),
          isHidden: !player.lights.isUnlocked
        },
        {
          name: "Settings",
          tabID: "tabSettings",
          styles: styles("grey")
        }
      ]
    },
    selectedTab: function(){
      return game.selectedTab.mainTab
    }
  },
  methods:{
    selectTab: function(tab, id){
      let tabIDs = []
      for (let tab of this.tabs){
        tabIDs.push(tab.tabID)
      }
      for(let i=0; i < tabIDs.length; i++){
        $("#"+tabIDs[i]).css("display", "none")
      }
      $("#"+ id).css("display", "block")
      game.selectedTab.mainTab = id
    }
  }
})

function updateMainTab(){
  let tabs = ["tabMain", "tabUpgrades",  "tabSettings", "tabLights"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.mainTab).css("display", "block")
}

function switchMainTab(tab){
    game.selectedTab.mainTab= tab
    updateMainTab()
}
