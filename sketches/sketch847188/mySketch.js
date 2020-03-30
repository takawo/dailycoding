let imgs = [];
let num = 105;

function preload() {
  for (let i = 1; i < num + 1; i++) {
    imgs.push(loadImage("peep-" + i + ".png"));
  }
  for (let i = 1; i < 30+1; i++) {
    imgs.push(loadImage("peep-standing-" + i + ".png"));
  }
  for (let i = 1; i < 18+1; i++) {
    imgs.push(loadImage("peep-sitting-" + i + ".png"));
  }
}


function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
}

function draw() {
  background(0,0,95);
  separateGrid(0, 0, width);
  frameRate(.5);
  // noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        imageMode(CENTER);
        let img = random(imgs);
        let hh = w;
        let ww = w * img.width / img.height;        
        push();
        translate(i+w/2,j+w/2);
        if(random(100) > 50){
        scale(-1,1);
        }
        image(img,0,0,ww,hh);
        pop();
        
        //rect(i, j, w, w);
      }
    }
  }
}