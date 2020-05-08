let g1, g2;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  g1 = createGraphics(width, height);
  g1.colorMode(HSB, 360, 100, 100, 100);
  g1.angleMode(DEGREES);
  g2 = createGraphics(width, height);
  g2.colorMode(HSB, 360, 100, 100, 100);
  g2.angleMode(DEGREES);

  separateGrid(0, 0, width, g1, g2);
}

function draw() {
  image(g1, 0, 0);
  drawingContext.shadowColor = color(0, 0, 0);
  drawingContext.shadowBlur = 50;
  image(g2, 0, 0);
  noLoop();
}

function separateGraphics(gg,g, i, j, w) {
  let sep = max(w/10,1);
  let angle = int(random(4)) * 360/4;
  g.push();
  g.translate(i + w / 2, j + w / 2);
  g.rotate(angle);
  g.translate(-w / 2, -w / 2);
  let n = 1;
  for (let i = 0; i < sep; i++) {
    if(i %2 ==n){
      g.fill(0,0,100);
    }else{
      g.fill(0,0,0);
    }
    g.noStroke();
    let x = 0;
    let y = i * w/sep;
    let h = w/sep;
    g.rect(x,y,w,h);
  }
  g.pop();
  
  gg.push();
  gg.translate(i + w / 2, j + w / 2);
  gg.rotate(angle);
  gg.translate(-w / 2, -w / 2);
  for (let i = 0; i < sep; i++) {
    if(i %2 ==n){
      gg.fill(0,0,0);
    }else{
      gg.fill(0,0,100);
    }
    gg.noStroke();
    let x = 0;
    let y = i * w/sep;
    let h = w/sep;
    gg.rect(x,y,w,h);
  }
  gg.pop();
}


function separateGrid(x, y, d, gg, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 2) {
        separateGrid(i, j, w, gg, g);
      } else {
        separateGraphics(gg,g, i, j, w);
        g.push();
        g.translate(i + w / 2, j + w / 2);
        g.textSize(w);
        g.textStyle(BOLD);
        g.textAlign(CENTER, CENTER);
        g.erase(255, 0);
        let str = alphabet.substr(int(random(alphabet.length)), 1);
        g.text(str, 0, 0);
        g.noErase();
        g.pop();
      }
    }
  }
}