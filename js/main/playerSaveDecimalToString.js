function formatDecimal(data){
  return notationList[player.notations].format(data, 2, 1);
}

function playerDecimalToString(){
  playerFormatted.money = formatDecimal(player.money);
}

setInterval(playerDecimalToString, 50);
