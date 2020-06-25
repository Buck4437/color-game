/*
 format:
    <color-bar :bar="bar" :key="bar.money"></color-bar>
    data:{
      bar = {
        counter: "variable name/ object property, must be global"/ number (cannot be changed)
        name: "Displayed Name",
        max: BarMaxValue,
        color: "barColor",
        display: "fraction"/"percentage"
        intRounding: "ceiling"/"floor"/"round"/"none" (fraction only)
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
      id: Number,
      name: String,
      counter: [String, Number],
      max:{
        type: Number,
        required: true
      },
      color: String,
      display: String,
      intRounding:{
        type: String,
        required: true,
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
