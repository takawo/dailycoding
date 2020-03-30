let url = "https://coolors.co/app/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd";
let pallete;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);
  
  graphics = createGraphics(width,height);
  graphics.fill(255,20);
  graphics.noStroke();
  for(let i = 0; i < width * height * 15/100;i++){
    graphics.ellipse(random(width),
                     random(height),
                     random(2),
                     random(2));
  }
  
  
}

function draw() {
  background(0,0,10);
  stroke(0,0,90);
  noFill();
  let w = sqrt(width * width + height * height);
  push();
  translate(width / 2, height / 2);
  rotate(45);
  translate(-w / 2, -w / 2);
  separateGrid(0, 0, w);
  pop();
  
  image(graphics,0,0);
  noLoop();
}


function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        let sep = int(random(w/2, w));

        push();
        translate(i + w / 2, j + w / 2);
        rotate(int(random(4)) * 360 / 4);
        let n = random(100);
        for (let ww = w; ww > 0; ww -= w / sep) {
          rectMode(CENTER);
          //strokeCap(ROUND);
          strokeCap(SQUARE);
          let list = [];
          let rMax = w * TWO_PI/4;
          let strokeWidth = w / int(random(rMax/8, rMax));
          let separateWidth = w / int(random(5, 20));
          list.push(strokeWidth);
          list.push(strokeWidth);
          let sw = 1;
          w / 50;
          strokeWeight(sw);
          stroke(random(pallete));
          drawingContext.setLineDash(list); // set the "dashed line" mode
          if (n > 50) {
            arc(-w / 2, -w / 2, ww * 2 - sw / 2, ww * 2 - sw / 2, 0, 90);

          } else {
            rect(0, 0, ww - sw / 2, ww - sw / 2);
          }
          drawingContext.setLineDash([]); // reset into "solid line" mode
        }
        pop();
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