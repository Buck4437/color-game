new Vue ({
  el: "#tab3",
  data: {
    save: {
      text: "Save",
      onclick: function(){
        save();
        $("#gameSavedLoadedPopup").text("Game saved!")
      }
    },
    load: {
      text: "Load",
      onclick: function(){
        if(loadSave(localStorage.getItem("player"))){
          alert("Game loaded!")
          return
        }
        alert("Game failed to load!")
      }
    },
    exportGame: {
      text: "Export",
      onclick: function(){
        exportSave()
      }
    },
    importGame: {
      text: "Import",
      seen: true,
      onclick: function(){
        try{
          let importedSave =  window.atob(prompt("Enter your save:"))
          if(loadSave(importedSave)){
            alert("Game loaded!")
            return
          }
          alert("Invalid save!")
        } catch(error){
          alert("Invalid save!") //not base64
        }
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

function save(){
  localStorage.setItem('player', JSON.stringify(player))
  game.saveTimer = 10
}

function saveTimerCountdown(){
  game.saveTimer -= 0.05
  if (game.saveTimer < 0){
    save()
  }
}

setInterval(saveTimerCountdown, 50)

function ImportAndSaveFixer(property, save){
  if(save[property] === undefined){
    player[property] = defaultSave[property]
    return
  }
  player[property] = save[property]
  return
}

function playerVersionFixer(){
  let versionNo = player.version
  if(versionNo == "0.0.0"){
    resetGame()
    //too old
    alert("Your save is incompatible with this version of game and therefore has been reset.")
  }
  if(versionNo[3] == 1){
    resetGame()
  }
  if(versionNo != [0,1,0,0]){
    versionNo = [0,1,0,0]
  }
  return
}

function importSave(string){
   let save = JSON.parse(string)
   for (let prop in defaultSave){
     ImportAndSaveFixer(prop, save)
   }
   playerVersionFixer()
   updateAutobuyers()
}

function loadSave(string){
  if(IsJsonString(string) && string != null){
    importSave(string)
    switchTab("tab1")
    return true
  }
  return false
}

function exportSave(){
  $("#exportedSave").css("display", "inline")
  $("#exportedSaveField").val(window.btoa(JSON.stringify(player)));
  $("#exportedSaveField").select();
  try {
    document.execCommand('copy');
    $("#exportedSave").css("display", "none")
    alert("Save copied to clipboard!")
  } catch (error) {
     prompt('Exported ave:', window.btoa(JSON.stringify(player)));
  }
}


function resetGame(){
  importSave(JSON.stringify(defaultSave))
  save()
  switchTab("tab1")
}
