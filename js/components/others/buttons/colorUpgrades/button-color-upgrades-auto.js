Vue.component('button-color-upgrades-auto',{
  template: '<button @click="onclick()" v-if="seen" :style="style" :disabled="name.disabled" v-html="displayedText"></button>',
  props:{
    name:{
      color: String,
      isHidden: Boolean,
      onclick: Function,
      styles: {
        max: Object,
        canBuy: Object,
        cannotBuy: Object
      },
      disabled: Boolean
    }
  },
  methods:{
    onclick: function(){
      this.name.onclick()
    }
  },
  computed:{
    seen: function(){
      return !this.name.isHidden
    },
    descriptions: function(){
      let noun = capitalizeFirstLetter(this.name.color)
      return {
        locked: "Unlock " + noun + " Autoclicker<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].auto[1]),
        unlocked: "Upgrade " + noun + " Autoclicker <br><br>" + player.colors[this.name.color].upgrades.auto + " CPS => " + (player.colors[this.name.color].upgrades.auto + 1) + " CPS<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1]),
        maxed: "Upgrade " + noun + " Autoclicker<br><br>"+ player.colors[this.name.color].upgrades.auto + " CPS (Maxed!)"
      }
    },
    currentText: function(){
      return game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1] === undefined ? "maxed" : player.colors[this.name.color].upgrades.auto == 0 ? "locked" : "unlocked"
    },
    displayedText: function(){
      return this.descriptions[this.currentText]
    },
    style: function(){
      return game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1] === undefined ? this.name.styles.max
               : canbuyColorUpgrades(this.name.color, "auto", player.colors[this.name.color].upgrades.auto + 1) ? this.name.styles.canBuy
               : this.name.styles.cannotBuy
    }
  }
})
