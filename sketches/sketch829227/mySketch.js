let nx1;
let ny1;
let nsA;
let nx2;
let ny2;
let nsB;
let points = [];
let images = [];
let emojiArr;
let emojis = [];

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  emojiArr = createEmojiArr();
  
  nx1 = random(1500);
  ny1 = random(1500);
  nsA = random(100, 200);
  nx2 = random(1500);
  ny2 = random(1500);
  nsB = random(100, 200);
}

function draw() {
  background(0,0,10);
  let r = 1000;
  let angleA = map(noise(nx1, ny1, frameCount / nsA), 0, 1, 0, 360)
  let angleB = map(noise(nx2, ny2, frameCount / nsB), 0, 1, -180, 180);
  let step = 150;
  let point = createVector(
    cos(angleA) * cos(angleB),
    sin(angleA) * cos(angleB),
    sin(angleB)
  );
  
  let n = int(map(noise(point.x,point.y,point.z),0,1,0,emojiArr.length));
  let g = createGraphics(160,90);
  g.textSize(80);
  g.textAlign(CENTER,CENTER);
  g.text(emojiArr[n],g.width/2,g.height/2);
  point.mult(r);
  points.push(point);
  images.push(g);

  if (points.length > 300) {
    points.shift();
    images.shift();
  }

  for (let i = points.length - 1; i > 1; i--) {
    let angleE = angleA + i * 5;
    let angleF = angleB - i * 5;
    let s = createVector(
      cos(angleE) * cos(angleF),
      cos(angleE) * sin(angleF),
      sin(angleF)
    ).mult(step);
    //fill(angleE%360,80,100);
    noStroke();

    let p = points[i].copy().add(s);

    push();
    translate(p.x, p.y, p.z);
    rotateX(angleE);
    rotateY(angleF);
    rotateZ(angleE);
    noFill();
    texture(images[i]);
    plane(3 * step, 3 * step * 9 / 16);
    pop();
  //noLoop();
    //print(emojis);
    // beginShape(TRIANGLE_STRIP);
    // let p = points[i].copy().add(s);
    // vertex(
    //   p.x, p.y - step, p.z
    // );
    // vertex(
    //   p.x, p.y + step, p.z
    // );
    // p = points[i + 1].copy().sub(s);
    // vertex(
    //   p.x, p.y + step, p.z
    // );
    // vertex(
    //   p.x, p.y - step, p.z
    // );
    // endShape(CLOSE);
  }
  // for(let i = points.length-1; i >0 ; i--){
  //   let p = points[i];
  //   vertex(
  //     p.x,p.y-2,p.z
  //   );
  // }

  let angleC = frameCount/3;
  let angleD = - frameCount/3;
  let q = createVector(
    cos(angleC) * cos(angleD),
    cos(angleC) * sin(angleD),
    sin(angleD)
    
  ).mult(sin(frameCount));
  camera(point.z,point.x,point.y,point.x, point.y, point.z,  0, 1, 0);


}

function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}