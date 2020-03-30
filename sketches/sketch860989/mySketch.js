//reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

let img;

function preload(){
  img = loadImage("https://loremflickr.com/8/8/");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  drawingContext.imageSmoothingEnabled=true;
  image(img,0,0,400,400);
  drawingContext.imageSmoothingEnabled=false;
  image(img,400,0,400,400);
}