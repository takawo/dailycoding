//reference: @nagayama's awesome bodypix sketch!
//https://twitter.com/nagayama/status/1224466600981483520
//https://www.openprocessing.org/sketch/834678

let bodypix;
let capture;
let segmentation;
let img;
let img_arr = [];
let scl = 8;

const options = {
  outputStride: 8,
  segmentationThreshold: 0.5
}

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  drawingContext.imageSmoothingEnabled=false;
  drawingContext.shadowColor = color(0,0,0,33);
  drawingContext.shadowBlur = width/10;
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{
        maxFrameRate: 30
      }]
    },
    audio: false
  }, function() {
    capture.size(1280 / scl, 720 / scl);
    capture.hide();
    bodypix.segment(capture, gotResults)

  });

}

function draw() {

}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  segmentation = result;

  imageMode(CENTER);
  let i = 0;
  let r = height / 3;
  img_arr.push(segmentation.backgroundMask);
  if (img_arr.length > 30) {
    img_arr.shift();
  }

  for (let img of img_arr) {
    let scl = map(i, 0, 30, 5, 0.1);
    image(img, width / 2 + cos(i * 5 + frameCount*0.53) * r, height / 2 + sin(i * 5 + frameCount*0.35) * r, 1280 * scl, 720 * scl);
    i++;
  }

  bodypix.segment(capture, gotResults)

}