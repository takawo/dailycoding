function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0,0,95);

  let cx = width / 2;
  let cy = height / 2;
  let offset = width / 15;
  let w = width - offset * 2;
  let h = height - offset * 2;

  push();
  translate(cx, cy);
  rectMode(CENTER);
  //rect(0, 0, w, h);

  let p1 = createVector(-w / 2, -h / 2);
  let p2 = createVector(-w/2, 0);
  let p3 = createVector(w / 2, h / 2);
  let p4 = createVector(w/2, 0);

  let points = [p1, p2, p3, p4];

  let c1 = color(360 / 4 * 1, 100, 100);
  let c2 = color(360 / 4 * 2, 100, 100);
  let c3 = color(360 / 4 * 3, 100, 100);
  let c4 = color(360 / 4 * 4, 100, 100);
  let colors = [c1, c2, c3, c4];

  let i = 0;
  let pA1 = points[i];
  let pA2 = points[(i + 1)];
  let pB1 = points[i + 2];
  let pB2 = points[(i + 3)];

  let cA1 = colors[i];
  let cA2 = colors[(i + 1)];
  let cB1 = colors[i + 2];
  let cB2 = colors[(i + 3)];
  
  colorMode(RGB);
  for (let j = 0; j < 1; j += 1 / 400) {
    let pA = p5.Vector.lerp(pA1, pA2, j);
    let cA = lerpColor(cA1, cA2, j);
    let pB = p5.Vector.lerp(pB1, pB2, 1 - j);
    let cB = lerpColor(cB1, cB2, 1 - j);
    for(let k = 0; k < 1; k += 1/200){
      let c = lerpColor(cA,cB,k); 
      let p = p5.Vector.lerp(pA,pB,k);
      let pp = p5.Vector.lerp(pA,pB,constrain(k+1/100,0,1));
      stroke(c);
      strokeWeight(1.5);
      line(p.x,p.y,pp.x,pp.y);
    }
  }
  pop();
  noLoop();
}