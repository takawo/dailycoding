let freq = 100;
let pallete = ["#1132B2", "#0E1057", "#BAE7F1", "#24AFC2", "#F13736", "#4A3749", "#BC8968", "#050110"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  blendMode(BLEND);
  background(0,0,95);
  // blendMode(BURN);
  let cells = 8;
  let offset = width / 15;
	noiseSeed(random(100000));

  drawingContext.shadowColor = color(0, 0, 100,50);
  drawingContext.shadowBlur =30;
  drawingContext.shadowOffsetY = -10;
  drawingContext.shadowOffsetX = -10;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      d = (width + offset + 2) / cells;
      let x = -offset + i * d;
      let y = -offset + j * d;
      d = d * 4;

      let x1 = constrain(x + map(noise(x, y,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let y1 = constrain(y + map(noise(y, x,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, height - offset);
      let x2 = constrain(x + d + map(noise(x + d, y,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let y2 = constrain(y + map(noise(y, x + d,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let x3 = constrain(x + d + map(noise(x + d, y + d,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let y3 = constrain(y + d + map(noise(y + d, x + d,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let x4 = constrain(x + map(noise(x, y + d,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);
      let y4 = constrain(y + d + map(noise(y + d, x,frameCount/freq), 0, 1, -0.3, 0.3) * d, offset, width - offset);


      noStroke();
      // stroke(0, 0, 90);
      fill(random(pallete));
      quad(x1, y1, x2, y2, x3, y3, x4, y4);


    }
  }

  drawingContext.shadowColor = color(0, 0, 0);
  drawingContext.shadowBlur =offset/4;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowOffsetX = 0;
  stroke(0,0,100);
  noFill();
  rect(offset,offset,width-offset*2,height-offset*2);
    
  
  // noLoop();
	frameRate(0.5);

}