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
      unlocks: Function
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
        name: capitalizeFirstLetter(this.global.name),
        counter: "player." + this.global.name,
        max: this.bar.max,
        color: this.global.color,
        isHidden: this.bar.isHidden,
        intRounding: "floor"
      }
    },
    autoParsed: function(){
      let color = this.global.name
      return {
        text: "Auto: " + (player[color + "Auto"] ? "On" : "Off"),
        isHidden: player.upgrades[color].auto == 0,
        onclick: function(){
          setAutoBuyColor(color, !player[color + "Auto"], 1000/Math.max(1,player.upgrades[color].auto||1))
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
        disabled: !canGainColor()[color]
      }
    },
    seen: function(){
      return !this.barParsed.isHidden
    }
  }
})
