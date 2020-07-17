function generateThings(ticks){
  let seconds = ticks/1000
  if(player.lights.photons.isInitiated){
    player.lights.photons.amount += gainRateLights().photons * seconds
  }
  player.stats.prestigeTime.lights.current += seconds
  player.stats.playTime += seconds
}
