const defaultSave = {
  money: new Decimal(1),
  primary:{
  },
  notations: 0
};
const defaultString = {
  money: "1.0"
}; //used for playerSaveDecimalToString.js
const notationName = ['Scientific', 'Letters'];
const notationList = [new ADNotations.ScientificNotation(), new ADNotations.LettersNotation()];
var player = defaultSave;
var playerFormatted = defaultString;

var moneyDisplay = new Vue({
  el:"#moneyAmount",
  data: playerFormatted
});
