export default class {
  constructor (canv,stats){
    this.canv = canv;
    this.stats = stats;
    this.P=[stats.w/2,3*stats.h/4]; //Position
    
    this.ctx = canv0.getContext('2d',{alpha:true})
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = devicePixelRatio;
    
    this.main();
  }
  main(){
    this.drawShip()
    // requestAnimationFrame(this.main)
  }
  drawShip(){
    this.ctx.beginPath();
    const p= this.P;
    
    this.maker([
      ['M', [p[0]+25*devicePixelRatio,p[1]] ],
      ['C', [...p,25*devicePixelRatio,0,Math.PI] ],
      ['C', [...p,10*devicePixelRatio,0,Math.PI] ],
      ['L', [p[0]-2*devicePixelRatio,p[1]] ],
      ['L',[p[0]-2*devicePixelRatio,p[1]-35*devicePixelRatio]],
      ['L',[p[0]-14*devicePixelRatio,p[1]-28*devicePixelRatio]],
      ['L',[p[0]-14*devicePixelRatio,p[1]]],
      ['L',[p[0]+14*devicePixelRatio,p[1]]],
      ['L',[p[0]+14*devicePixelRatio,p[1]-28*devicePixelRatio]], 
      ['L',[p[0]+2*devicePixelRatio,p[1]-35*devicePixelRatio]],
      ['L', [p[0]+2*devicePixelRatio,p[1]] ],
      ['L',[p[0]+25*devicePixelRatio,p[1]]]
    ])
    this.ctx.stroke();
  }
  // rander(){}
  maker(r){
     const a = {
      M :(x)=>{this.ctx.moveTo(...x)},
      L :(x)=>{this.ctx.lineTo(...x)},
      C :(x)=>{this.ctx.arc(...x)},
      A :(x)=>{this.ctx.arcTo(...x)}
    }
    for(let i of r)a[i[0]](i[1]);
  }
}