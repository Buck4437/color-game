// function importToGame(save){
//   //automatically fix if undefined
//   player.colors = save.colors || defaultSave.colors
//   updateSaveVersion()
// }

function updateSave(){
  let versionNo = player.version
  let deltaVal = 0
  for (let i = 0; i <= 3; i++){
    deltaVal += versionNo[i]*100**(3-i)
  }
  if(deltaVal <= 10201){

  }
  if(deltaVal == 10201){
    //placeholder
  }
  if(versionNo != 10201){
    player.version = [0,1,2,1]
  }
  return
}
