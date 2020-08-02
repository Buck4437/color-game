new Vue({
  el: "#lightsTabUpgrades",
  data:{
    player: player,
    game: game
  },
  computed:{
    rows: function(){
      let rowItems = function(i){
        let array = []
        for (let upgrade in game.lightUpgrades["row" + i]){
          array.push(game.lightUpgrades["row" + i][upgrade])
        }
        return array
      }
      let rows = []
      for (let i=1;i<= Object.keys(game.lightUpgrades).length;i++){
        rows.push({
          id: i,
          items: rowItems(i)
        })
      }
      return rows
    }
  }
})
