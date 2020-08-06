Vue.component('button-color-upgrades-multi',{
  template: '<button @click="onclick()" v-if="seen" :style="style" v-html="displayedText"></button>',
  props:{
    name:{
      color: String,
      isHidden: Boolean,
      onclick: Function,
      styles: {
        max: Object,
        canBuy: Object,
        cannotBuy: Object
      }
    }
  },
  methods:{
    onclick: function(){
      if(!this.name.disabled){
        this.name.onclick()
      }
    }
  },
  computed:{
    seen: function(){
      return !this.name.isHidden
    },
    descriptions: function(){
      let noun = capitalizeFirstLetter(this.name.color)
      return "x2 multiplier to " + noun + " gain<br><br>Currently: x" + 2**player.colors[this.name.color].upgrades.multi + (game.upgradesCost[this.name.color].multi[player.colors[this.name.color].upgrades.multi + 1] === undefined ? " (Maxed!)" : ("<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].multi[player.colors[this.name.color].upgrades.multi + 1])))
    },
    displayedText: function(){
      return this.descriptions
    },
    style: function(){
      return game.upgradesCost[this.name.color].multi[player.colors[this.name.color].upgrades.multi + 1] === undefined ? this.name.styles.max
               : canbuyColorUpgrades(this.name.color, "multi", player.colors[this.name.color].upgrades.multi + 1) ? this.name.styles.canBuy
               : this.name.styles.cannotBuy
    }
  }
})
