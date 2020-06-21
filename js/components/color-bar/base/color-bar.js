/*
 format:
    <color-bar :bar="bar" :key="bar.money"></color-bar>
    data:{
      bar = {
        counter: "variable name/ object property, must be global"/ number (cannot be changed)
        name: "Displayed Name",
        max: BarMaxValue,
        color: "barColor",
        seen: true/false/ var name (default: true)
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
      id:{
        type: Number
      },
      name:{
        type: String,
        required: false
      },
      counter:{
        type: [String, Number],
        required: false,
        default: false
      },
      max:{
        type: Number,
        required: true
      },
      color:{
        type: String,
        required: false,
        default: "grey"
      }
    },
  },
  computed:{
    count: function(){
        if(Number.isFinite(this.bar.counter)){
          return this.bar.counter
        }
        let array = this.bar.counter.split('.')
        let target = window[array[0]]
        for (let i=1;i<array.length;i++){
          target = target[array[i]]
        }
        return target
    },
    style: function(){
      return {
        backgroundColor: this.bar.color,
        width: this.count/this.bar.max*96 + "%"
      }
    },
    text: function(){
      if(this.bar.name === undefined){
        return this.count + "/" + this.bar.max
      }
      return this.bar.name + ":&nbsp" + this.count + "/" + this.bar.max
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
