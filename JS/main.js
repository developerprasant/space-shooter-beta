
const {
  PI
} = Math;


const canvas = id('canvas');
const overCvs = id('overCvs');


if (!canvas.getContext || !overCvs.getContext) {
  alert("your browser do not support canvas !")
}

canvas.height = overCvs.height = window.innerHeight;
canvas.width = overCvs.width = window.innerWidth;

let ctx = canvas.getContext('2d');
let overCtx = overCvs.getContext('2d');

let mainCentX = canvas.width / 2;
let mainCentY = canvas.height - canvas.height / 6;

let cvsCentX = canvas.width / 2;
let cvsCentY = canvas.height / 2;

//assumptions
let overCount = 0;
let isDragging = false;

//getting elems
let clickSfx = id('click-sound');
let menu = id('menu-icon');
let menuContainer = id('menu-list-container');
// All SetUps
centerSetup()

window.addEventListener('resize', () => {
  console.log("window resized !")
  canvas.height = overCvs.height = window.innerHeight;
  canvas.width = overCvs.width = window.innerWidth;

  mainCentX = canvas.width / 2;
  mainCentY = canvas.height - canvas.height / 6;

  cvsCentX = canvas.width / 2;
  cvsCentY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  centerSetup();

  //overlay canvas resetup
  if (overCount % 2 !== 0) {
    overCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';

    menuContainer.style.right = '50px'
    overCtx.fillRect(0, 0, overCvs.width, overCvs.height)
    overCvs.style.pointerEvents = 'auto'

  }

})
let DownEvent, upEvent, moveEvent;
if ('ontouchstart' in window) {
  DownEvent = 'touchstart';
  upEvent = 'touchend';
  moveEvent = 'touchmove';
} else {
  DownEvent = 'mousedown';
  upEvent = 'mouseup';
  moveEvent = 'mousemove';
}


canvas.addEventListener(DownEvent, e => {
  isDragging = true;
  if ('ontouchstart' in window) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
} else {
    var x = e.clientX;
    var y = e.clientY;
}
  if (y < cvsCentY || y > mainCentY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    centerSetup();
    return;
  }
  
  ctx.moveTo(mainCentX, mainCentY)
  ctx.lineTo(x, y)
  ctx.stroke()
})

canvas.addEventListener(moveEvent, e => {
  if (!isDragging) return;
  if ('ontouchstart' in window) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
} else {
    var x = e.clientX;
    var y = e.clientY;
}
  ctx.clearRect(0, cvsCentY, canvas.width, cvsCentY)
  centerSetup()

  if (y < cvsCentY || y > mainCentY) return;
  
  ctx.moveTo(mainCentX, mainCentY)
  ctx.lineTo(x, y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x, y)
})

canvas.addEventListener(upEvent, e => {
  isDragging = false;
  if ('ontouchstart' in window) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
} else {
    var x = e.clientX;
    var y = e.clientY;
}
  if (y < cvsCentY || y > mainCentY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    centerSetup();
    return;
  }
  clickSfx.play();

  ctx.beginPath()
  ctx.moveTo(mainCentX, mainCentY)
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.clearRect(0, cvsCentY, canvas.width, cvsCentY)
  centerSetup()

})

//Menu setup stuff

//Functions

//Set up menu stuff
function centerSetup() {
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(mainCentX, mainCentY, 100, -(PI / 2), 2 * PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'hotpink';
  ctx.arc(mainCentX, mainCentY, 15, -(PI / 2), 2 * PI)
  ctx.lineTo(mainCentX, mainCentY - 102)
  ctx.stroke()

  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.moveTo(0, mainCentY)
  ctx.lineTo(mainCentX - 15, mainCentY)
  ctx.moveTo(canvas.width, mainCentY)
  ctx.lineTo(mainCentX + 15, mainCentY)
  ctx.stroke()

  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.moveTo(0, cvsCentY)
  ctx.lineTo(canvas.width, cvsCentY)
  // ctx.moveTo(canvas.width, mainCentY)
  // ctx.lineTo( mainCentX + 15, mainCentY)
  ctx.stroke()

}

//Set up menu

menu.addEventListener('click', () => {
  overCount++;

  overCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  if (overCount % 2 !== 0) {

    menuContainer.style.right = '50px'
    overCtx.fillRect(0, 0, overCvs.width, overCvs.height)
    overCvs.style.pointerEvents = 'auto'

  } else {
    menuContainer.style.right = '-100vw'
    overCtx.clearRect(0, 0, overCvs.width, overCvs.height);
    overCvs.style.pointerEvents = 'none';

  }
})
overCvs.addEventListener('click', () => {
  // if(/\d+/.exec(menuContainer.style.right) > 0){
  if (overCount % 2 !== 0) {
    overCount++;
    menuContainer.style.right = '-100vw'
    overCtx.clearRect(0, 0, overCvs.width, overCvs.height);
    overCvs.style.pointerEvents = 'none';
  }
})


/*Sound Effects */
/*
canvas.addEventListener('click', (e) => {
  id('click-sound').play();

})
*/

/**Assets */
function id(el) {
  return document.getElementById(el);
}