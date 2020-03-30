//p5.js and p5.dom.js ver 0.72 
let offset, margin, cellW;

let cells;
let sliders = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  cells = 5;
  offset = width / 10;
  margin = offset / 5;

  cellW = (width - offset * 2 - margin * (cells - 1)) / cells;
  for (let i = 0; i < cells * cells; i++) {
    for(let j = 0; j < 4; j++){
    let slider = createSlider(0, 100, 50);
    slider.size(cellW, 20);
    slider.value(random(100));
    sliders.push(slider);
    }
  }
}

function draw() {
  background(220);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellW + margin);
      let angle = 45;
      let n = (i + j * cells)*4;
      sliders[n].style("rotate", 90);
      sliders[n].position(x - sliders[n].width / 2, y + cellW / 2 - sliders[n].height / 2);
      sliders[n + 1].style("rotate", 270);
      sliders[n + 1].position(x + cellW - sliders[n].width / 2, y + cellW / 2 - sliders[n].height / 2);
      sliders[n+2].style("rotate", 180);
      sliders[n+2].position(x,y-sliders[n+2].height/2);
      sliders[n+3].style("rotate", 360);
      sliders[n+3].position(x,y+cellW-sliders[n+2].height/2);
    }
  }
}