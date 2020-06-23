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
        intRounding: "ceiling"/"floor"/"round"/"none" (default: round, fraction only)
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
      },
      intRounding:{
        type: String,
        required: false,
        default: "round",
        validator: function (value) {
          return ['ceiling', 'floor', 'round','none'].indexOf(value) !== -1
        }
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
      if(this.bar.display == "percentage"){
        if(this.bar.name === undefined){
          return Math.round(this.count/this.bar.max*10000)/100 + "%"
        }
        return this.bar.name + ":&nbsp" + Math.round(this.count/this.bar.max*10000)/100 + "%"
      }
      let num = 0
      switch(this.bar.intRounding){
        case "ceiling":
          num = Math.ceil(this.count)
          break;
        case "floor":
          num = Math.floor(this.count)
          break;
        case "none":
          num = this.count
          break;
        default:
          num = Math.round(this.count)
      }
      if(this.bar.name === undefined){
        return num + "/" + this.bar.max
      }
      return this.bar.name + ":&nbsp" + num + "/" + this.bar.max
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
