let graphicsA;
let graphicsB;
let graphicsC;

let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
let palette = createPalette(url);

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

  graphicsC = createGraphics(width, height);
  graphicsC.colorMode(HSB, 360, 100, 100, 100);
  graphicsC.angleMode(DEGREES);

}


function separateGrid(x, y, d, g, g2,g3) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w, g, g2,g3);
      } else {

        // rect(i, j, w, w);
        let angle = int(random(4)) * 360 / 4;
        g.push();
        g.translate(i + w / 2, j + w / 2);
        g.rotate(angle);
        g.translate(-w / 2, -w / 2);

        g2.push();
        g2.translate(i + w / 2, j + w / 2);
        g2.rotate(angle);
        g2.translate(-w / 2, -w / 2);

        let step = int(random(1, 5)) * int(random(2, 5));
        let c1 = random(palette);
        let c2 = random(palette);
        while (c1 == c2) {
          c2 = random(palette);
        }


        let h = w / step;
        for (let k = 0; k < step; k++) {
          let yy = k * w / step;
          if (k % 2 == 0) {
            g.fill(c1);
            g2.fill(c2);
          } else {
            g.fill(c2);
            g2.fill(c1);
          }
          g.noStroke();
          g2.noStroke();
          g.rect(0, yy, w, h);
          g2.rect(0, yy, w, h);
        }
        g.pop();

        g2.push()
        g2.drawingContext.shadowColor = color(0, 0, 0);
        g2.drawingContext.shadowBlur = w * 0.2;
        // g2.circle(w / 2, w / 2, w);
        g2.triangle(0, 0, w, w, 0, w);
        g2.pop()
        g2.push()
        g2.erase(255, 0);
        g2.triangle(0, 0, w, w, 0, w);
        g2.noErase();
        g2.pop()
        g2.pop();
        
        g3.push();
        g3.translate(i + w / 2, j + w / 2);
        g3.push();
        g3.noErase();
        g3.drawingContext.shadowColor = color(0,0,0);
        g3.drawingContext.shadowBlur = w/10;
				g3.noStroke();
        g3.ellipse(0,0,w*0.9,w*0.9);
        g3.pop();
        g3.erase(255,0);
        g3.ellipse(0,0,w*0.9,w*0.9);
        g3.noErase();
        g3.pop();
        
      }
    }
  }
}

function draw() {
  background(0, 0, 90);
  graphicsA.clear();
  graphicsB.clear();
  // graphicsC.clear();
  graphicsC.background(0, 0, 90);
  
  separateGrid(0, 0, width, graphicsA, graphicsB,graphicsC);
  image(graphicsA, 0, 0);
  image(graphicsB, 0, 0);
  image(graphicsC, 0, 0);

  frameRate(0.5);
}


function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}