let maskImage;
let texture;

function preload(){
  maskImage = loadImage("people.png");
  texture = loadImage("texture.png");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(20);
  
  image(maskImage,0,0);
  
  texture.mask(maskImage);
  image(texture,400,0);
}