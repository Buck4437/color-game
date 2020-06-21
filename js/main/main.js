const defaultSave = {
  red: 10,
  redAuto: false,
  green: 0,
  blue: 0,
  unlocks: {
   green: true,
   blue: false
  }
};

var player = defaultSave;

new Vue ({
  el: "#tab1",
  data: {
    player: player,
  },
  computed:{
    bars: function(){
      return [
        {id: 0, name: "Red", counter: "player.red", max: 255, color: "red"},
        {id: 1, name: "Green", counter: "player.green", max: 255, color: "green", seen: this.player.unlocks.green},
        {id: 2, name: "Blue", counter:"player.blue", max: 255, color: "blue", seen: this.player.unlocks.blue}
      ]
    },
    seenBars: function(){
      var array = []
      for (i=0; i<this.bars.length; i++){
        if (this.bars[i].seen === undefined||this.bars[i].seen){
          array.push(this.bars[i])
        }
      }
      return array
    }
  }
})
