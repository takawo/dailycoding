let colorPickerA;
let colorPickerB;
let colorPickerC;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  colorPickerA = createColorPicker(color(0, 0, 20));
  colorPickerA.position(120, 20);

  colorPickerB = createColorPicker(color(159, 100, 100));
  colorPickerB.position(120, 50);

  colorPickerC = createColorPicker(color(321, 100, 61));
  colorPickerC.position(120, 80);

  textFont("Helvetica");
  textAlign(LEFT, CENTER);

}

function draw() {
  
  randomSeed(frameCount);
  
  let backgroundColor = colorPickerA.color();
  let fillColor = colorPickerB.color();
  let shadowColor = colorPickerC.color();


  blendMode(BLEND);
  background(backgroundColor);

  fill(0, 0, 100);
  text("color-Background", 20, 35);
  text("color-Fill", 20, 65);
  text("color-Shadow", 20, 95);

  blendMode(SCREEN);

  let cx = width / 2;
  let cy = height / 2;
  let d = width/1.2;

  drawingContext.shadowColor = shadowColor;
  drawingContext.shadowBlur = d/2;
  drawingContext.shadowOffsetX = d / 20;
  drawingContext.shadowOffsetY = d / 20;

  fill(fillColor);
  noStroke();

  ellipse(width/2,height/2,d*0.8,d*0.8);
  
  // let points = [];
  // let n = 0;
  // let num = int(random(3, 20));
  // let angleStep = 360 / num;
  // beginShape();
  // for (let angle = 0; angle < 360; angle += angleStep) {
  //   let r = noise(angle/100, frameCount / 150) * d / 2;
  //   let x = cx + cos(angle+frameCount) * r;
  //   let y = cy + sin(angle+frameCount) * r;
  //   if (n < 3) {
  //     points.push(createVector(x, y));
  //   }
  //   curveVertex(x, y);
  //   n++;
  // }
  // for (let p of points) {
  //   curveVertex(p.x, p.y);
  // }
  // endShape();

}