// reference : ryutaroMatsuoka's sketch
// https://www.openprocessing.org/sketch/852828

let graphicsA;
let graphicsB;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);


  graphicsA = createGraphics(width, height);
  graphicsA.colorMode(HSB, 360, 100, 100, 100);
  graphicsA.angleMode(DEGREES);

  graphicsB = createGraphics(width, height);
  graphicsB.colorMode(HSB, 360, 100, 100, 100);
  graphicsB.angleMode(DEGREES);

  let step = 50;
  let h = height / step;
  for (let i = 0; i < step; i++) {
    let y = i * height / step;
    if (i % 2 == 0) {
      graphicsA.fill(0, 0, 100);
      graphicsB.fill(0, 0, 0);
    } else {
      graphicsA.fill(0, 0, 0);
      graphicsB.fill(0, 0, 100);
    }
    graphicsA.noStroke();
    graphicsB.noStroke();
    graphicsA.rect(0, y, width, h);
    graphicsB.rect(0, y, width, h);

  }

  graphicsB.push();
  graphicsB.noErase();
  graphicsB.drawingContext.shadowColor = color(0,0,0,100);
  graphicsB.drawingContext.shadowBlur = 300;
  graphicsB.ellipse(width/2,height/2,500);
  graphicsB.pop();
  graphicsB.push();
  graphicsB.erase(255,0);
  graphicsB.ellipse(width/2,height/2,500);
  graphicsB.pop();

}

function draw() {
  background(0, 0, 90);
  image(graphicsA, 0, 0);
   
  image(graphicsB, 0, 0);
}