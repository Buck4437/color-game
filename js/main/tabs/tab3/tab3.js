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
  //placeholder
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
     prompt('Save:', window.btoa(JSON.stringify(player)));
  }
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
      onclick: function(){
        save();
        alert("Game saved!")
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
          // if(importedSave === "69"){
          //   alert("nice")
          //   return
          // }
          // placeholder for secrets/ cheats etc
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
