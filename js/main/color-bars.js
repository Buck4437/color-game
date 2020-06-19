Vue.component('color-bar', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

var redBarAmount = new Vue({
  el:"#red-bar-amount",
  data:{
    player: player,
  },
  computed:{
    styleRedBarAmount: function(){
      return {width: player.red/2.55 + "%"}
    }
  }
})
