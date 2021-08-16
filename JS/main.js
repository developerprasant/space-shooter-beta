"use strict";
import Game from './game.js';

const P = { //Page-layers
  load : document.getElementById('page-loading'),
  menu : document.getElementById('page-menu'),
}
const canv0 = document.getElementById('canv0');
const Sts = {} //width height pointer etc

window.onresize=()=>sizeRander();
function sizeRander(x=devicePixelRatio){
  Sts.w= innerWidth*x; //width×resolution
  Sts.h= innerHeight*x; //height×rsolution
  
  canv0.height = Sts.h;
  canv0.width = Sts.w;
}

document.body.onload = function(){
  sizeRander();
  show(P.menu);
  hide(P.load);
}

function show(el){el.removeAttribute('hidden');}
function hide(el){el.setAttribute('hidden',true);}
function load(time=0){
  [()=>show(P.load),()=>hide(P.load)][!time+0]()
  if(typeof time =='number'&&time>0)
    setTimeout(()=>hide(P.load),time);
}

{//Menu
  const M = {
    play : document.getElementById('pm-play'),
  }
  
  function Play(){
    load(500);
    show(canv0);
    hide(P.menu);
    new Game(canv0,Sts);
  }
  M.play.addEventListener('click',Play);
}

{//Service worker
  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
      navigator.serviceWorker
      .register('./sw.js')
      .catch(e=>console.log(e.message));
    })
  }
}
