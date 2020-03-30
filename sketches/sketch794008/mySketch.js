let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  
  for (let i = 0; i < width * height * 15 / 100; i++) {
    if(random(100) > 50){
    graphics.fill(0, 0, 0, 10);
    }else{
    graphics.fill(0, 0, 100, 10);
    }
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }  
}

function draw() {
  background(0, 0, 95);

  let offset = width / 10;
  let gWidth = width - offset * 2;
  let g = createGraphics(gWidth / 2, gWidth);
  g.angleMode(DEGREES);
  separateGrid(0, 0, g.height, g);

  if (random(100) > 50) {
    push();
    translate(offset + g.width, offset);
    image(g, 0, 0);
    pop();
    push();
    translate(offset + g.width, offset);
    scale(-1, 1);
    image(g, 0, 0);
    pop();
  } else {
    push();
    translate(offset, offset);
    image(g, 0, 0);
    pop();
    push();
    translate(width - offset, offset);
    scale(-1, 1);
    image(g, 0, 0);
    pop();
  }

  image(graphics,0,0);
  //noLoop();
  frameRate(.5);
}



function separateGrid(x, y, d, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 80 && d > width / 15) {
        separateGrid(i, j, w, g);
      } else {
        g.push();
        g.translate(i + w / 2, j + w / 2);
        g.rotate(int(random(4)) * 360 / 4);
        g.fill(0, 0, 20);
        g.noStroke();
        let shape_num = int(random(7));
        switch (shape_num) {
          case 0:
            g.triangle(-w / 2, -w / 2, w / 2, -w / 2, -w / 2, w / 2);
            break;
          case 1:
            g.arc(-w / 2, -w / 2, w * 2, w * 2, 0, 90);
            break;
          case 2:
            g.noFill();
            g.stroke(0, 0, 20);
            //g.strokeWeight(w / 30);
            g.line(-w / 2, -w / 2, w / 2, w / 2);
            break;
          case 3:
            g.noFill();
            g.stroke(0, 0, 20);
            g.strokeWeight(w / 4);
            g.point(-w / 2, -w / 2);
            break;
          case 4:
            g.triangle(0, 0, -w / 2, -w / 2, w / 2, -w / 2);
            break;
          case 5:
            g.arc(0, -w / 2, w, w, 0, 180);
            break;
          case 6:
            g.rect(-w / 2, -w / 2, w / 2, w);
            break;
        }
        g.pop();
      }
    }
  }
}