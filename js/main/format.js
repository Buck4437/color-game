// default: dp at 0, scidp at 2, showFullIfSmallerThanThis at 1000

function format(num, dp, scidp, showFullIfSmallerThanThis){
  //ask stackoverflow
  function toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
  }
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
    let mantissa = toFixedTrunc((num / (10**power)), scidp)
    return mantissa + "e" + power
  }
}
