let w = 640;
let h = 480;
let detector;
let classifier;
let img;
let faces;
let tf;

function preload() {
  let url = "https://loremflickr.com/" + w + "/" + h + "/portrait/";
  classifier = objectdetect.frontalface;
  let scaleFactor = 1.2;
  detector = new objectdetect.detector(w, h, scaleFactor, classifier);
  img = loadImage(url, function(img) {
    faces = detector.detect(img.canvas);
  })
}


function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  image(img, 0, 0, w, h);

  if (faces) {
    for (let face of faces) {
      let count = face[4]; //probability?
      if (count > 4) {
        let imgX = face[0];
        let imgY = face[1];
        let imgW = face[2];
        let imgH = face[3];
        let cx = imgX + imgW/2;
        let cy = imgY + imgH/2;
        init(cx,cy,imgW,imgH);
      }
    }
  }
  noLoop();
}

function init(cx,cy,w,h) {  
  tf = new Transformer();
  let depth = int(random(5, 10));
  //rect(cx,cy,w,h);
  noStroke();
  drawRecursiveRect(cx,cy, w, h, depth);
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