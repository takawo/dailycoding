let noiseScale = 800;
let step = 0;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  randomSeed(360/(frameCount*3));
  let cells = int(map(pow(sin(frameCount*3),1),-1,1,2,15));
  let offset = map(cells,0,15,width / 10,width/20);
  let margin = offset / 5;
  push();
  translate(width / 2, height / 2);
  let cellW = (width - offset * 2 - margin * (cells - 1)) / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -width / 2 + offset + i * (cellW + margin);
      let y = -height / 2 + offset + j * (cellW + margin);
      push();
      translate(x+cellW/2,y+cellW/2);
      let n = noise((x+cellW/2)/noiseScale,(y+cellW/2)/noiseScale);
      rotate(int(n*4) * 360/4+step*90);
      arc(-cellW/2,-cellW/2,cellW*2,cellW*2,0,90,PIE);
      pop();
    }
  }if(frameCount%90 == 0){
    step += 1;
  }
  pop();
}