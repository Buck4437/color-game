const defaultSave = {
  red: 0,
  redAuto: false,
  green: 0,
  greenAuto: false,
  blue: 0,
  blueAuto: false,
  unlocks: {
   // redAuto: false,
   // green: true, (unlock at beginning)
   greenAuto: false,
   blue: false,
   blueAuto: false
 },
 upgrades:{
   redAuto: 0,
   redMulti: 0,
 }
};

var player = {}
Object.assign(player, defaultSave)

const upgradesCost =  {
  redAuto: [
    null,
    {red: 10},
    {green: 10000},
    {blue: 100000}
  ],
  redMulti:[
    null,
    {red: 10},
    {red: 40},
    {red: 160}
  ],
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
