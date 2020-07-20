// function importToGame(save){
//   //automatically fix if undefined
//   player.colors = save.colors || defaultSave.colors
//   updateSaveVersion()
// }

function updateSave(){
  let versionNo = player.version
  if(versionNo == [0,1,2,1]){
    //placeholder
  }
  if(versionNo != [0,1,2,1]){
    player.version = [0,1,2,1]
  }
  return
}
