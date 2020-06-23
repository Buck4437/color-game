/*
 format:
    <color-bar :bar="bar" :key="bar.money"></color-bar>
    data:{
      bar = {
        counter: "variable name/ object property, must be global"/ number (cannot be changed)
        name: "Displayed Name",
        max: BarMaxValue,
        color: "barColor",
        display: "fraction"/"percentage" (default: fraction)
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
      },
      display:{
        type: String,
        required: false,
        default: "fraction"
      }
    },
  },
  computed:{
    count: function(){
        if(Number.isFinite(this.bar.counter)){
          return this.bar.counter
        }
        return locateVar(this.bar.counter)
    },
    style: function(){
      let width = ""
      if(this.count <= this.bar.max){
        width = this.count/this.bar.max*96 + "%"
      }
      else {
        width = "96%"
      }
      return {
        backgroundColor: this.bar.color,
        width: width
      }
    },
    text: function(){
      if(this.bar.name === undefined){
        if(this.bar.display == "percentage"){
          return Math.round(this.count/this.bar.max*10000)/100 + "%"
        }
        return this.count + "/" + this.bar.max
      }
      if(this.bar.display == "percentage"){
        return this.bar.name + ":&nbsp" + Math.round(this.count/this.bar.max*10000)/100 + "%"
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
