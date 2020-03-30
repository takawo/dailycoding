let blurLayer;
let graphicsLayer;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  background(0, 0, 80);



  graphicsLayer = createGraphics(width/2, height);
  graphicsLayer.colorMode(HSB, 360, 100, 100, 100);
  graphicsLayer.angleMode(DEGREES);

  graphicsLayer.fill(0, 0, 20);
  graphicsLayer.noStroke();
  graphicsLayer.ellipse(graphicsLayer.width / 2, graphicsLayer.height / 2, 250, 250);


  blurLayer = createGraphics(width/2, height);
  blurLayer.copy(graphicsLayer,
    0, 0, graphicsLayer.width, graphicsLayer.height,
    0, 0, graphicsLayer.width, graphicsLayer.height);
}

function draw() {

  image(graphicsLayer,0, 0);
  
  blurLayer.filter(BLUR, 10);
  image(blurLayer, width/2, 0);
  image(graphicsLayer, width/2, 0);
  noLoop();
}