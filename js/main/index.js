var app = new Vue({
  el: "#app",
  data:{
    constant: constant,
    player: player
  },
  methods:{
    generateColor(i){
      let c = this.player.color[i]
      if (i != 0){
        let p = this.player.color[i-1]
        if (p.amount < c.cost) return
        this.player.color[i-1].amount -= c.cost
      }
      this.player.color[i].amount ++
    }
  }
})
