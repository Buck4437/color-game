function save(){
  localStorage.setItem('player', JSON.stringify(player))
}

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

function loadSave(){
  let string = localStorage.getItem("player")
  if(IsJsonString(string) && string != null){
    importSave(string)
    switchTab("tab1")
    return
  }
}

new Vue ({
  el: "#tab3",
  data: {
    save: {
      text: "Save",
      seen: true,
      onclick: function(){
        save();
      }
    },
    load: {
      text: "Load",
      seen: true,
      onclick: function(){
        loadSave()
      }
    }
  }
})
