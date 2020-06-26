function save(){
  localStorage.setItem('player', JSON.stringify(player))
  saveTimer = 10
}

function saveTimerCountdown(){
  saveTimer -= 0.05
  if (saveTimer < 0){
    save()
  }
}

setInterval(saveTimerCountdown, 50)

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
   updateAutobuyers()
}

function loadSave(){
  let string = localStorage.getItem("player")
  if(IsJsonString(string) && string != null){
    importSave(string)
    switchTab("tab1")
    return true
  }
  return false
}

function resetGame(){
  importSave(JSON.stringify(defaultSave))
  save()
  switchTab("tab1")
}

new Vue ({
  el: "#tab3",
  data: {
    save: {
      text: "Save",
      seen: true,
      onclick: function(){
        save();
        alert("Game saved!")
      }
    },
    load: {
      text: "Load",
      seen: true,
      onclick: function(){
        if(loadSave()){
          alert("Game loaded!")
          return
        }
        alert("Game failed to load!")
      }
    },
    reset: {
      text: "HARD RESET",
      seen: true,
      onclick: function(){
        if(prompt("Enter 'RESET' in ALL CAPS to reset the game. THIS ACTION CANNOT BE UNDONE.") === 'RESET'){
          resetGame()
        }
      }
    }
  }
})
