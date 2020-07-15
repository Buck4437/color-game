Vue.component('photons-rgb',{
  template: `
    <div>
      <color-bar :bar="barParsed"></color-bar>
      <button-custom :name="buttons.minus10"></button-custom>
      <button-custom :name="buttons.minus1"></button-custom>
      <span style="display: inline-block; width: 40px; text-align: center; margin-right: 10px">{{text}}</span>
      <button-custom :name="buttons.add1"></button-custom>
      <button-custom :name="buttons.add10"></button-custom>
      <span style="display: inline-block; margin-right: 10px" v-html="effect"></span>
    </div>
  `,
  props:{
    colorName: String
  },
  computed:{
    barParsed: function(){
      return{
        text: capitalizeFirstLetter(this.colorName) + "&nbspPhotons:&nbsp" + Math.floor(player.lights.photons.percentage[this.colorName]/100*player.lights.photons.amount),
        width: player.lights.photons.percentage[this.colorName],
        color: this.colorName
      }
    },
    text: function(){
      return player.lights.photons.percentage[this.colorName] + "%"
    },
    buttons: function(){
      let name = this.colorName
      let addSubButtonStyles = {
        enabled:{
          color: "white",
          border: "4px solid white",
          borderRadius: "0px",
          cursor: "pointer",
          width: "40px"
        },
        disabled:{
          color: "grey",
          border: "4px solid #888888",
          cursor: "default",
          borderRadius: "0px",
          width: "40px"
        }
      }
      function canAdd(num){
        if(player.lights.photons.percentage[name] < 0 || player.lights.photons.percentage[name] > 100){
          player.lights.photons.percentage[name] = 0
          //prevent softlock due to bugs
        }
        if (player.lights.photons.percentage[name] + num > 100 || player.lights.photons.percentage[name] + num < 0){
          return false
        }
        let colors = ["red", "green", "blue"]
        let sum = num
        for (let color of colors){
          sum += player.lights.photons.percentage[color]
        }
        if (sum <= 100 && sum >= 0){
          return true
        }
        return false
      }
      function tryAdd(num){
        if (canAdd(num)){
          player.lights.photons.percentage[name] += num
        }
      }
      function prop(text, num){
        return{
          text: text,
          onclick: function(){
            tryAdd(num)
          },
          style: canAdd(num) ? addSubButtonStyles.enabled : addSubButtonStyles.disabled ,
          disabled: !canAdd(num)
        }
      }
      return {
        minus10: prop("<<", -10),
        minus1: prop("<", -1),
        add1: prop(">", 1),
        add10: prop(">>", 10)
      }
    },
    effect: function(){
      return "=> x<span style='font-size: 25px; color: " + this.colorName +  "'> " + photonEffect()[this.colorName] + "</span> multiplier to "  + capitalizeFirstLetter(this.colorName) + "</span> gain"
    }
  }
})
