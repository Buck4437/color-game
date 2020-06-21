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
    money:{
      type: String,
      required: true
    },
    max:{
      type: Number,
      required: true
    },
    barColor:{
      type: String,
      required: false,
      default: "grey"
    }
  },
  computed:{
    style: function(){
      return {
        backgroundColor: this.barColor,
        width: player[this.money]/this.max*96 + "%"
      }
    },
    text: function(){
      return capatalizeFirstLetter(this.money) + ":&nbsp" + player[this.money] + "/" + this.max
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
