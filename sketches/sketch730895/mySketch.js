// forked from kylemcdonald's great cv example.
// https://kylemcdonald.github.io/cv-examples/

let capture;
let buffer;
let result;
let w = 640;
let h = 480;
let blur;
let lowerThreshold;
let higherThreshold;

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
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);

  blur = createSlider(0, 100, 50);
  blur.size(120, 20);
  blur.position(50, 20);

  lowerThreshold = createSlider(0, 100, 15);
  lowerThreshold.size(120, 20);
  lowerThreshold.position(120, 40);
  higherThreshold = createSlider(0, 100, 25);
  higherThreshold.size(120, 20);
  higherThreshold.position(120, 60);
}

function jsfeatToP5(src, dst) {
  if (!dst || dst.width != src.cols || dst.height != src.rows) {
    dst = createImage(src.cols, src.rows);
  }
  var n = src.data.length;
  dst.loadPixels();
  var srcData = src.data;
  var dstData = dst.pixels;
  for (var i = 0, j = 0; i < n; i++) {
    var cur = srcData[i];
    dstData[j++] = cur;
    dstData[j++] = cur;
    dstData[j++] = cur;
    dstData[j++] = 255;
  }
  dst.updatePixels();
  return dst;
}

function draw() {
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    let blurSize = blur.value();
    let lowThreshold = lowerThreshold.value();
    let highThreshold = higherThreshold.value();
    blurSize = map(blurSize, 0, 100, 1, 12);
    lowThreshold = map(lowThreshold, 0, 100, 0, 255);
    highThreshold = map(highThreshold, 0, 100, 0, 255);
    jsfeat.imgproc.grayscale(capture.pixels, w, h, buffer);
    jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
    jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
    let n = buffer.rows * buffer.cols;
    for (let i = 0; i < n; i++) {
      buffer.data[i] = 255 - buffer.data[i];
    }
    result = jsfeatToP5(buffer, result);
    image(result, 0, 0, 640, 480);
  }

  push();
  translate(0, 15);
  text("blur", 20, 20);
  text("lowerThreshold", 20, 40);
  text("higherThreshold", 20, 60);
  pop();
}