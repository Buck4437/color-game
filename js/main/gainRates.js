function gainRateColor(){
  let redRate = 1
  let greenRate = 1
  let blueRate = 1
  let redMultis = [
    player.colors.green.amount+1,
    player.colors.blue.amount+1,
    2**player.colors.red.upgrades.multi,
    photonEffect().red
  ]
  let greenMultis = [
    player.colors.blue.amount+1,
    2**player.colors.green.upgrades.multi,
    photonEffect().green
  ]
  let blueMultis = [
    2**player.colors.blue.upgrades.multi,
    photonEffect().blue
  ]
  for (let redmulti of redMultis){
    redRate *= redmulti
  }
  for (let greenmulti of greenMultis){
    greenRate *= greenmulti
  }
  for (let bluemulti of blueMultis){
    blueRate *= bluemulti
  }
  return {
    red: Math.min(255, redRate),
    green: Math.min(255, greenRate),
    blue: Math.min(255, blueRate)
  }
}

function gainRateLights(){
  return{
    lights: Math.max(Math.floor( (player.colors.blue.amount+1)/16 - 15 ), 1)||1,
    photons: 2 ** player.lights.photons.multi
  }
}
//temp formula

function photonEffect(){
  let photons = player.lights.photons.amount
  return{
    red: Math.round(100 + 100 * (photons * player.lights.photons.percentage.red/100)**0.5) / 100,
    green: Math.round(100 + 100 * (photons * player.lights.photons.percentage.green/100)**0.4) / 100,
    blue: Math.round(100 + 100 * (photons * player.lights.photons.percentage.blue/100)**0.3) / 100,
  }
}
