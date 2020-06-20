function addRed(){
  player.red ++
  if (player.red > 255){
    player.red = 255
  }
}

// var redBarAdd = new Vue({
//   el:"#red-bar-add",
//   data: {
//     player: player
//   },
//   methods: {
//     add: function(){
//       addRed()
//     }
//   }
// })
//
// var redBarAuto = new Vue({
//   el:"#red-bar-auto",
//   data: {
//     player: player
//   },
//   computed: {
//     enabled: function(){
//       if(player.redAuto){
//         return "On"
//       }
//       return "Off"
//     }
//   },
//   methods: {
//     toggle: function(){
//       player.redAuto = !player.redAuto
//       if(player.redAuto){
//         var interval = setInterval(addRed, 1000)
//       }else{
//         clearInterval(interval)
//       }
//     }
//   }
// })
//
//
// var redBarAmount = new Vue({
//   el:"#red-bar-amount",
//   data:{
//     player: player
//   },
//   computed:{
//     styleRedBarAmount: function(){
//       return {width: player.red/255*96 + "%"}
//     }
//   }
// })



//
// Vue.component('color-bar', {
//   data: function () {
//     return {
//       player: player
//     }
//   },
//   template: `
//              <div class="colorBar">
//                <div class="colorBarAmount">AAA</div>
//              </div>
//             `
// })
//
// new Vue({el: "#demo"})
