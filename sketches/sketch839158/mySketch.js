let capture;

function preload() {
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{
        maxFrameRate: 10
      }]
    },
    audio: false
  };
  capture = createCapture(constraints);
  capture.hide();
}

function setup() {
  createCanvas(1280, 720);
  pixelDensity(1);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 0);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  separateGrid(0, 0, width, height, 8, 0, 0, width, height);
  pop();
}

function separateGrid(x, y, w, h, depth, ix, iy, iw, ih) {
  if (depth > 0) {
    let n = map(noise(x / width, y / height, frameCount / 300 * depth)*sin((x * y / 333) + frameCount) * cos((w * h) / 33333 + frameCount / 2), -1, 1, 0, 1);

    if (depth-- % 2 === 1) {
      separateGrid(x, y, w * n, h, depth,
        ix, iy, iw / 2, ih);
      separateGrid(x + w * n, y, w - w * n, h, depth,
        ix + iw / 2, iy, iw / 2, ih);
    } else {
      separateGrid(x, y, w, h * n, depth,
        ix, iy, iw, ih / 2
      )
      separateGrid(x, y + h * n, w, h - h * n, depth,
        ix, iy + ih / 2, iw, ih / 2
      );
    }
  } else {
    image(capture, x, y, w, h, ix, iy, iw, ih)
  }
}