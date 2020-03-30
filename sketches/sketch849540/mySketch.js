let graphics = [];
let layerGraphics;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;
let textureGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  textureGraphics = createGraphics(width, height);
  textureGraphics.colorMode(HSB, 360, 100, 100, 100);
  textureGraphics.angleMode(DEGREES);

  	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		textureGraphics.fill(0, 0, 100, 5);
		textureGraphics.noStroke();
		textureGraphics.ellipse(x, y, dw, dh);
	}
  
  
  pallete = createPallete(url);

  layerGraphics = createGraphics(width, height);
  layerGraphics.colorMode(HSB, 360, 100, 100, 100);
  layerGraphics.angleMode(DEGREES);
  layerGraphics.background(0, 0, 100);
  layerGraphics.rectMode(CENTER);

  for (let i = 0; i < 10; i++) {
    let g = createGraphics(width / 4, height / 4);
    let w = sqrt(g.width * g.width + g.height * g.height);
    g.colorMode(HSB, 360, 100, 100, 100);
    g.angleMode(DEGREES);
    g.push();
    g.translate(g.width / 2, g.height / 2);
    g.rotate(45);
    g.translate(-w / 2, -w / 2);
    let sep = int(random(5, 15)) * 3;
    let sw = w / sep / 100;
    g.drawingContext.setLineDash([5]);
    g.stroke(random(pallete));
    for (let i = 0; i < 1; i += 1 / sep) {
      let x = map(i, 0, 1, 0, w);
      g.line(x, 0, x, w);
    }
    g.pop();
    graphics.push(g);
  }

}

function draw() {
  background(0, 0, 10);
  layerGraphics.background(0, 0, 10);
  separateGrid(0, 0, width);
  image(layerGraphics, 0, 0);
  image(textureGraphics,0,0);
  frameRate(0.5);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        fill(random(pallete));
        noStroke();
        rect(i,j,w,w);
        image(random(graphics), i, j, w, w);
        layerGraphics.erase(255, 0);
        layerGraphics.push();
        layerGraphics.translate(i + w / 2, j + w / 2);
        switch (int(random(5))) {
          case 0:
            layerGraphics.circle(0, 0, w);
            break;
          case 1:
            layerGraphics.square(0, 0, w);
            break;
          case 2:
            layerGraphics.rotate(int(random(4)) * 360 / 4);
            layerGraphics.triangle(-w / 2, -w / 2, w / 2, -w / 2, w / 2, w / 2);
            break;
          case 3:
            layerGraphics.rotate(int(random(4)) * 360 / 4);
            layerGraphics.arc(-w / 2, -w / 2, w * 2, w * 2, 0, 90);
            break;
          case 4:
            layerGraphics.rotate(45);
            layerGraphics.square(0, 0, sqrt(sq(w / 2) * 2));
            break;
        }
        layerGraphics.pop();
      }
    }
  }
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}