new Vue ({
  el: "#lights-top-bar",
  data:{
    game: game
  },
  computed:{
    tabs: function(){
      let styles = color => ({
        selected:{
          backgroundColor: color,
          color: "black",
          padding: "10px 28px",
          border: "3px solid " + color,
          margin: "5px",
          fontSize: "15px",
          width: "170px"
        },
        deselected: {
          backgroundColor: "black",
          color: color,
          padding: "10px 28px",
          border: "3px solid " + color,
          margin: "5px",
          fontSize: "15px",
          width: "170px"
        }
      })
      return [
        {
          name: "Photons",
          tabID: "lightsTabPhotons",
          styles: styles("#0c0")
        },
        {
          name: "Light Upgrades",
          tabID: "lightsTabUpgrades",
          styles: styles("#0c0")
        }
      ]
    },
    selectedTab: function(){
      return game.selectedTab.lights
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
      game.selectedTab.lights = id
    }
  }
})

function switchLightsTab(tab){
    game.selectedTab.lights = tab
    updateTabLights()
}

function updateTabLights(){
  let tabs = ["lightsTabPhotons", "lightsTabUpgrades"]
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
    $("#"+ game.selectedTab.lights).css("display", "block")
}
