let p,q,r=[];

let angleA;
let angleB;

setup=_=>{createCanvas(windowWidth,windowHeight,WEBGL);
	w = windowWidth;
  p = createVector(); 
  angleMode(DEGREES);          
  angleA = random(360);
  angleB = random(-180, 180);
          
}
draw=_=>{
  background(0);
  stroke(w);
  let nsA = 250;
  let nsB = 350;
  let angleA = noise(p.x/nsA,p.y/nsA,frameCount/nsA)*360;
  let angleB = noise(p.y/nsB,p.z/nsB,frameCount/nsB)*360-180;
  q=createVector(
    cos(angleA) * cos(angleB),
    sin(angleA) * cos(angleB),
    sin(angleB),
  ).mult(3);
  p.add(q);
  r.push(p.copy());
  noFill();
  beginShape();
  for(let i = r.length-1; i >0; i--){
    vertex(r[i].x,r[i].y,r[i].z);
  }
  endShape();
  
  if(r.length > 1000){
    r.shift();
  }
  point(p.x,p.y,p.z);
  
  let v = createVector(
    p.x + cos(angleA) * cos(angleB) * 100,
    p.y + sin(angleA) * cos(angleB) * 100,
    p.z + sin(angleB) * 100
  );

  camera(v.x,v.y,v.z,p.x,p.y,p.z,0,1,0);  
  
}