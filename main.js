
const {
    PI
} = Math;
const canvas = document.getElementById('canvas')
if (!canvas.getContext) {
    alert("your browser do not support canvas !")
}
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext('2d');


ctx.lineWidth = 5;

ctx.beginPath();
ctx.strokeStyle = 'white';
ctx.arc(canvas.width/2, canvas.height/2, 100, -(PI/2), 2 * PI);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'hotpink';
ctx.arc(canvas.width/2, canvas.height/2, 15, -(PI/2), 2 * PI)
ctx.lineTo(canvas.width/2, canvas.height/2 - 102)
ctx.stroke()

canvas.addEventListener('mousedown', e => {
 // console.log(e)
  ctx.beginPath()
  ctx.moveTo(canvas.width/2, canvas.height/2)
  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  setTimeout(()=>{
    //console.log('hii')
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 8;
    ctx.beginPath()
    ctx.moveTo(canvas.width/2, canvas.height/2)
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 5;
    ctx.beginPath();
ctx.strokeStyle = 'white';
ctx.arc(canvas.width/2, canvas.height/2, 100, -(PI/2), 2 * PI);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'hotpink';
ctx.arc(canvas.width/2, canvas.height/2, 15, -(PI/2), 2 * PI)
ctx.lineTo(canvas.width/2, canvas.height/2 - 102)
ctx.stroke()

  }, 100)
  
})




/*Sound Effects */
canvas.addEventListener('click', (e)=>{
  id('click-sound').play();
  /*
  setTimeout(() => {
   // ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath()
    ctx.moveTo(canvas.width/2, canvas.height/2)
    ctx.lineTo(40, 100);
    ctx.stroke()
  }, 1000);
  */
  
})


/**Assets */
function id(el) {
  return document.getElementById(el);
}