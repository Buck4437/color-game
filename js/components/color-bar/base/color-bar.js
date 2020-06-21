/*
 format:
    <color-bar :bar="bar" :key="bar.money"></color-bar>
    data:{
      bar = {
        money: "currencyName",
        max: BarMaxValue,
        color: "barColor",
        seen: true/false
      }
    }
*/


let colorBarAmountComponent = {
  template: "#color-bar-amount-template",
  data: function (){
    return {
      player: player
    }
  },
  props:{
    bar:{
      money:{
        type: String,
        required: true
      },
      max:{
        type: Number,
        required: true
      },
      color:{
        type: String,
        required: false,
        default: "grey"
      },
      counter:{
        type: [String, Boolean],
        required: false,
        default: false
      }
    },
  },
  computed:{
    style: function(){
      return {
        backgroundColor: this.bar.color,
        width: player[this.bar.money]/this.bar.max*96 + "%"
      }
    },
    text: function(){
      return capatalizeFirstLetter(this.bar.money) + ":&nbsp" + player[this.bar.money] + "/" + this.bar.max
    }
  }
}

Vue.component('color-bar', {
  template: "#color-bar-template",
  components:{
    'color-bar-amount': colorBarAmountComponent
  },
  data: function (){
    return {
    }
  },
  props:{
    bar:{
      type: Object,
      required: true
    }
  }
})
