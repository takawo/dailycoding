//inspired from https://dribbble.com/shots/6109239-Processing-Poster-VIII
//by Oleg Frolov

const cols = 8;
const rows = 8;
const offset = 100;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  noFill();
  stroke(255);
  strokeWeight(3);

  const w = (width - offset * 2) / cols;
  const h = (height - offset * 2) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      push();
      translate(x, y);
      push();
      translate(w / 2, h / 2);
      //let angle = floor(random(4))*90;
      let angle = floor(noise(x, y, frameCount / 100) * 5) * 90;
      for (let d = w; d >= 0; d -= 20) {
				if(random(100) < 50){
        arc(0, 0, d, d, angle, angle + 180);
        }else{
        arc(0, 0, d, d, angle, angle + 90);
        }
          
      }
      pop();
      pop();
    }
  }
  noLoop();
}