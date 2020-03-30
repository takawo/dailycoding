let g;
let bg;
let pallete;
let url = "https://coolors.co/app/114b5f-028090-e4fde1-456990-f45b69";
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);
  graphics = createGraphics(width,height);
  graphics.fill(255,10/100 * 255);
  graphics.noStroke();
  
  for(let i = 0; i< width * height * 10/100; i++){
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x,y,w,h);
  }
}
function draw(){
  let colors = pallete.concat();
  let bgNum = int(random(colors.length));
  bg = colors[bgNum];
  colors.splice(bgNum,1);
  
  background(bg);  
  separateGrid(0, 0, width,colors);
  image(graphics,0,0);
  frameRate(1);
}

function separateGrid(x, y, d,colors) {
  let sepNum = int(random(1, 6));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w,colors);
      } else {
		//rect(i,j,w,w);
        drawPointAndArc(i+w/2,j+w/2,w,colors);
      }
    }
  }
}

function drawPointAndArc(x,y,cellSize,colors){
      push();
      translate(x, y);
      let rotateNum = int(random(4)) * 360 / 4;
      rotate(rotateNum);
      let d = cellSize / 2;
      strokeCap(SQUARE);
      strokeWeight(max(cellSize/20,1));
      noFill();
      stroke(random(colors));
      arc(-d, -d, cellSize, cellSize, 0, 90);
      stroke(random(colors));
      arc(d, d, cellSize, cellSize, 180, 270);
      stroke(random(colors));
      point(-d,d);
      stroke(random(colors));
      point(d,d);
      stroke(random(colors));
      point(-d,-d);
      stroke(random(colors));
      point(d,-d);
      pop();
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