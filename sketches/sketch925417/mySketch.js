function setup() {
    createCanvas(800, 800);
  // drawingContext.imageSmoothingEnabled = false;
}

function draw() {
  for (let x = 0; x < width; x++) {
    let y = height / 2;
    if (noise(x, y, frameCount / 50) > 0.35) {
      stroke(0);
    } else {
      stroke(255);
    }
    point(x, y);
  }
  copy(0, 0, width, height / 2 + 1, 
       -2, -2, width + 3, height / 2 + 2);
  copy(0, height / 2, width, height / 2 + 1,
       -2, height / 2 + 1, width + 3, height / 2 + 2);
}