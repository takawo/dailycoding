let p, q, r = [];
let s = [];
let font;
let date = new Date();
let date2yb = new Date(date);
date2yb = new Date(date2yb.setYear(date2yb.getFullYear() - 20));

let angleA;
let angleB;

function preload() {
  font = loadFont("Lato-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  w = windowWidth;
  p = createVector();
  angleMode(DEGREES);
  angleA = random(360);
  angleB = random(-180, 180);
}

function draw() {

  if (date2yb.getTime() != date.getTime()) {
    date = substOneDay(date);
  } else {
    noLoop();
  }

  background(0,0,10);

  let nsA =300;
  let nsB = 600;
  let angleA = noise(p.x / nsA, p.y / nsA, frameCount / nsA) * 360;
  let angleB = noise(p.y / nsB, p.z / nsB, frameCount / nsB) * 180 - 90;
  q = createVector(
    cos(angleA) * cos(angleB),
    sin(angleA) * cos(angleB),
    sin(angleB),
  ).mult(3);
  p.add(q);
  r.push(p.copy());

  for (let i = s.length - 1; i > 0; i--) {
    push();
    translate(r[i].x, r[i].y, r[i].z);
    fill(0, 0, 100);
    noStroke();
    textFont(font);
    textAlign(CENTER, CENTER);
    rotate(i*sin(frameCount) *cos(frameCount/2) * 5);
    text(s[i], 0, 0);
    pop();
  }

  if(s.length > 300){
    s.shift();
    r.shift();
  }
  
  
  let yyyy = date.getFullYear();
  let mm = nf(date.getMonth() + 1, 2);
  let dd = nf(date.getDate(), 2);

  let str = yyyy + "/" + mm + "/" + dd;
  push();
  translate(p.x, p.y, p.z);
    fill(0, 0, 100);
    noStroke();  textFont(font);
  textAlign(CENTER, CENTER);
  scale(-1,1);
  text(str, 0, 0);
  pop();
  s.push(str);

  let v = createVector(
    p.x + cos(angleA) * cos(angleB) * .1,
    p.y + sin(angleA) * cos(angleB) * .1,
    p.z + sin(angleB) *.1
  );

  camera(v.x, v.y, v.z, p.x, p.y, p.z, 0, 1, 0);

}


function substOneDay(date) {
  date.setDate(date.getDate() - 1);
  return date;
}