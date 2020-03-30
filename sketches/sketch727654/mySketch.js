let bodyPix;
let video;
let segmentation;
let img;
let offset = 20;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.5 // 0 - 1, defaults to 0.5 
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  bodyPix = ml5.bodyPix(video, modelReady);
  createHSBPalette();
}

function modelReady() {
  bodyPix.segmentWithParts(gotResults, options);
}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  segmentation = result;
  bodyPix.segmentWithParts(gotResults, options);
}

function draw() {
  if (segmentation != undefined) {
    image(segmentation.image, 0, 0, width, height);
  }
  image(video, width - video.width / 3 - offset, height - video.height / 3 - offset,
    video.width / 3, video.height / 3);
}

function createSimplePalette() {
  options.palette = bodyPix.config.palette;
  Object.keys(bodyPix.palette).forEach(part => {
    const r = floor(random(255));
    const g = floor(random(255));
    const b = floor(random(255));
    options.palette[part].color = [r, g, b]
  });
}

function createHSBPalette() {
  colorMode(HSB);
  options.palette = bodyPix.config.palette;
  Object.keys(options.palette).forEach(part => {
    const h = floor(random(360));
    const s = floor(random(100));
    const b = floor(random(100));
    const c = color(h, s, b)
    options.palette[part].color = c;
  });
}

function createHSBPalette() {
  colorMode(RGB);
  options.palette = bodyPix.config.palette;
  Object.keys(options.palette).forEach(part => {
    const r = floor(random(255));
    const g = floor(random(255));
    const b = floor(random(255));
    const c = color(r, g, b)
    options.palette[part].color = c;
  });
}