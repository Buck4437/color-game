function generateThings(ticks){
  let seconds = ticks/1000
  if(player.lights.photons.isInitiated){
    player.lights.photons.amount += gainRateLights().photons * seconds
  }
}
