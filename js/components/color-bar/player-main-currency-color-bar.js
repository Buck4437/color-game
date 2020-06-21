Vue.component('player-main-currency-color-bar',{
   template: '#player-main-currency-color-bar-template',
   data: function(){
     return {
       player: player
     }
   },
   props: {
     bar: {
       type: Object,
       required: true
     }
   }
})
