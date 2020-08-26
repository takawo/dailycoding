//reference: modify FreddieRa's p5.3D library (a part of draw object in p5.Graphics)
//https://github.com/FreddieRa/p5.3D

let alphabet = "abcdefghijklmnopqrstuvwxyz";
let graphices;
let n;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  alphabet = alphabet.toUpperCase();
	init();
}

function init(){
	graphices = [];
  let g = createGraphics(width / 2, height / 2, WEBGL);
  for (let i = 0; i < alphabet.length; i++) {
    g.ortho(-g.width / 2, g.width / 2, -g.height / 2, g.height / 2, -1600, 1600);
    g.angleMode(DEGREES);
    g.clear();
    g.push();
    switch (int(random(3))) {
      case 0:
        g.rotateX(random(45) * (random() > 0.5 ? -1 : 1));
        break;
      case 1:
        g.rotateY(random(45) * (random() > 0.5 ? -1 : 1));
        break;
      case 2:
        g.rotateX(random(45) * (random() > 0.5 ? -1 : 1));
        g.rotateY(random(45) * (random() > 0.5 ? -1 : 1));
        // g.rotateZ(random(90) * (random() > 0.5 ? -1 : 1));
        break;
    }
    g.directionalLight(color(255, 255, 255), 0, 0, -500);
    word = createWord3D(
      alphabet.substr(i, 1), // The actual character that you want to draw (anything that can be passed into "text()")
      10, // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
      5, // The size of a unit "box()" making up part of the letter  
      70, // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
      true, // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
      "Georgia", // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
      BOLD // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
    );
    word.show(g);
    g.pop();
    let g2 = createGraphics(width, height);
    g2.image(g, 0, 0, g2.width, g2.height);
    graphices.push(g2);
  }

}

function draw() {
  background(0, 0, 95);
  push();
  translate(width / 2, height / 2);
  rotate(45);
  let w = sqrt(sq(width) + sq(height));
  translate(-w / 2, -w / 2);
  n = int(random(100)) % graphices.length;
  separateGrid(0, 0, w);
  pop();
  frameRate(0.5);
  // noLoop();
	if(frameCount %5 == 0){
		init();
	}
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 3) {
        separateGrid(i, j, w, graphices);
      } else {
        // rect(i,j,w,w);
        let g = graphices[n];
        n = (n + 1) % graphices.length;
        push();
        translate(i + w / 2, j + w / 2);
        rotate(int(random(4)) * 360 / 4);
        imageMode(CENTER);
        // drawingContext.shadowColor = color(0, 0, 0, 33);
        // drawingContext.shadowBlur = w / 10;
        // drawingContext.shadowOffsetX = w / 20;
        // drawingContext.shadowOffsetY = w / 20;
        image(g, 0, 0, w, w);
        pop();
      }
    }
  }
}