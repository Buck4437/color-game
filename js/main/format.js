// default: dp at 0, scidp at 2, showFullIfSmallerThanThis at 1000

function format(num, dp, scidp, showFullIfSmallerThanThis){
  if(!isFinite(dp)||(dp||1) > 50){
    dp = 0
  }
  if(!isFinite(scidp)||(scidp||1) > 50){
    scidp = 2
  }
  if(num < (showFullIfSmallerThanThis||1000)){
    return num.toFixed(dp)
  }else{
    let power = Math.floor(Math.log10(num))
    let mantissa = (num / (10**power)).toFixed(scidp)
    return mantissa + "e" + power
  }
}
