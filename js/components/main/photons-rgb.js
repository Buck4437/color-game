Vue.component('photons-rgb',{
  template: `
    <div>
      <color-bar :bar="barParsed"></color-bar>
      <button @click="buttons.minus10.onclick()" :style="buttons.minus10.style">\<\<</button>
      <button @click="buttons.minus1.onclick()" :style="buttons.minus1.style">\<</button>
      <span style="display: inline-block; width: 40px; text-align: center; margin-right: 10px">{{text}}</span>
      <button @click="buttons.add1.onclick()" :style="buttons.add1.style">\></button>
      <button @click="buttons.add10.onclick()" :style="buttons.add10.style">\>\></button>
      <span style="display: inline-block; margin-right: 10px" v-html="effect"></span>
    </div>
  `,
  props:{
    colorName: String
  },
  computed:{
    barParsed: function(){
      let photonAmount = Math.floor(player.lights.photons.percentage[this.colorName]/100*Math.floor(player.lights.photons.amount))
      return{
        text: capitalizeFirstLetter(this.colorName) + "&nbspPhotons:&nbsp" + numToSci(photonAmount, 0, 2),
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
      function add(num){
        if (canAdd(num)){
          player.lights.photons.percentage[name] += num
        }
      }
      function prop(text, num){
        return{
          text: text,
          onclick: function(){
            add(num)
          },
          style: canAdd(num) ? addSubButtonStyles.enabled : addSubButtonStyles.disabled
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
      return "=> x<span style='font-size: 25px; color: " + this.colorName +  "'> " + numToSci(photonEffect()[this.colorName], 2, 2) + "</span> multiplier to "  + capitalizeFirstLetter(this.colorName) + "</span> gain"
    }
  }
})
