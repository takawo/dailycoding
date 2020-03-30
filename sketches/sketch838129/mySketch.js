let count = 0;
let w;
let angle = 0;
let graphics;
let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];
let baseColor;
let baseGraphics;
let maskGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pixelDensity(1);
  angleMode(DEGREES);
  w = sqrt(width * width + height * height);

  let baseNum = int(random(pallete.length));
  baseColor = pallete[baseNum];
  pallete.splice(baseNum, 1);

  baseGraphics = createGraphics(width, height);
  maskGraphics = createGraphics(width, height);
  maskGraphics.background(baseColor);
  maskGraphics.angleMode(DEGREES);

  let cells = int(random(4, 10));
  let offset = width / 10;
  let margin = offset / 5;
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  maskGraphics.erase(255,0);
  maskGraphics.strokeWeight(d/30);
  maskGraphics.strokeJoin(ROUND);
  
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d+margin);
      let y = offset + j * (d+margin);
      maskGraphics.push();
      maskGraphics.translate(x+d/2,y+d/2);
      maskGraphics.rotate(int(random(4)) * 360/4);
      if(random(100) > 50){
      maskGraphics.arc(-d/2,-d/2,d*2,d*2,0,90,PIE);
      }else{
      maskGraphics.triangle(-d/2,-d/2,d/2,-d/2,d/2,d/2);      
      }
      maskGraphics.pop();
    }

  }

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 15 / 100; i++) {
    graphics.fill(0, 0, random(100) > 50 ? 20 : 80, 5);
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  randomSeed(0);
  baseGraphics.push();
  baseGraphics.translate(width / 2, height / 2);
  //baseGraphics.rotate(45);
  separateGrid(-w / 2 - 1, -w / 2 - 1, w + 2, w + 2, 8, pallete.concat(), baseGraphics);
  // imageMode(CENTER);
  baseGraphics.pop();
  image(baseGraphics, 0, 0);
  image(maskGraphics, 0, 0);
  count += 0.05;
  image(graphics, 0, 0);
}

function separateGrid(x, y, w, h, depth, colors, g) {

  let direction = random(100) > 50 ? -1 : 1;
  if (depth > 0) {
    let n = noise(x / 200, y / 100, (direction * frameCount) / 800);
    let m = n * 360;
    g.fill(random(colors));
    g.noStroke();
    g.rect(x, y, w + 1, h + 1);
    if (depth % 2 == 1) {
      separateGrid(x, y, w * n, h, depth - 1, pallete.concat(), g);
      separateGrid(x + w * n, y, w - w * n, h, depth - 1, pallete.concat(), g);
    } else {
      separateGrid(x, y, w, h * n, depth - 1, pallete.concat(), g);
      separateGrid(x, y + h * n, w, h - h * n, depth - 1, pallete.concat(), g);
    }
  }
}