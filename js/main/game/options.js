new Vue ({
  el: "#tabOptions",
  data: {
    player: player,
    save: {
      text: "Save",
      onclick: function(){
        save();
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
      text: "RESET",
      seen: true,
      onclick: function(){
        if(prompt("Enter 'RESET' in ALL CAPS to reset the game. THIS ACTION CANNOT BE UNDONE.") === 'RESET'){
          resetGame()
        }
      }
    }
  },
  computed:{
    confirmation: function(){
      return{
        lights:{
          text: "Lights: " + (player.options.confirmation.lights ? "On" : "Off"),
          onclick: function(){
            player.options.confirmation.lights = !player.options.confirmation.lights
          }
        }
      }
    },
    time: function(){
      return {
        total: secondToTime(player.stats.playTime),
        currentLight: secondToTime(player.stats.prestigeTime.lights.current),
        fastestLight: secondToTime(player.stats.prestigeTime.lights.fastest)
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
  else if(game.saveTimer < 8.5){
    $("#gameSavedLoadedPopup").text("")
  }
  else{
    $("#gameSavedLoadedPopup").text("Game saved!")
  }
}

setInterval(saveTimerCountdown, 50)

function ImportAndSaveFixer(property, save){
  if(save[property] === undefined){
    player[property] = JSON.parse(JSON.stringify(defaultSave[property]))
    return
  }
  player[property] = save[property]
  return
}

function importSaveVersionChecker(save){
  if(save.version == "0.0.0"){
    resetGame()
    alert("Your save is incompatible with this version of game and therefore has been reset.")
    return false
  }
  // else if(save.version[3] != 0){
  //   alert("You cannot use test saves in live version.")
  //   return false
  // }
  return true
}

function importSave(string){
   let save = JSON.parse(string)
   if(importSaveVersionChecker(save)){
     // importToGame(save)
     for (let prop in defaultSave){
       ImportAndSaveFixer(prop, save)
     }
     updateSaveVersion()
     updateAutobuyers()
     for (let prop in defaultGame){
       game.selectedTab[prop] = defaultGame.selectedTab[prop]
     }
     return true
   }
   return false
}

function loadSave(string){
  if(IsJsonString(string) && string != null){
    if(importSave(string)){
      resetTabs()
      return true
    }
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
  resetTabs()
}

function resetTabs(){
  switchMainTab("tabMain")
  switchLightsTab("lightsTabPhotons")
}
