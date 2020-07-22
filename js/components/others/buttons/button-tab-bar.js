Vue.component('button-tab-bar',{
  template: '<button @click="onclick()" v-if="seen" :style="name.style" v-html="displayedText"></button>',
  props:{
    name:{
      id: Number,
      text: String,
      isHidden: Boolean,
      style: Object,
      currentTab: String,
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
    }
  },
  methods:{
    onclick: function(){
      if(!this.disabled){
        buttonTabBarSwitchTab(this.name.selectedTabVariable, this.name.correspondingTabID, this.name.listOfTabs)
      }
    }
  }
})

function buttonTabBarSwitchTab(variable, tabID, tabs){
  game.selectedTab[variable] = tabID
  for(let i=0;i<tabs.length;i++){
    $("#"+tabs[i]).css("display", "none")
  }
  $("#"+ game.selectedTab[variable]).css("display", "block")
}















let buttonTabBarComponent = {
  template: '<button @click="select" :style="style">{{tab.name}}</button>',
  props:{
    tab:{
      name: String,
      tabID: String,
      styles: Object
    },
    selectedTab: String
  },
  methods: {
    select(){
      this.$emit("select", this.tab.name, this.tab.tabID)
    }
  },
  computed:{
    selected: function(){
      return this.tab.tabID == this.selectedTab
    },
    style: function(){
      if(this.selected){
        return this.tab.styles.selected
      }
      return this.tab.styles.deselected
    }
  }
}

Vue.component('button-tab-bar-3',{
  template: `
    <div>
      <tab-bar-buttons v-for="tab in visibleTabs" :tab="tab" :selectedTab="selectedTab" :key="tab.name" @select="selectTab"></tab-bar-buttons>
    </div>
  `,
  components: {
    'tab-bar-buttons': buttonTabBarComponent
  },
  props:{
    tabs: Array,
    selectedTab: String
  },
  computed:{
    visibleTabs: function(){
      let array = []
      for(let tab of this.tabs){
        if(!tab.isHidden){
          array.push(tab)
        }
      }
      return array
    }
  },
  methods:{
    selectTab: function(tab, tabID){
      this.$emit("select-tab", tab, tabID)
    }
  }
})
