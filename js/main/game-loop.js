function gameLoop(that){
  let s = (Date.now() - that.player.lastUpdateTick)/1000

  //resolve this mess soon
  for (let i=0; i <= that.player.color.length-1; i++){
    let color = that.player.color[i]
    if (color.timer > 0){
      that.player.color[i].timer -= s
      if (color.timer <= 0){
        that.player.color[i].amount += formula.gain.color[i]().amount
        that.player.color[i].timer = 0
      }
    }
  }



  that.player.lastUpdateTick = Date.now()
}
