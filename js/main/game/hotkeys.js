window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return
  }
  switch (event.key) {
    case "l":
    case "L":
      if((player.colors.red.amount >= 255 && player.colors.green.amount >= 255) && player.colors.blue.amount >= 255){
        if(player.settings.confirmation.lights){
          if(confirm("This will reset all colors, upgrades, AND photons in exchanging for lights. Proceed? (You can turn this off in Settings)")){
            prestigeLights()
          }
          return
        }
        prestigeLights()
      }
      break;
    default:
      return;
  }
  event.preventDefault();
}, true);
