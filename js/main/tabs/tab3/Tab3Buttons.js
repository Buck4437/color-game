function importSave(string){
   let save = JSON.parse(string)
   function ImportAndSaveFixerUnit(property){
     if(player[property] === undefined){
       player[proprety] = defaultSave[property]
       return
     }
     player[property] = save[property]
   }
   let array = Object.keys(defaultSave)
   for (let i=0;i<array.length;i++){
     ImportAndSaveFixerUnit(array[i])
   }
}

new Vue ({
  el: "#tab3",
  data: {
    save: {
      text: "Save",
      seen: true,
      onclick: function(){
        localStorage.setItem('player', JSON.stringify(player));
      }
    },
    load: {
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
  }
})
