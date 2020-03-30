let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  let percent = 10 / 100;
  for (let i = 0; i < width * height * percent; i++) {
    let x = random(width);
    let y = random(height);
    let dw = random(3);
    let dh = random(3);
    graphics.fill(0, 0, 100, 5);
    graphics.noStroke();
    graphics.ellipse(x, y, dw, dh);
  }
}

function draw() {
  background(0, 0, 20);
  separateGrid(0, 0, width);
  frameRate(.5);
  image(graphics, 0, 0);
}


function separateGrid(x, y, d, colors) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  let num = 5;
  stroke(0,0,100);
  noFill();
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        int(random(1, 4));
        let shape_num = int(random(3));
        switch(shape_num){
          case 0: 
          drawLineArc(i, j, w,num);
            break;
          case 1: 
          drawLineTriangle(i, j, w,num)
            break;
          case 2: 
          drawLineRect(i, j, w,num)
            break;
        }
      }
    }
  }
}

function drawLineArc(x, y, d,n) {
  push();
  translate(x+d/2,y+d/2);
  rotate(int(random(4)) * 360 / 4);
  for(let i = n; i > 0; i--){
    push();
    translate(-d/2,-d/2);
    scale(i/n);
    strokeWeight(n/i);
    arc(0,0,d * 2, d * 2, 0, 90,PIE);
    pop();
  }
  pop();
}

function drawLineTriangle(x, y, d,n) {
  push();
  translate(x+d/2,y+d/2);
  rotate(int(random(4)) * 360 / 4);
  for(let i = n; i > 0; i--){
    push();
    translate(-d/2,-d/2);
    scale(i/n);
    strokeWeight(n/i);
    triangle(0,0,d,0,0,d);  
    pop();
  }
  pop();
}

function drawLineRect(x, y, d,n) {
  push();
  translate(x+d/2,y+d/2);
  rotate(int(random(4)) * 360 / 4);
  for(let i = n; i > 0; i--){
    push();
    translate(-d/2,-d/2);
    scale(i/n);
    strokeWeight(n/i);
    rect(0,0,d,d);  
    pop();
  }
  pop();
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');

  for (let i = 0; i < arr.length; i++) {
    let red = unhex(arr[i].substr(0, 2));
    let green = unhex(arr[i].substr(2, 2));
    let blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    let c = color(red, green, blue);
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
}