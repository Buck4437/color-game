Vue.component('player-rgb',{
  template: `
    <div>
      <color-bar :bar="barParsed" v-if="!this.bar.isHidden"></color-bar>
      <button v-if="autoParsed.isSeen" @click="toggleAuto" :style="autoParsed.style">Auto: {{autoParsed.text}}</button>
      <button v-if="!addsub.isHidden" :style="add.style" @click="add.onclick" :id="addsub.elementID">{{addsub.text}}</button>
    </div>
  `,
  props:{
    global:{
      name: String,
      color: String
    },
    bar:{
      max: Number,
      isHidden: Boolean
    },
    addsub:{
      text: String,
      isHidden: Boolean,
      style: Object,
      unlocks: Function,
      elementID: String
    }
  },
  methods:{
    toggleAuto: function(){
      player.colors[this.global.color].auto = !player.colors[this.global.color].auto
      updateAutobuyersColors()
    }
  },
  computed:{
    barParsed: function(){
      return {
        text: capitalizeFirstLetter(this.global.name) + ":&nbsp" + numToSci(player.colors[this.global.name].amount, 0, 2) + "/" + this.bar.max,
        width: 100 * Math.floor(player.colors[this.global.name].amount) / this.bar.max,
        color: this.global.color,
        isHidden: this.bar.isHidden,
      }
    },
    autoParsed: function(){
      let color = this.global.name
      let styles = function(color){
          return {
            color: color,
            border: "4px solid " + color,
            cursor: "pointer"
          }
      }
      return {
        text: player.colors[color].auto ? "On" : "Off",
        isSeen: player.colors[color].upgrades.auto != 0,
        style: player.colors[color].auto ? styles("#0f0") : styles("#c00")
      }
    },
    add: function(){
      let color = this.global.name
      let unlocks = this.addsub.unlocks||function(){}
      return {
        style: canGainColor()[color] ? this.addsub.style.enabled : this.addsub.style.disabled,
        onclick: function(){
          if(canGainColor()[color]){
            gainColor(color)
            unlocks()
          }
        }
      }
    }
  }
})
