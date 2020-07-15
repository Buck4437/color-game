Vue.component('player-rgb',{
  template: `
    <div>
      <color-bar :bar="barParsed" v-if="seen"></color-bar>
      <button-custom :name="autoParsed"></button-custom>
      <button-custom :name="addsubParsed"></button-custom>
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
    add: function(){
      this.addsubParsed.onclick()
    }
  },
  computed:{
    barParsed: function(){
      return {
        text: capitalizeFirstLetter(this.global.name) + ":&nbsp" + player.colors[this.global.name].amount + "/" + this.bar.max,
        width: 100 * player.colors[this.global.name].amount / this.bar.max,
        color: this.global.color,
        isHidden: this.bar.isHidden,
      }
    },
    autoParsed: function(){
      let color = this.global.name
      return {
        text: "Auto: " + (player.colors[color].auto ? "On" : "Off"),
        isHidden: player.colors[color].upgrades.auto == 0,
        onclick: function(){
          setAutoBuyColor(color, !player.colors[color].auto, 1000/Math.max(1,player.colors[color].upgrades.auto||1))
        }
      }
    },
    addsubParsed: function(){
      let color = this.global.name
      let unlocks = this.addsub.unlocks||function(){}
      return {
        text: this.addsub.text,
        isHidden: this.addsub.isHidden,
        onclick: function(){
          gainColor(color)
          unlocks()
        },
        style: canGainColor()[color] ? this.addsub.style.enabled : this.addsub.style.disabled,
        disabled: !canGainColor()[color],
        elementID: this.addsub.elementID
      }
    },
    seen: function(){
      return !this.barParsed.isHidden
    }
  }
})
