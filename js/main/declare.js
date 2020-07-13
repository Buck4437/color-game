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
        unlocked: false,
        auto: 0,
        multi: 0
      }
    },
    blue:{
      isUnlocked: false,
      amount: 0,
      auto: false,
      upgrades:{
        unlocked: false,
        auto: 0,
        multi: 0
      }
    }
  },
  lights:{
    isUnlocked: false,
    amount: 0,
    photons:{
      red: {
        amount: 0,
        auto: false
      },
      green: {
        amount: 0,
        auto: false
      },
      blue: {
        amount: 0,
        auto: false
      }
    },
    upgrades: {
      isUnlocked: false
    }
  },
  version: [0,1,2,1]
  // [major, minor, bugfix, internal]
}
var player = JSON.parse(JSON.stringify(defaultSave));

var game = {
  autobuyersInterval:{
    red: null,
    green: null,
    blue: null
  },
  upgradesCost:{
    red:{
      auto: [null, {red: 10}, {red: 100}, {green: 3}, {green: 5}, {green: 15}],
      multi: [null, {red: 10}, {red: 40}, {green: 25}],
    },
    green:{
      auto: [null, {green: 10}, {green: 100}, {blue: 20}, {blue: 50}],
      multi:[null, {green: 50}, {blue: 5}, {blue: 50}],
    },
    blue:{
      auto: [null, {blue: 10}, {blue: 100}],
      multi:[null, {blue: 50}],
    }
  },
  selectedTab:{
    mainTab: "tabMain",
    lights: "lightsTabRGBLights"
  },
  saveTimer: 10
}
