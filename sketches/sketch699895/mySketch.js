let tf;
let offset;
let w, h;
let img;
let url = "https://loremflickr.com/600/600/man/all";

function preload() {
  img = loadImage(url);
}

function setup() {
  createCanvas(1200, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(220);
  image(img, 0, 0);
  image(img, 600, 0);
  init();
}

function init() {  
  tf = new Transformer();
  let depth = int(random(10, 15));
  offset = width / 40;
  let w = width/2 - offset * 2;
  let h = height - offset * 2;
  stroke(255);
  strokeWeight(5);
  rect(width/4,height/2,w,h);
  noStroke();
  drawRecursiveRect(width / 4, height / 2, w, h, depth);
}

function drawRecursiveRect(cx, cy, _w, _h, depth) {
  tf.push();
  tf.translate(cx, cy);
  let angle = int(random(4)) * 90;
  tf.rotate(angle);
  let w, h;
  if (angle % 180 == 90) {
    w = _h;
    h = _w;
  } else {
    w = _w;
    h = _h;
  }
  fill(img.get(tf.x-w/4,tf.y));
  rect(-w / 4, 0, w / 2, h);
  fill(img.get(tf.x+w/4,tf.y));
  rect(+w / 4, 0, w / 2, h);
  if (depth > 0) {
    if (depth > 3 ||sqrt(random(1)) > 0.2) {
      drawRecursiveRect(-w / 4, 0, w / 2, h, depth - 1);
    }
    if (depth > 3 ||sqrt(random(1)) > 0.2) {
      drawRecursiveRect(+w / 4, 0, w / 2, h, depth - 1);
    }
  }
  tf.pop();
}