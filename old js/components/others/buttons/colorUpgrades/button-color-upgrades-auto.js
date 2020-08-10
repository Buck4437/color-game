Vue.component('button-color-upgrades-auto',{
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
    colorIndex: function(){
      return this.name.color == "blue" ? 2 : this.name.color == "green" ? 1 : 0
    },
    seen: function(){
      return !this.name.isHidden
    },
    descriptions: function(){
      let noun = capitalizeFirstLetter(this.name.color)
      return {
        locked: "Unlock " + noun + " Autoclicker<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].auto[1]),
        unlocked: "Upgrade " + noun + " Autoclicker <br><br>" + player.colors[this.name.color].upgrades.auto*(containBit(player.lights.upgradesBit, 4*16**this.colorIndex) ? 2 : 1) + " CPS => " + (player.colors[this.name.color].upgrades.auto + 1)*(containBit(player.lights.upgradesBit, 4*16**this.colorIndex) ? 2 : 1) + " CPS<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1]),
        maxed: "Upgrade " + noun + " Autoclicker<br><br>"+ player.colors[this.name.color].upgrades.auto*(containBit(player.lights.upgradesBit, 4*16**this.colorIndex) ? 2 : 1) + " CPS (Maxed!)",
        unlocked20: "Upgrade " + noun + " Autoclicker <br><br>20 CPS => 20 CPS<br><br>Cost: " + costStringify(game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1]),
        maxed20: "Upgrade " + noun + " Autoclicker<br><br>20 CPS (Maxed!)"
      }
    },
    currentText: function(){
      if (containBit(player.lights.upgradesBit, 16384)){
        return game.upgradesCost[this.name.color].auto[player.colors[this.name.color].upgrades.auto + 1] === undefined ? "maxed20" : player.colors[this.name.color].upgrades.auto == 0 ? "locked" : "unlocked20"
      }
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
