let colorBarAmountComponent = {
  template: '<div class="color-bar-amount" :style="style"><span v-html="text" :style="bar.textStyle"></span></div>',
  data: function (){
    return {
      player: player
    }
  },
  props:{
    bar:{
      id: Number,
      text: String,
      width: Number,
      color: String,
      textStyle: Object
    },
  },
  computed:{
    style: function(){
      let width = ""
      if (isNumber(this.bar.width)){
        width = Math.min(100, Math.max(0, this.bar.width))*0.96 + "%"
      }
      else{
        width = "96%"
      }
      return {
        backgroundColor: this.bar.color,
        width: width
      }
    },
    text: function(){
      if(this.bar.text !== undefined){
        return this.bar.text
      }
    }
  }
}

Vue.component('color-bar', {
  template: `
    <div class="color-bar">
      <color-bar-amount :bar="bar"></color-bar-amount>
    </div>
  `,
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
