const defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  blue: 0,
  unlocks: {
   green: true,
   blue: false
  }
};
// const notationName = ['Scientific', 'Letters'];
// const notationList = [new ADNotations.ScientificNotation(), new ADNotations.LettersNotation()];

var player = defaultSave;

new Vue ({
  el: "#tab1",
  data: {
    player: player,
  },
  computed:{
    bars: function(){
      return [
        {money: "red", max: 255, color: "red",seen: true},
        {money: "green", max: 255, color: "green", seen: this.player.unlocks.green},
        {money: "blue", max: 255, color: "blue", seen: this.player.unlocks.blue}
      ]
    },
    seenBars: function(){
      var array = []
      for (i=0; i<this.bars.length; i++){
        if (this.bars[i].seen){
          array.push(this.bars[i])
        }
      }
      return array
    }
  }
})
