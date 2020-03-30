let dotSize = 9;
let angleOffsetA;
let angleOffsetB;

function setup() {
  createCanvas(900, 600);
  angleMode(DEGREES);
  noStroke();
  fill("#F597B0");
  smooth();
  frameRate(1);

  angleOffsetA = 1.5; 
  angleOffsetB = 50;
}

function draw() {
  background(0,0,0); // White background
  translate(width / 2, height); // Move to the center, bottom of the screen
  seed1(dotSize, 270, 0, 0); // Start the tree
}

function seed1(dotSize, angle, x, y) {

  if (dotSize > 1.0) {

    // Create a random numbers between 0 and 1
    let r = random(0, 1.0);

    // 98% chance this will happen
    if (r > 0.02) {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed1(dotSize * 0.99, angle - angleOffsetA, newx, newy);
    }
    // 02% chance this will happen
    else {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle);
      let newy = y + sin(angle);
      seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy);
      seed1(dotSize * 0.60, angle + angleOffsetB, newx, newy);
      seed2(dotSize * 0.50, angle - angleOffsetB, newx, newy);
    }
  }
}


function seed2(dotSize, angle, x, y) {

  if (dotSize > 1.0) {

    // Create a random numbers between 0 and 1
    let r = random(0, 1.0);

    // 95% chance this will happen
    if (r > 0.05) {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy);
    }
    // 05% chance this will happen
    else {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle);
      let newy = y + sin(angle);
      seed1(dotSize * 0.99, angle + angleOffsetA, newx, newy);
      seed2(dotSize * 0.60, angle + angleOffsetB, newx, newy);
      seed1(dotSize * 0.50, angle - angleOffsetB, newx, newy);
    }
  }
}