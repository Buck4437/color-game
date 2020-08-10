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

Vue.component('button-tab-bar',{
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
