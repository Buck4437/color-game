new Vue ({
  el: "#tabSettings",
  data: {
    player: player,
    options: [
      {
        text: "Save",
        click: function(){
          save()
        }
      },
      {
        text: "Load",
        click: function(){
          load()
        }
      },
      {
        text: "Export",
        click: function(){
          exportSave()
        }
      },
      {
        text: "Import",
        click: function(){
          importPrompt()
        }
      },
      {
        text: "RESET",
        style: {
          borderColor: "red",
          color: "red"
        },
        click: function (){
          resetPrompt()
        }
      }
    ],
  },
  computed:{
    confirmations: function(){
      return [
        {
          text: "Lights: " + (player.settings.confirmation.lights ? "On" : "Off"),
          style: {
            borderColor: "#0f0",
            color: "#0a0"
          },
          click: function(){
            player.settings.confirmation.lights = !player.settings.confirmation.lights
          }
        }
      ]
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

function load(){
  let localSave = localStorage.getItem("player")
  if(isValidSave(localSave)){
    importSave(localSave)
    save()
    alert("Game loaded!")
    return
  }
  alert("Game failed to load")
}

function importPrompt(){
  try{
    let importedSave = window.atob(prompt("Enter your save:"))
    if(isValidSave(importedSave)){
      importSave(importedSave)
      alert("Game loaded!")
      return
    }
    alert("Invalid save!")
  } catch(error){
    alert("Invalid save!") //not base64
  }
}

function isValidSave(str){
  try {
      JSON.parse(str);
      if(string == null){
        return false;
      }
  } catch (e) {
      return false;
  }
  return true
}

function importSave(string){
  let save = JSON.parse(string)
  if(isBannedSaveVersion(save)){
    let fixedSave = saveFixer(save)
    for (let prop in fixedSave){
      player[prop] = JSON.parse(JSON.stringify(fixedSave[prop]))
    }
    updateAutobuyers()
    for (let prop in defaultGame){
      game.selectedTab[prop] = defaultGame.selectedTab[prop]
    }
    resetTabs()
    updateInputBlanks()
  }
}

function isBannedSaveVersion(save){
  if (save === null){
    return true
  }
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

function resetPrompt(){
  if(prompt("Enter 'RESET' in ALL CAPS to reset the game. THIS ACTION CANNOT BE UNDONE.") === 'RESET'){
    reset()
  }
}

function reset(){
  importSave(JSON.stringify(defaultSave))
  save()
  resetTabs()
}

function resetTabs(){
  switchMainTab("tabMain")
  switchLightsTab("lightsTabPhotons")
}
