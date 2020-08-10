var app = new Vue({
  el: "#app",
  data:{
    constant: constant,
    player: player
  },
  methods:{
    collapse(i){
      let els = document.getElementsByClassName(i)
      for (let el of els){
        if (el.style.maxHeight){
          el.style.maxHeight = null;
        } else {
          el.style.maxHeight = el.scrollHeight + "px";
        }
      }
    },
    generateColor(i){
      let c = this.player.color[i]
      if (i != 0){
        let p = this.player.color[i-1]
        if (p.amount < c.cost) return
        this.player.color[i-1].amount -= c.cost
      }
      this.player.color[i].amount ++
    },
    format(num, dp, sci, full){
      return format(num, dp, sci, full)
    },
    gameLoop(){
      gameLoop(this)
    }
  },
  mounted(){
    setInterval(this.gameLoop, 50)
  }
})
