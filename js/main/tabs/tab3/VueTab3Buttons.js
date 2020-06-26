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
          localStorage.setItem('player', JSON.stringify(player));
        }
      }
    },
    load: function(){
      return {
        text: "Load",
        seen: true,
        onclick: function(){
          let string = localStorage.getItem("player")
          if(IsJsonString(string)){
            importSave(string)
            switchTab("tab1")
            return
          }
          alert("An error occurred while loading.")
        }
      }
    },
  }
})
