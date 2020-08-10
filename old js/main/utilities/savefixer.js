function saveFixer(save){
  let newSave = JSON.parse(JSON.stringify(defaultSave))
  if (save === undefined || save === null){
    return newSave
  }

  // migrate data to new save if the data is not undefined
  if (save.colors !== undefined){
    let colors = ["red", "green", "blue"]
    for (let color of colors){
      if (save.colors[color] !== undefined){
        let colorProps = ["isUnlocked", "amount", "auto"]
        for (let colorProp of colorProps){
          if (save.colors[color][colorProp] !== undefined){
            newSave.colors[color][colorProp] = save.colors[color][colorProp]
          }
        }
        if (save.colors[color].upgrades !== undefined){
          let upgradeProps = ["isUnlocked", "auto", "multi"]
          for (let upgradeProp of upgradeProps){
            if (save.colors[color].upgrades[upgradeProp] !== undefined){
              newSave.colors[color].upgrades[upgradeProp] = save.colors[color].upgrades[upgradeProp]
            }
          }
        }
      }
    }
  }
  if (save.lights !== undefined){
    let lightProps = ["isUnlocked", "amount", "upgradesBit"]
    for (let lightProp of lightProps){
      if (save.lights[lightProp] !== undefined){
        newSave.lights[lightProp] = save.lights[lightProp]
      }
    }
    if (save.lights.auto !== undefined){
      let autoProps = ["isEnabled", "mode", "value"]
      for (let autoProp of autoProps){
        if (save.lights.auto[autoProp] !== undefined){
          newSave.lights.auto[autoProp] = save.lights.auto[autoProp]
        }
      }
    }
    if (save.lights.photons !== undefined){
      let photonProps = ["amount", "auto", "multi"]
      for (let photonProp of photonProps){
        if (save.lights.photons[photonProp] !== undefined){
          newSave.lights.photons[photonProp] = save.lights.photons[photonProp]
        }
      }
      if (save.lights.photons.percentage !== undefined){
        let percentageProps = ["red", "green", "blue"]
        for (let percentageProp of percentageProps){
          if (save.lights.photons.percentage[percentageProp] !== undefined){
            newSave.lights.photons.percentage[percentageProp] = save.lights.photons.percentage[percentageProp]
          }
        }
      }
    }
  }
  if (save.settings !== undefined){
    if (save.settings.confirmation !== undefined){
      if (save.settings.confirmation.lights !== undefined){
        newSave.settings.confirmation.lights = save.settings.confirmation.lights
      }
    }
  }
  if (save.stats !== undefined){
    if (save.stats.playTime !== undefined){
      newSave.stats.playTime = save.stats.playTime
    }
    if (save.stats.prestigeTime !== undefined){
      if (save.stats.prestigeTime.lights !== undefined){
        let timeTypes = ["current", "fastest"]
        for (let timeType of timeTypes){
          if (save.stats.prestigeTime.lights[timeType] !== undefined){
            newSave.stats.prestigeTime.lights[timeType] = save.stats.prestigeTime.lights[timeType]
          }
        }
      }
    }
  }

  // changing older version of save into new version
  if (save.versionNo !== undefined){
    for (let i = 0; i <= 3; i++){
      if (save.versionNo === undefined){
        // cannot be updated as the versionNo format is wrong
        return newSave
      }
    }
    let versionDelta = 0 // easier to handle
    for (let i = 0; i <= 3; i++){
      versionDelta += versionNo[i]*100**(3-i)
    }
    if(versionDelta <= 1000001){
      // placeholder, no change required
    }
  }
  return newSave
}
