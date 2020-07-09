var defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  greenAuto: false,
  blue: 0,
  blueAuto: false,
  unlocks: {
    color:{
      blue: false
    },
    upgrades:{
      green: false,
      blue: false
    }
  },
  upgrades:{
    red:{
      auto: 0,
      multi: 0
    },
    green:{
      auto: 0,
      multi: 0,
    },
    blue:{
      auto: 0,
      multi: 0,
    }
  },
  version: [0,0,0,2]
  // [major, minor, bugfix, internal]
};

var player = {}
Object.assign(player, defaultSave)

const upgradesCost =  {
  red:{
    auto: [
      null,
      {red: 10},
      {red: 100},
      {green: 3},
      {green: 5},
      {green: 15},
      {blue: 10000}
    ],
    multi:[
      null,
      {red: 10},
      {red: 40},
      {green: 25}
    ],
  },
  green:{
    auto: [
      null,
      {green: 10},
      {green: 100},
      {blue: 20},
      {blue: 50}
    ],
    multi:[
      null,
      {green: 50},
      {blue: 5},
      {blue: 50}
    ],
  },
  blue:{
    auto: [
      null,
      {blue: 10},
      {blue: 100}
    ],
    multi:[
      null,
      {blue: 50}
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
