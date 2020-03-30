
let img;
let values;
let angle = 0;

function preload() {
  img = loadImage("nasa-iceberg.jpg");
}


function setup() {
  createCanvas(1024, 768,WEBGL);
  
  noFill();

  values = [];

  // Extract the brightness of each pixel in the image
  // and store in the "values" array
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    values[y] = [];
    for (let x = 0; x < img.width; x++) {
      let pixel = img.pixels[y * img.width + x];
      values[y][x] = (int(brightness(pixel)));
    }
  }
}

function draw() {
  background(0,0,0); // White background
  // translate(width / 2, height / 2, 0); // Move to the center
  //scale(4.0); // Scale to 400%

  // Update the angle
  angle += 0.05;
  rotateY(angle);

  // Display the image mass
  for (let y = 0; y < img.height; y += 10) {
    for (let x = 0; x < img.width; x += 10) {
			stroke("#F597B0");
      //stroke(values[y][x], 153);
      let x1 = x - img.width / 2;
      let y1 = y - img.height / 2;
      let z1 = -values[y][x] / 2;
      let x2 = x - img.width / 2;
      let y2 = y - img.height / 2;
      let z2 = -values[y][x] / 2 - 4;
      line(x1, y1, z1, x2, y2, z2);
    }
  }
}