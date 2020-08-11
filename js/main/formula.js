const gainAmount = {
  color: [
    function (){
      let amount = 1
      amount *= (player.color[1].amount + 1)
      amount *= (player.color[2].amount + 1)
      amount *= player.cUpg.hasOwnProperty("13") ? formula.cUpg13(player.cUpg["13"]) : 1
      return amount
    },
    function (){
      let amount = 1
      amount *= (player.color[2].amount + 1)
      amount *= player.cUpg.hasOwnProperty("23") ? formula.cUpg23(player.cUpg["23"]) : 1
      return amount
    },
    function (){
      let amount = 1
      amount *= player.cUpg.hasOwnProperty("33") ? formula.cUpg33(player.cUpg["33"]) : 1
      return amount
    }
  ]
}

const formula = {
  cUpg12(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg13(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
  cUpg22(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg23(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
  cUpg32(tier){
    if (tier === undefined) tier = 0
    return 0.8**tier
  },
  cUpg33(tier){
    if (tier === undefined) tier = 0
    return 1.5**tier
  },
}
