Vue.component('color-bar', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

var redBarAdd = new Vue({
  el:"#red-bar-add",
  data: {
    player: player
  },
  methods: {
    add: function(){
      player.red ++
      if (player.red > 255){
        player.red = 255
      }
    }
  }
})


var redBarAmount = new Vue({
  el:"#red-bar-amount",
  data:{
    player: player
  },
  computed:{
    styleRedBarAmount: function(){
      return {width: player.red/255*96 + "%"}
    }
  }
})
