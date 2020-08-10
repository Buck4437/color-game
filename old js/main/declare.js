const defaultSave = {
  colors:{
    red:{
      isUnlocked: true,
      amount: 0,
      auto: false,
      upgrades:{
        isUnlocked: true,
        auto: 0,
        multi: 0
      }
    },
    green:{
      isUnlocked: true,
      amount: 0,
      auto: false,
      upgrades:{
        isUnlocked: false,
        auto: 0,
        multi: 0
      }
    },
    blue:{
      isUnlocked: false,
      amount: 0,
      auto: false,
      upgrades:{
        isUnlocked: false,
        auto: 0,
        multi: 0
      }
    }
  },
  lights:{
    isUnlocked: false,
    amount: 0,
    auto:{
      isEnabled: false,
      mode: 0,
      value: 1e10
    },
    photons:{
      amount: 0,
      auto: false,
      multi: 0,
      percentage:{
        red: 0,
        green: 0,
        blue: 0
      }
    },
    upgradesBit: 0
  },
  settings:{
    confirmation:{
      lights: true
    }
  },
  stats:{
    playTime: 0,
    prestigeTime:{
      lights:{
        current: 0,
        fastest: 1e10
      }
    }
  },
  version: [1,0,1,0]
  // [major, minor, bugfix, internal]
}
var player = JSON.parse(JSON.stringify(defaultSave));

const defaultGame = {
  autobuyersInterval:{
    red: null,
    green: null,
    blue: null,
    lights: null
  },
  upgradesCost:{
    red:{
      auto: [null, {red: 5}, {red: 50}, {green: 3}, {green: 5}, {green: 15}],
      multi: [null, {red: 10}, {red: 50}, {green: 25}],
    },
    green:{
      auto: [null, {green: 5}, {green: 100}, {blue: 5}, {blue: 20}, {blue: 50}],
      multi:[null, {green: 50}, {blue: 5}, {blue: 50}],
    },
    blue:{
      auto: [null, {blue: 5}, {blue: 100}],
      multi:[null, {blue: 50}],
    }
  },
  lightsUpgrades:{},
  selectedTab:{
    mainTab: "tabMain",
    lights: "lightsTabPhotons"
  },
  saveTimer: 10
}

var game = JSON.parse(JSON.stringify(defaultGame));
