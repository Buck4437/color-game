const defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  greenAuto: false,
  blue: 0,
  blueAuto: false,
  unlocks: {
   redAuto: false,
   green: false,
   greenAuto: false,
   blue: false,
   blueAuto: false
  }
};

var player = {}
Object.assign(player, defaultSave)

var autobuyersInterval = {
  red: null,
  green: null,
  blue: null
}
var selectedTab = {
  tab: "tab1"
}

var saveTimer = 10
