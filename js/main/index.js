var app = new Vue({
  el: "#app",
  data:{
    color,
    colorUpgInfo,
    formula,
    player
  },
  methods:{
    buyUpg(u){
      let cTier = Number(u.charAt(0))-1
      let info = this.colorUpgInfo[u]
      let uTier = this.player.colorUpg[u]||0
      if (uTier >= info.cap) return // max
      let cost = this.formula.cUpg[u](uTier).cost
      if (this.player.color[cTier].amount >= cost){
        this.player.color[cTier].amount -= cost
        this.player.colorUpg[u] = uTier + 1
      }
    },

    //change this reeeeeee
    //check out bootstrap later on
    collapse(s, i){
      let sels = document.getElementsByClassName(s)
      for (let el of sels){
        el.classList.toggle("coll-active");
      }
      let iels = document.getElementsByClassName(i)
      for (let el of iels){
        if (el.style.maxHeight){
          el.style.maxHeight = null;
        } else {
          el.style.maxHeight = el.scrollHeight + "px";
        }
      }
    },
    generateColor(i){
      let c = this.player.color[i]
      if (c.timer > 0) return
      if (i != 0){
        let p = this.player.color[i-1]
        if (p.amount < c.cost) return
        this.player.color[i-1].amount -= c.cost
      }
      this.player.color[i].timer = this.formula.gain.color[i]().speed
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
