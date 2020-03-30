// forked from https://kylemcdonald.github.io/cv-examples/

let capture;
let w = 640;
let h = 480;
let step = 8;
let brightnessGraph;
let graphHeight = h / 3;

function setup() {
  createCanvas(w, h);
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    //console.log('capture ready.')
  });
  capture.size(w, h);
  capture.hide();
  brightnessGraph = new Graph(100, 0, 255);
}

function draw() {
  image(capture, 0, 0, w, h);

	capture.loadPixels();
  if (capture.pixels.length > 0) { // don't forget this!
    let total = 0;
    let i = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let redValue = capture.pixels[i];
        total += redValue;
        i += 4;
      }
    }

    let n = w * h;
    let avg = int(total / n);
		//draw graph....
    stroke(128, 128);
    strokeWeight(1);
    line(0, height / 2 - graphHeight / 2, width, height / 2 - graphHeight / 2);
    line(0, height / 2, width, height / 2);
    line(0, height / 2 + graphHeight / 2, width, height / 2 + graphHeight / 2);
    push();
    translate(0, height / 2 - graphHeight / 2);
    stroke(255);
    brightnessGraph.addSample(avg);
    brightnessGraph.draw(width, graphHeight, 1.5);
    pop();
		// draw color rect and avg on top right corner...
    push();
    translate(width - 100, 0);
    fill(avg);
    noStroke();
    rectMode(CENTER);
    rect(50, 50, 80, 80);
    textAlign(CENTER, CENTER);
    fill(0);
    text(avg, 50, 50);
    pop();
  }
}