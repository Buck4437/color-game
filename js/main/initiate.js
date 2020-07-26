load()
// autobuyers are updated in importSave()
setInterval(function(){generateThings(50)}, 50)
setInterval(updateGameData, 50)

function updateInputBlanks(){
  $(function (){
    $("#lightsAutoInput").val(player.lights.auto.value)  
  })
}
