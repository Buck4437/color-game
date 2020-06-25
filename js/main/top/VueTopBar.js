new Vue ({
  el: "#top-bar",
  data: {
    selectedTab: selectedTab
  },
  methods:{
    select: function(tab){
      selectedTab.tab = tab
      let tabs = ["tab1", "tab2","tab3"]
      for(let i=0;i<tabs.length;i++){
        document.getElementById(tabs[i]).style.display = "none"
      }
        document.getElementById(selectedTab.tab).style.display = "block"
    }
  },
  computed:{
    buttons: function(){
      let select = this.select
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
            seen: true,
            onclick: function(){
              select("tab1")
            },
            style: customTrueFalseOutput(this.selectedTab.tab=="tab1",buttonSelectedStyle,buttonDeselectedStyle),
            disabled: this.selectedTab.tab=="tab1"
          }
        },
        {
          id: 1,
          tab:{
            text: "Upgrades",
            seen: true,
            onclick: function(){
              select("tab2")
            },
            style: customTrueFalseOutput(this.selectedTab.tab=="tab2",buttonSelectedStyle,buttonDeselectedStyle),
            disabled: this.selectedTab.tab=="tab2"
          }
        },
        {
          id: 2,
          tab:{
            text: "Settings",
            seen: true,
            onclick: function(){
              select("tab3")
            },
            style: customTrueFalseOutput(this.selectedTab.tab=="tab3",buttonSelectedStyle,buttonDeselectedStyle),
            disabled: this.selectedTab.tab=="tab3"
          }
        }
      ]
    }
  }
})
