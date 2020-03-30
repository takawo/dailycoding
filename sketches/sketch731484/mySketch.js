// forked from https://kylemcdonald.github.io/cv-examples/

let capture;
let w = 640;
let h = 480;
let lastPoint;
let trailPointsLength = 100;
let trailPoints = [];
let anotherLastPoint;
let smoothSlider;

function setup() {
  createCanvas(w, h);
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    //console.log("capture ready");
  });
  capture.size(w, h);
  capture.hide();

  smoothSlider = createSlider(0, 100, 50);
  smoothSlider.position(120, 20);
}

function findBrightest(video) {
  let brightestValue = 0;
  let brightestPosition = createVector(0, 0);
  let pixels = video.pixels;
  var i = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = pixels[i++];
      let g = pixels[i++];
      let b = pixels[i++];
      i++;
      let bri = r + g + b;
      if (bri > brightestValue) {
        brightestValue = bri;
        brightestPosition.set(x, y);
      }
    }
  }
  return brightestPosition;
}

function smoothPoint(point, amount) {
  if (!lastPoint) {
    lastPoint = point;
  } else {
    lastPoint.lerp(point, 1 - amount);
  }
  return lastPoint.copy();
}

function drawTrail(nextPoint) {
  trailPoints.push(nextPoint);
  if (trailPoints.length > trailPointsLength) {
    trailPoints.shift();
  }
  beginShape();
  for (let p of trailPoints) {
    vertex(p.x, p.y);
  }
  endShape();
}

function clearTrail() {
  trailPoints = [];
}


function draw() {
  image(capture, 0, 0, w, h);
  capture.loadPixels();

  if (capture.pixels.length > 0) {
    let bri = findBrightest(capture);
    let smoothingAmount = smoothSlider.value() / 100.0;
    bri = smoothPoint(bri, smoothingAmount);
    
    if (anotherLastPoint) {
      var dist = anotherLastPoint.dist(bri);
      if (dist > 100) {
          bri = anotherLastPoint;
      }
    }

    var radius = 8;
    noStroke();
    fill("#E50067");
    ellipse(bri.x, bri.y, radius, radius);

    noFill();
    strokeWeight(4);
    stroke("#E50067");
    strokeJoin(ROUND);
    drawTrail(bri);
    anotherLastPoint = bri.copy();
  }
  fill(0);
  noStroke();
  text("smooth amount",20,35);
}