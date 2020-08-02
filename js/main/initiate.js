let localSave = localStorage.getItem("player")
if(isValidSave(localSave)){
  importSave(localSave)
}
// autobuyers are updated in importSave()
setInterval(function(){generateThings(50)}, 50)
setInterval(updateGameData, 50)

function updateInputBlanks(){
  $(function (){
    $("#lightsAutoInput").val(player.lights.auto.value)
  })
}
