var defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  greenAuto: false,
  blue: 0,
  blueAuto: false,
  unlocks: {
    greenUpgrades: false,
    greenAuto: false,
    blue: false,
    blueUpgrades: false,
    blueAuto: false
  },
  upgrades:{
    red:{
      auto: 0,
      multi: 0
    },
    green:{
      auto: 0,
      multi: 0,
      qol: []
    },
    blue:{
      auto: 0,
      multi: 0
    }
  },
  version: "0.0.0.i1"
};

var player = {}
Object.assign(player, defaultSave)

const upgradesCost =  {
  red:{
    auto: [
      null,
      {red: 10},
      {red: 100},
      {green: 10000000}
    ],
    multi:[
      null,
      {red: 10},
      {red: 40},
      {green: 1000000}
    ],
  }
}

var autobuyersInterval = {
  red: null,
  green: null,
  blue: null
}
var selectedTab = {
  tab: "tab1"
}

var saveTimer = 10
