document.addEventListener('DOMContentLoaded',function(){
  var t=document.getElementById('navToggle'),n=document.getElementById('mainNav');
  if(t&&n){t.addEventListener('click',function(){n.classList.toggle('open');});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');});});}
  document.querySelectorAll('[data-calc]').forEach(function(form){
    form.addEventListener('submit',function(e){e.preventDefault();var d=Object.fromEntries(new FormData(form));var out=form.querySelector('.result');if(out)out.innerHTML=window.calcResult(form.dataset.calc,d);});
  });
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click',function(){var id=btn.getAttribute('data-copy');var el=document.getElementById(id);if(!el)return;navigator.clipboard.writeText(el.innerText).then(function(){var o=btn.textContent;btn.textContent='Copied!';setTimeout(function(){btn.textContent=o;},1500);});});
  });
});
window.calcResult=function(type,d){
  if(type==='utilization'){var bal=parseFloat(d.balance)||0,lim=parseFloat(d.limit)||0;if(lim<=0)return 'Enter a valid limit.';var u=(bal/lim*100);return 'Utilization: '+u.toFixed(1)+'% '+(u<=30?'— Good range. Aim under 10% for best scores.':u<=50?'— Moderate. Paying down helps.':'— High. This is likely hurting your score.');}
  if(type==='payoff'){var bal=parseFloat(d.balance)||0,rate=parseFloat(d.rate)||0,pmt=parseFloat(d.payment)||0;if(pmt<=0||bal<=0)return 'Enter balance and payment.';rate=rate/100/12;var n=0,b=bal;while(b>0&&n<600){b=b*(1+rate)-pmt;n++;}if(b>0)return 'Payment too low to pay off. Increase payment or lower rate.';return 'Estimated payoff: '+n+' months ('+Math.floor(n/12)+' yr '+ (n%12)+' mo).';}
  if(type==='score'){var util=parseFloat(d.util)||0,hist=parseFloat(d.hist)||0,inq=parseInt(d.inq,10)||0;var s=300;s+=Math.max(0,100-util)*2.2;s+=Math.min(hist,30)*4;s-=Math.min(inq,6)*12;s=Math.max(300,Math.min(850,Math.round(s)));return 'Estimated score range: '+s+' ± 40. This is a rough educational model, not a bureau score.';}
  return 'Unknown calculator.';
};
