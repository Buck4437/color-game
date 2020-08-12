const formula = {
  gain:{
    color: [
      function (){
        let amount = 1
        amount *= (player.color[1].amount + 1)
        amount *= (player.color[2].amount + 1)
        amount *= player.colorUpg.hasOwnProperty("12") ? formula.cUpg["12"](player.colorUpg["12"]).effect : 1

        let speed = 1
        speed *= player.colorUpg.hasOwnProperty("11") ? formula.cUpg["11"](player.colorUpg["11"]).effect : 1

        return {amount, speed}
      },
      function (){
        let amount = 1
        amount *= (player.color[2].amount + 1)
        amount *= player.colorUpg.hasOwnProperty("22") ? formula.cUpg["22"](player.colorUpg["22"]).effect : 1

        let speed = 1
        speed *= player.colorUpg.hasOwnProperty("21") ? formula.cUpg["11"](player.colorUpg["21"]).effect : 1

        return {amount, speed}
      },
      function (){
        let amount = 1
        amount *= player.colorUpg.hasOwnProperty("32") ? formula.cUpg["32"](player.colorUpg["32"]).effect : 1

        let speed = 1
        speed *= player.colorUpg.hasOwnProperty("31") ? formula.cUpg["11"](player.colorUpg["31"]).effect : 1

        return {amount, speed}
      }
    ]
  },
  cUpg: {
    11(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["11"].baseCost * (colorUpgInfo["11"].scaling ** tier)

      let time = 0.8**tier
      return {cost, time}
    },
    12(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["12"].baseCost * (colorUpgInfo["12"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    13(){
      let cost = colorUpgInfo["13"].cost

      let efficiency = 25
      return {cost, efficiency}
    },
    21(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["21"].baseCost * (colorUpgInfo["21"].scaling ** tier)

      let time = 0.8**tier
      return {cost, time}
    },
    22(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["22"].baseCost * (colorUpgInfo["22"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    23(){
      let cost = colorUpgInfo["23"].cost

      let efficiency = 25
      return {cost, efficiency}
    },
    31(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["31"].baseCost * (colorUpgInfo["31"].scaling ** tier)

      let time = 0.8**tier
      return {cost, time}
    },
    32(tier){
      if (tier === undefined) tier = 0
      let cost = colorUpgInfo["32"].baseCost * (colorUpgInfo["32"].scaling ** tier)

      let effect = 1.5**tier
      return {cost, effect}
    },
    33(){
      let cost = colorUpgInfo["33"].cost

      let efficiency = 25
      return {cost, efficiency}
    }
  }
}
