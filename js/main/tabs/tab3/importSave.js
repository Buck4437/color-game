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
