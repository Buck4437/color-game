function gainRateColor(){
  let rates = [1,1,1]
  let multis = [
    [
      player.colors.green.amount+1,
      player.colors.blue.amount+1,
      2**player.colors.red.upgrades.multi,
      photonEffect().red,
      containBit(player.lights.upgradesBit, 8) ? 8 : 1
    ],
    [
      player.colors.blue.amount+1,
      2**player.colors.green.upgrades.multi,
      photonEffect().green,
      containBit(player.lights.upgradesBit, 256) ? 4 : 1
    ],
    [
      2**player.colors.blue.upgrades.multi,
      photonEffect().blue,
      containBit(player.lights.upgradesBit, 4096) ? 2 : 1
    ]
  ]
  for (let [index, multipliers] of multis.entries()){
    for (let multiplier of multipliers){
      rates[index] *= multiplier
    }
  }
  return {
    red: Math.min(255, rates[0]),
    green: Math.min(255, rates[1]),
    blue: Math.min(255, rates[2])
  }
}

function gainRateLights(){
  let photonRate = 1
  return{
    lights: Math.max(Math.floor((player.colors.blue.amount+1)/16 - 15 ), 1)||1,
    photons: (2 ** player.lights.photons.multi) * photonRate
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

function lightUpgradesEffect(){
  return {
  }
}
