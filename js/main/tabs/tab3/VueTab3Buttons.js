new Vue ({
  el: "#tab3",
  data: {
    player: player
  },
  computed:{
    save: function(){
      return {
        text: "Save",
        seen: true,
        onclick: function(){

        }
      }
    },
    load: function(){
      return {
        text: "Load",
        seen: true,
        onclick: function(){

        }
      }
    },
  }
})
