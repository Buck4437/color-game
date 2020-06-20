Vue.component('color-bar', {
  template: "#color-bar-template",
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

new Vue ({
  el: "#tab1",
  data: {
    plaer: player,
    bars: [
      {money: "red", max: 255, color: "red"},
      {money: "green", max: 255, color: "green"},
      {money: "blue", max: 255, color: "blue"}
    ]
  }
})
