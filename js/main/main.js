const defaultSave = {
  red: 0,
};
// const notationName = ['Scientific', 'Letters'];
// const notationList = [new ADNotations.ScientificNotation(), new ADNotations.LettersNotation()];

var player = defaultSave;

var redBarOld = new Vue({
  el:"#red-bar-old",
  data: player
});
