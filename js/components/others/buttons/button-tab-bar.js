Vue.component('button-tab-bar',{
  // template: '<div :id="containerID" style="display: inline-block"><button @click="onclick()" v-if="seen" :style="name.style" :disabled="disabled" :id="name.elementID" v-html="displayedText"></button></div>',
 template: '<button @click="onclick()" v-if="seen" :style="name.style" :disabled="disabled" :id="name.elementID" v-html="displayedText"></button>',
  props:{
    name:{
      elementID: String,
      text: [Object, String, Number],
      isHidden: Boolean,
      style: Object,
      selectedTabVariable: String,
      correspondingTabID: String,
      listOfTabs: Array
    }
  },
  computed:{
    seen: function(){
      return !this.name.isHidden
    },
    displayedText: function(){
      return typeof this.name.text === "object" ? this.name.text.data[this.name.text.currentText]||"Text not found in text properties" : this.name.text||"Text is missing"
    },
    disabled: function(){
      return game.selectedTab[this.name.selectedTabVariable] == this.name.correspondingTabID
    },
    // containerID: function(){
    //   return this.name.elementID + "-container"
    // }
  },
  methods:{
    onclick: function(){
      buttonTabBarSwitchTab(this.name.selectedTabVariable, this.name.correspondingTabID, this.name.listOfTabs)
    }
  }
})

function buttonTabBarSwitchTab(variable, tabID, tabs){
  $("#gameSavedLoadedPopup").text("")
  game.selectedTab[variable] = tabID
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
  $("#"+ game.selectedTab[variable]).css("display", "block")
}
