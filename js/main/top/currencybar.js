new Vue({
  el: "#currency-bar",
  data:{
    player: player
  },
  computed:{
    red: function(){
      return Math.floor(player.colors.red.amount)
    },
    green: function(){
      return Math.floor(player.colors.green.amount)
    },
    blue: function(){
      return Math.floor(player.colors.blue.amount)
    },
    lights: function(){
      return Math.floor(player.lights.amount)
    }
  }
})
