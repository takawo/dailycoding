// https://kylemcdonald.github.io/cv-examples/

let capture;
let w = 640;
let h = 480;
let backgroundPixels;
let threshold;
let button;
let mode;
let item;
let isApplicable = false;
let isContinuousReset;
let duration;

function setup() {
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    //console.log('capture ready.')
  });
  // capture.elt.setAttribute('playsinline', '');
  capture.size(w, h);
  createCanvas(w, h);
  capture.hide();

  button = createButton("reset background");
  button.position(20, 20);
  button.mousePressed(resetBackground);

  threshold = createSlider(0, 100, 50);
  threshold.position(90, 50);

  mode = createSelect();
  mode.position(90, 80);
  mode.option('none');
  mode.option('rgb');
  mode.option('bw');
  mode.changed(mySelectEvent);

  isContinuousReset = createCheckbox('', true);
  isContinuousReset.position(140, 105);
  item = 'none';

  duration = createSlider(0, 100, 80);
  duration.position(90, 140);
}


function resetBackground() {
  backgroundPixels = undefined;
}

function mySelectEvent() {
  item = mode.value();
}

function getRadioValue(name) {
  let inputs = selectAll('input');
  for (let i = 0; i < inputs.length; i++) {
    let x = inputs[i];
    if (name == x.elt.name && x.elt.checked) {
      return x.elt.value;
    }
  }
}

function copyImage(src, dst) {
  let n = src.length;
  if (!dst || dst.length != n) {
    dst = new src.constructor(n);
  }
  while (n--) {
    dst[n] = src[n];
  }
  return dst;
}

function draw() {
  capture.loadPixels();
  let n = int(map(duration.value(), 0, 100, 200, 1));

  if (capture.pixels.length > 0) { // don't forget this!
    if (!backgroundPixels) {
      backgroundPixels = copyImage(capture.pixels, backgroundPixels);
    }
    let i = 0;
    let pixels = capture.pixels;
    let thresholdAmount = threshold.value() * 255. / 100.;
    let thresholdType = item;
    if (thresholdType === 'rgb') {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
          i++;
          pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
          i++;
          pixels[i] = pixels[i] - backgroundPixels[i] > thresholdAmount ? 255 : 0;
          i++;
          i++; // skip alpha
        }
      }
    } else if (thresholdType === 'bw') {
      let total = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // another common type of background thresholding uses absolute difference, like this:
          // let total = Math.abs(pixels[i+0] - backgroundPixels[i+0] > thresholdAmount) || ...
          let rdiff = Math.abs(pixels[i + 0] - backgroundPixels[i + 0]) > thresholdAmount;
          let gdiff = Math.abs(pixels[i + 1] - backgroundPixels[i + 1]) > thresholdAmount;
          let bdiff = Math.abs(pixels[i + 2] - backgroundPixels[i + 2]) > thresholdAmount;
          let anydiff = rdiff || gdiff || bdiff;
          let output = 0;
          if (anydiff) {
            output = 255;
            total++;
          }
          pixels[i++] = output;
          pixels[i++] = output;
          pixels[i++] = output;
          i++; // skip alpha
        }
      }
      let n = w * h;
      let ratio = total / n;
    } else {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          pixels[i] = pixels[i] - backgroundPixels[i];
          i++;
          pixels[i] = pixels[i] - backgroundPixels[i];
          i++;
          pixels[i] = pixels[i] - backgroundPixels[i];
          i++;
          // pixels[i] =  n;
          i++; // skip alpha
        }
      }
      fill(255);
    }
  }
  capture.updatePixels();
  image(capture, 0, 0, 640, 480);
  fill(255);
  text("threshold", 15, 60);
  text("mode", 15, 85);
  text("continuous reset", 15, 115);
  text("duration", 15, 145);

  if (isContinuousReset.checked()) {
    if (frameCount % n == 0) {
      resetBackground();
    }
  }
}