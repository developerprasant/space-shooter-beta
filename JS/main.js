const pLoad = document.getElementsByClassName('page-loading')[0];
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

document.body.onload = function(){
  sizeRander();
  setTimeout(()=>setLoader(false),1000);
}

function setLoader(bool){
  if(bool)pLoad.removeAttribute('hidden');
  else pLoad.setAttribute('hidden','');
}

//Service worker
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker
      .register('./sw.js')
      .catch(e=>console.log(e.message));
  })
}