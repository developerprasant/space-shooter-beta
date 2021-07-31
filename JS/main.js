const canv0 = document.getElementById('canv0');
const Sts = {} //width height pointer etc
const GS = {} //GS : Game Status

window.onresize=()=>sizeRander();
function sizeRander(i=Sts.xf||1){
  Sts.xf=i; //resolution
  Sts.w= innerWidth*i; //width×resolution
  Sts.h= innerHeight*i; //height×rsolution
  
  canv0.height = Sts.h;
  canv0.width = Sts.w;
}

window.onload = function(){
  sizeRander()
}



//Service worker
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker
      .register('./JS/sw.js')
      .then(reg=>console.log(reg))
      .catch(e=>console.log(e.message));
  })
}


//Eruda console
// (function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();