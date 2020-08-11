const gainAmount = {
  color: [
    function (){
      let amount = 1
      amount *= (player.color[1].amount + 1)
      amount *= (player.color[2].amount + 1)
      amount *= player.cUpg.hasOwnProperty("12") ? formula.cUpg13(player.cUpg["12"]) : 1
      return amount
    },
    function (){
      let amount = 1
      amount *= (player.color[2].amount + 1)
      amount *= player.cUpg.hasOwnProperty("22") ? formula.cUpg23(player.cUpg["22"]) : 1
      return amount
    },
    function (){
      let amount = 1
      amount *= player.cUpg.hasOwnProperty("32") ? formula.cUpg33(player.cUpg["32"]) : 1
      return amount
    }
  ]
}

const gainSpeed = {
  color:[
    function (){
      let speed = 1
      speed *= player.cUpg.hasOwnProperty("11") ? formula.cUpg13(player.cUpg["11"]) : 1
      return speed
    },
    function (){
      let speed = 1
      speed *= player.cUpg.hasOwnProperty("21") ? formula.cUpg23(player.cUpg["21"]) : 1
      return speed
    },
    function (){
      let speed = 1
      speed *= player.cUpg.hasOwnProperty("31") ? formula.cUpg33(player.cUpg["31"]) : 1
      return speed
    }
  ]
}

const formula = {
  cUpg11(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg12(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
  cUpg13(){

  },
  cUpg21(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg22(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
  cUpg23(){

  },
  cUpg31(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg32(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
  cUpg33(){

  },
}
